/*
  Open Food Fact API
*/

export const getOFFDataFromBarCode = async (barCode) => {
  const url = `https://world.openfoodfacts.org/api/v0/product/${barCode}.json`;
  const options = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };
  const drinkData = await fetch(url, options).then((res) => res.json());
  if (drinkData.status_verbose === 'product not found') return null;
  return drinkData;
};

const formatNumber = (numberOrString) => {
  if (!numberOrString) return undefined;
  if (!isNaN(numberOrString)) {
    return numberOrString.toString();
  }
  return numberOrString.replace(/[^.\d]/g, '');
};

export const extractAlcoholDataFromOFFData = (offData) => {
  const degrees = offData.product.nutriments.alcohol;
  const brands = offData.product.brands;
  const product_name = offData.product.product_name;
  const volume = offData.product.quantity;
  return {
    name: brands || product_name,
    volume: formatNumber(volume),
    degrees: formatNumber(degrees),
  };
};

// https://wiki.openfoodfacts.org/API/Write

// openfoodfact@selego.co
// 'openfoodfact@selego.co'

// remember to do tests on world.openfoodfacts.net - login and password: "off"
const authTest = {
  user_id: 'off',
  password: 'off',
};
// eslint-disable-next-line no-undef
const testAuthorization = `Basic ${btoa(`${authTest.user_id}:${authTest.password}`)}`;

const computeParams = (params) =>
  Object.keys(params).reduce((paramString, key, index) => {
    const computedParam = `${key}=${encodeURIComponent(params[key])}`;
    if (index === 0) return computedParam;
    return `${paramString}&${computedParam}`;
  }, '');

export const uploadAlcoholProductToOFF = async (args) => {
  const { auth = authTest, test = true, code, fields, isNew = false } = args;
  console.log('uploadAlcoholProductToOFF', args);
  if (!code) return;
  const baseUrl = test ? 'world.openfoodfacts.net' : 'world.openfoodfacts.org';

  const { name, volume, serving_quantity, degrees } = fields;

  if (!isNew) {
    let offData = await getOFFDataFromBarCode(code);
    if (offData) {
      offData = extractAlcoholDataFromOFFData(offData);
      const sameQuantity = volume === offData.volume;
      const sameName = name === offData.name;
      const sameDegrees = degrees === offData.degrees;
      if (sameQuantity && sameName && sameDegrees) {
        if (__DEV__) console.log('already in off');
        return;
      }
    }
  }

  const params = {
    code,
    product_name: name,
    add_brands: name,
    nutriment_unit: '% vol',
    nutriment_alcohol: degrees,
    serving_quantity,
    comment: 'Automated edit from Oz Ensemble',
    add_categories: 'en:alcoholic-beverages',
  };

  if (isNew && !test) {
    params.user_id = auth.user_id;
    params.password = auth.password;
  }

  if (volume) {
    params.product_quantity = volume;
    params.quantity = `${volume} cl`;
  }

  let url;
  let options;
  if (isNew) {
    url = `https://${baseUrl}/cgi/product_jqm2.pl?${computeParams(params)}`;
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    if (test) headers.Authorization = testAuthorization;
    options = {
      method: 'GET',
      headers,
    };
  } else {
    url = `https://${baseUrl}/cgi/product_jqm2.pl?${computeParams(auth)}`;
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    };
    if (test) headers.Authorization = testAuthorization;
    const body = new FormData();
    for (let key of Object.keys(params)) {
      body.append(key, params[key]);
    }
    options = {
      method: 'POST',
      headers,
      body,
    };
  }
  try {
    const response = await fetch(url, options).then((res) => res.json());
    if (__DEV__) {
      console.log('off response', response);
      console.log(url, options);
    }
  } catch (error) {
    console.log('error in fetching open food fact api', error);
    console.log(args);
    console.log(url, options);
  }
};
