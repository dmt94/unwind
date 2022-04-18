let drinks = [
  ['Negroni', 'Alcoholic', 'Ordinary Drink', 'Old-fashioned glass'],
  ['Paloma', 'Alcoholic', 'Cocktail', 'Collins glass'],
  ['Nutty Irishman', 'Alcoholic', 'Shake', 'Old-fashioned glass'],
  ['Thai Coffee', 'Non alcoholic', 'Coffee / Tea', 'Highball Glass'],
  ['Ipamena', 'Non alcoholic', 'Ordinary Drink', 'Wine Glass'],
  ['Rose', 'Alcoholic', 'Ordinary Drink', 'Cocktail glass'],
  ['Shark Attack', 'Alcoholic', 'Cocktail', 'Pitcher'],
]

// categorizes each array in order
// drinks.forEach(arr => arr.sort());

console.log(drinks);

let allDrinks = drinks.sort();
let alcoholicDrinks = [];
let nonAlcoholicDrinks = [];

allDrinks.forEach(drink => drink.includes('Alcoholic') ? alcoholicDrinks.push(drink) : nonAlcoholicDrinks.push(drink));

console.log(alcoholicDrinks);
console.log(nonAlcoholicDrinks);



