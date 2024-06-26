const cocktailsCatalog = [
  {
    categoryKey: "cocktail",
    drinkKey: "whisky-cola",
    displayFeed: (q) => (q > 1 ? "cocktail whisky cola" : "cocktails whisky cola"),
    displayDrinkModal: "Cocktail Whisky Cola",
    displaySelection: "Whisky cola",
    volume: "5cl whisky 40%",
    volumeNumber: 5,
    doses: 1.6,
    kcal: 230,
  },
  {
    categoryKey: "cocktail",
    drinkKey: "gin-tonic",
    displayFeed: (q) => (q > 1 ? "cocktail gin tonic" : "cocktails gin tonic"),
    displayDrinkModal: "Cocktail Gin Tonic",
    displaySelection: "Gin tonic",
    volume: "5cl gin 40%",
    volumeNumber: 5,
    doses: 1.6,
    kcal: 140,
  },

  {
    categoryKey: "cocktail",
    drinkKey: "cuba-libre",
    displayFeed: (q) => (q > 1 ? "cocktail cuba libre" : "cocktails cuba libre"),
    displayDrinkModal: "Cocktail Cuba Libre",
    displaySelection: "Cuba libre",
    volumeNumber: 5,
    volume: "5cl rhum 40%",
    doses: 1.6,
    kcal: 160,
  },
  {
    categoryKey: "cocktail",
    drinkKey: "mojito",
    displayFeed: (q) => (q > 1 ? "cocktail mojito" : "cocktails mojito"),
    displayDrinkModal: "Cocktail Mojito",
    displaySelection: "Mojito",
    volume: "5cl rhum 40%",
    volumeNumber: 5,
    doses: 1.6,
    kcal: 160,
  },
  {
    categoryKey: "cocktail",
    drinkKey: "spritz",
    displayFeed: (q) => (q > 1 ? "cocktail spritz" : "cocktails spritz"),
    displayDrinkModal: "Cocktail Spritz",
    displaySelection: "Spritz",
    volume: "10cl apéritif et prosecco 11%",
    volumeNumber: 10,
    doses: 0.9,
    kcal: 120,
  },
  {
    categoryKey: "cocktail",
    drinkKey: "caipirinha",
    displayFeed: (q) => (q > 1 ? "cocktail caïpirinha" : "cocktails caïpirinha"),
    displayDrinkModal: "Cocktail Caïpirinha",
    displaySelection: "Caïpirinha",
    volume: "5cl cachaça 40%",
    volumeNumber: 5,
    doses: 1.6,
    kcal: 149,
  },
  {
    categoryKey: "cocktail",
    drinkKey: "pina-colada",
    displayFeed: (q) => (q > 1 ? "cocktail piña colada" : "cocktails piña colada"),
    displayDrinkModal: "Cocktail Piña Colada",
    displaySelection: "Piña Colada",
    volume: "6cl rhum 40%",
    volumeNumber: 6,
    doses: 1.9,
    kcal: 300,
  },
  {
    categoryKey: "cocktail",
    drinkKey: "cosmopolitan",
    displayFeed: (q) => (q > 1 ? "cocktail cosmopolitan" : "cocktails cosmopolitan"),
    displayDrinkModal: "Cocktail Cosmopolitan",
    displaySelection: "Cosmopolitan",
    volume: "6 cl vodka et liqueur 40%",
    volumeNumber: 6,
    doses: 1.9,
    kcal: 200,
  },
  {
    categoryKey: "cocktail",
    drinkKey: "margarita",
    displayFeed: (q) => (q > 1 ? "cocktail margarita" : "cocktails margarita"),
    displayDrinkModal: "Cocktail Margarita",
    displaySelection: "Margarita",
    volume: "6 cl tequila et liqueur 40%",
    volumeNumber: 6,
    doses: 1.8,
    kcal: 140,
  },
  {
    categoryKey: "cocktail",
    drinkKey: "tequila-sunrise",
    displayFeed: (q) => (q > 1 ? "cocktail tequila sunrise" : "cocktails tequila sunrise"),
    displayDrinkModal: "Cocktail Tequila Sunrise",
    displaySelection: "Tequila sunrise",
    volume: "4 cl tequila 35%",
    volumeNumber: 4,
    doses: 1.1,
    kcal: 230,
  },
  {
    categoryKey: "cocktail",
    drinkKey: "punch",
    displayFeed: (q) => (q > 1 ? "cocktail punch" : "cocktails punch"),
    displayDrinkModal: "Cocktail Punch",
    displaySelection: "Punch (rhum planteur)",
    volume: "5cl rhum 40%",
    volumeNumber: 5,
    doses: 1.6,
    kcal: 180,
  },
  {
    categoryKey: "cocktail",
    drinkKey: "ti-punch",
    displayFeed: (q) => (q > 1 ? "cocktail ti-punch" : "cocktails ti-punch"),
    displayDrinkModal: "Cocktail Ti-Punch",
    displaySelection: "Ti-punch",
    volume: "6cl rhum 40%",
    volumeNumber: 6,
    doses: 1.9,
    kcal: 220,
  },
  {
    categoryKey: "cocktail",
    drinkKey: "moscow-mule",
    displayFeed: (q) => (q > 1 ? "cocktail moscow mule" : "cocktails moscow mule"),
    displayDrinkModal: "Cocktail Moscow Mule",
    displaySelection: "Moscow mule",
    volume: "6cl vodka 40%",
    volumeNumber: 6,
    doses: 1.9,
    kcal: 160,
  },
  {
    categoryKey: "cocktail",
    drinkKey: "picon-biere",
    displayFeed: (q) => (q > 1 ? "cocktail picon bière" : "cocktails picon bière"),
    displayDrinkModal: "Cocktail Picon Bière",
    displaySelection: "Picon bière",
    volume: "28cl liqueur et bière 18%",
    volumeNumber: 28,
    doses: 1.6,
    kcal: 110,
  },
  {
    categoryKey: "cocktail",
    drinkKey: "daiquiri",
    displayFeed: (q) => (q > 1 ? "cocktail daiquiri" : "cocktails daiquiri"),
    displayDrinkModal: "Cocktail Daiquiri",
    displaySelection: "Daiquiri",
    volume: "5cl rhum 40%",
    volumeNumber: 5,
    doses: 1.6,
    kcal: 180,
  },
];

module.exports = {
  cocktailsCatalog,
};
