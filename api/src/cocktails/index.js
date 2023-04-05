const cocktailsCatalog = [
  {
    categoryKey: "cocktail",
    drinkKey: "whiksy-cola",
    displayFeed: (q) => (q > 1 ? "cocktail whisky cola" : "cocktails whisky cola"),
    displayDrinkModal: "Cocktail Wiksy Cola",
    displaySelection: "Whisky cola",
    volume: "5cl whisky 40%",
    doses: 1,
    kcal: 230,
  },
  {
    categoryKey: "cocktail",
    drinkKey: "gin-tonic",
    displayFeed: (q) => (q > 1 ? "cocktail gin tonic" : "cocktails gin tonic"),
    displayDrinkModal: "Cocktail Gin Tonic",
    displaySelection: "Gin tonic",
    volume: "5cl gin 40%",
    doses: 1,
    kcal: 140,
  },

  {
    categoryKey: "cocktail",
    drinkKey: "cuba-libre",
    displayFeed: (q) => (q > 1 ? "cocktail cuba libre" : "cocktails cuba libre"),
    displayDrinkModal: "Cocktail Cuba Libre",
    displaySelection: "Cuba libre",

    volume: "5cl rhum 40%",
    doses: 1,
    kcal: 160,
  },
  {
    categoryKey: "cocktail",
    drinkKey: "mojito",
    displayFeed: (q) => (q > 1 ? "cocktail mojito" : "cocktails mojito"),
    displayDrinkModal: "Cocktail Mojito",
    displaySelection: "Mojito",
    volume: "5cl rhum 40%",
    doses: 1,
    kcal: 160,
  },
  {
    categoryKey: "cocktail",
    drinkKey: "spritz",
    displayFeed: (q) => (q > 1 ? "cocktail spritz" : "cocktails spritz"),
    displayDrinkModal: "Cocktail Spritz",
    displaySelection: "Spritz",
    volume: "10cl apéritif et prosecco 11%",
    doses: 1,
    kcal: 120,
  },
  {
    categoryKey: "cocktail",
    drinkKey: "caipirinha",
    displayFeed: (q) => (q > 1 ? "cocktail caïpirinha" : "cocktails caïpirinha"),
    displayDrinkModal: "Cocktail Caïpirinha",
    displaySelection: "Caïpirinha",
    volume: "5cl cachaça 40%",
    doses: 1,
    kcal: 149,
  },
  {
    categoryKey: "cocktail",
    drinkKey: "pina-colada",
    displayFeed: (q) => (q > 1 ? "cocktail piña colada" : "cocktails piña colada"),
    displayDrinkModal: "Cocktail Piña Colada",
    displaySelection: "Piña Colada",
    volume: "6cl rhum 40%",
    doses: 1,
    kcal: 300,
  },
  {
    categoryKey: "cocktail",
    drinkKey: "cosmopolitan",
    displayFeed: (q) => (q > 1 ? "cocktail cosmopolitan" : "cocktails cosmopolitan"),
    displayDrinkModal: "Cocktail Cosmopolitan",
    displaySelection: "Cosmopolitan",
    volume: "6 cl vodka et liqueur 40%",
    doses: 1,
    kcal: 200,
  },
  {
    categoryKey: "cocktail",
    drinkKey: "margarita",
    displayFeed: (q) => (q > 1 ? "cocktail margarita" : "cocktails margarita"),
    displayDrinkModal: "Cocktail Margarita",
    displaySelection: "Margarita",
    volume: "6 cl tequila et liqueur 40%",
    doses: 1,
    kcal: 140,
  },
  {
    categoryKey: "cocktail",
    drinkKey: "tequila-sunrise",
    displayFeed: (q) => (q > 1 ? "cocktail tequila sunrise" : "cocktails tequila sunrise"),
    displayDrinkModal: "Cocktail Tequila Sunrise",
    displaySelection: "Tequila sunrise",
    volume: "4 cl tequila 35%",
    doses: 1,
    kcal: 230,
  },
];

module.exports = {
  cocktailsCatalog,
};
