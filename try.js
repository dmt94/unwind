let newObj = {
  strAlcoholic: 'Alcoholic',
  strCategory: '',
  strDrink: 'Fruit Shake',
  strGlass: 'Highball Glass',
  strIngredient1: "Yoghurt",
  strIngredient2: "Banana",
  strIngredient3: "Orange juice",
  strIngredient4: "Fruit",
  strIngredient5: "Ice",
  strIngredient6: null,
  strIngredient7: null,
  strIngredient8: null,
  strIngredient9: null,
  strIngredient10: null,
  strIngredient11: null,
  strIngredient12: null,
  strIngredient13: null,
  strIngredient14: null,
  strIngredient15: null,
  strMeasure1: "1 cup fruit ",
  strMeasure2: "1 ",
  strMeasure3: "4 oz frozen ",
  strMeasure4: "1/2 piece textural ",
  strMeasure5: "6 ",
  strMeasure6: null,
  strMeasure7: null,
  strMeasure8: null,
  strMeasure9: null,
  strMeasure10: null,
  strMeasure11: null,
  strMeasure12: null,
  strMeasure13: null,
  strMeasure14: null,
  strMeasure15: null,
}

console.log(Object.entries(newObj));

let keyPairNestedArray = Object.entries(newObj);

let ingredientsArray = keyPairNestedArray.filter(arr => {
  return arr[0].includes('strIngredient') && arr[1] !== null;
}).map(arr => arr[1]);

let quantityArray = keyPairNestedArray.filter(arr => {
  return arr[0].includes('strMeasure') && arr[1] !== null;
}).map(arr => arr[1]);

let fullIngredientsArray = [];

for (let i = 0; i < quantityArray.length; i++) {
  fullIngredientsArray.push(quantityArray[i] + ingredientsArray[i]);
}

fullIngredientsArray.forEach(pair => {
  let createList = document.createElement('li');
  let pairAsList = document.createTextNode(pair);
  createList.appendChild(pairAsList);
  document.getElementById("ul-list").appendChild(pair);
});

console.log(ingredientsArray);
console.log(quantityArray);
console.log(fullIngredientsArray);
