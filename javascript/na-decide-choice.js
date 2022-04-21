
window.onload = function() {
  event.preventDefault();
  
  function grabRandomLetter() {
    let alphabet = [
      'a', 'b', 'c', 'd', 'e',
      'f', 'g', 'h', 'i', 'j',
      'k', 'l', 'm', 'n', 'o',
      'p', 'q', 'r', 's', 't',
      'u', 'v', 'w', 'x', 'y',
      'z',
    ];

    let randomAlphabetInt = Math.floor(Math.random() * alphabet.length);
    let randomLetter = alphabet[randomAlphabetInt];
    
    return randomLetter;
  }

  let theRandomLetter = grabRandomLetter();
  
  grabRandomDrink(theRandomLetter);

  function grabRandomDrink(letter) {

      fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`)
      .then(res => res.json()) 
      .then(data => {
        console.log(data);
        console.log(letter);

        if (data.drinks === null) {
          console.log(data.drinks);
          return grabRandomDrink(grabRandomLetter());
          }

        //grab random drink
        let nalcoholicDrinks = [];

        data.drinks.forEach(drink => {
          if (drink['strAlcoholic'] === 'Non alcoholic') {
            nalcoholicDrinks.push(drink);
          }
        })

        let randomDrinkInt = Math.floor(Math.random() * nalcoholicDrinks.length);
        let randomDrink = nalcoholicDrinks[randomDrinkInt];

        console.log(randomDrink);

        //random drink attributes
        let drinkImg = randomDrink['strDrinkThumb'];
        let drinkName = randomDrink['strDrink'];
        let drinkCategory = randomDrink['strCategory'];
        let drinkType = randomDrink['strAlcoholic'];
        let drinkGlass = randomDrink['strGlass'];
        let drinkInstr = randomDrink['strInstructions'];

        let keyPairNestedQI = Object.entries(randomDrink);

        let ingredientsArray = keyPairNestedQI.filter(arr => {
          return arr[0].includes('strIngredient') && arr[1] !== null;
        }).map(arr => arr[1]);

        let quantityArray = keyPairNestedQI.filter(arr => {
          return arr[0].includes('strMeasure') && arr[1] !== null;
        }).map(arr => arr[1]);

        let fullIngredientsArray = [];

        let quantityArrayNew = quantityArray.map(quantity => {
          if (quantity.includes('\n')) {
            quantity.replace('\n', ' ');
            return quantity;
          }
          return quantity;
        });

        console.log(quantityArrayNew);
        
        for (let i = 0; i < quantityArrayNew.length; i++) {
          if (quantityArrayNew[i] !== null && ingredientsArray[i] !== null) {
            fullIngredientsArray.push(quantityArrayNew[i] + ' ' + ingredientsArray[i]);
          }
        }

        for (let i = 0; i < ingredientsArray.length; i++) {
          if (ingredientsArray[i] !== null && quantityArrayNew[i] === undefined) {
            fullIngredientsArray.push(ingredientsArray[i]);
        }}

     
        let fullIngredients = fullIngredientsArray.join('\n');

        document.querySelector('.ingredient-content').innerText = fullIngredients;
        
        document.getElementById('drink-img').src = drinkImg;

        document.getElementById('random-category').innerText = drinkCategory;

        document.getElementById('random-title').innerText = drinkName;

        document.getElementById('random-glass').innerText = drinkGlass;

        document.querySelector('.instruction-content').innerText = drinkInstr;

        
        })//end of fetch

  }//end of grabRandomLetter()


}//end of onload function


