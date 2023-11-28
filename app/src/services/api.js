import URI from 'urijs';
import { Alert, Platform } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import deviceInfoModule from 'react-native-device-info';

import { SCHEME, API_HOST } from '../config';
import { NewFeaturePop } from './NewFeaturePopup';

export const checkNetwork = async (test = false) => {
  const isConnected = await NetInfo.fetch().then((state) => state.isConnected);
  if (!isConnected || test) {
    await new Promise((res) => setTimeout(res, 1500));
    // Alert.alert('Pas de réseau', 'Veuillez vérifier votre connexion');
    return false;
  }
  return true;
};

class ApiService {
  host = API_HOST;
  scheme = SCHEME;
  getUrl = (path, query) => {
    return new URI().host(this.host).scheme(this.scheme).path(path).setSearch(query).toString();
  };
  execute = async ({ method = 'GET', path = '', query = {}, headers = {}, body = null }) => {
    try {
      if (path === '/event' && body) {
        body.newFeaturesLastShownId = NewFeaturePop.lastShownId;
      }

      const config = {
        method,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          appversion: deviceInfoModule.getBuildNumber(),
          appdevice: Platform.OS,
          currentroute: this.navigation?.getCurrentRoute?.()?.name,
          ...headers,
        },
        body: body ? JSON.stringify(body) : null,
      };

      const url = this.getUrl(path, query);
      // console.log('url: ', url);
      const canFetch = await checkNetwork();
      if (!canFetch) return {ok: false,};

      const response = await fetch(url, config);

      if (response.json) {
        try {
          const readableRes = await response.json();
          if (readableRes.sendInApp) this?.handleInAppMessage(readableRes.sendInApp);
          if (readableRes.showNewBadge) this?.handleShowBadge(readableRes.showNewBadge);
          if (readableRes.showInAppModal) this?.handleShowInAppModal(readableRes.showInAppModal);
          if (readableRes.newFeatures) {
            NewFeaturePop.handleShowNewFeaturePopup(readableRes.newFeatures);
          }
          return readableRes;
        } catch (e) {
          console.log('ERROR IN RESPONSE JSON', response);
          console.log(e);
        }
      }

      return response;
    } catch (e) {
      console.log(' error in api');
      console.log(e);
      return {
        ok: false,
        error:
          "Veuillez nous excuser, cette erreur est inattendue : l'équipe technique a été prévenue. Veuillez retenter dans quelques instants ou nous contacter si l'erreur persiste.",
      };
    }
  };

  get = async (args) => this.execute({ method: 'GET', ...args });
  post = async (args) => this.execute({ method: 'POST', ...args });
  put = async (args) => this.execute({ method: 'PUT', ...args });
  delete = async (args) => this.execute({ method: 'DELETE', ...args });
}

const API = new ApiService();
export default API;
