

window.onload = function() {
  event.preventDefault();
  let alphabet = [
    'a', 'b', 'c', 'd', 'e',
    'f', 'g', 'h', 'i', 'j',
    'k', 'l', 'm', 'n', 'o',
    'p', 'q', 'r', 's', 't',
    'u', 'v', 'w', 'x', 'y',
    'z',
  ]

  //name, alcOrNot, Category, Glass

function makeCards(letter) {
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`)
  .then(res => res.json()) 
  .then(data => {
    if (data.drinks !== null) {
      // array of objects
      console.log(data.drinks);

      let sortedData = data.drinks.sort();

      sortedData.forEach(drink => {
        if (drink['strAlcoholic'] === 'Alcoholic') {
          let drinkName = drink['strDrink'];
          let drinkType = drink['strAlcoholic'];
          let drinkCategory = drink['strCategory'];
          let drinkGlass = drink['strGlass'];
          let drinkImg = drink['strDrinkThumb'];

          let createCard = document.createElement('div');
          createCard.classList.add("card");
          createCard.style.width = '18rem';

          let createImage = document.createElement("img");
          createImage.src = drinkImg;
          createImage.classList.add('card-img-top');

          let cardBody = document.createElement('div');
          cardBody.classList.add('card-body');

          // drink type alcoholic or not
          // h5 element
          let createDrinkType = document.createElement('h5');
          createDrinkType.classList.add("card-title");
          createDrinkType.classList.add("drink-type");
          let createDrinkTypeContent = document.createTextNode(`♦${drinkType}♦`);
          createDrinkType.appendChild(createDrinkTypeContent);

          cardBody.appendChild(createDrinkType);

          // drink link
          let createDrinkTitleLink = document.createElement('a');
          // drink title, 
          // h5 element
          let createDrinkTitle = document.createElement('h5');
          createDrinkTitle.classList.add('card-title');
          createDrinkTitle.classList.add('drink-title');
          let createDrinkTitleContent = document.createTextNode(drinkName);
          createDrinkTitle.appendChild(createDrinkTitleContent);

          createDrinkTitleLink.classList.add('drink-link');
          createDrinkTitleLink.href = '../index.html';
          createDrinkTitleLink.appendChild(createDrinkTitle);

          // drink category
          let createSpanDiv = document.createElement('div');
          createSpanDiv.classList.add('card-text');
          createSpanDiv.classList.add('drink-category');
          
          //drink category span
          let createSpan = document.createElement('span');
          let createSpanContent = document.createTextNode(`⟢${drinkCategory}⟣`);
          createSpan.appendChild(createSpanContent);

          createSpanDiv.appendChild(createSpan);

          //drink glass 
          let createGlassDiv = document.createElement('div');
          createGlassDiv.classList.add('card-text');
          createGlassDiv.classList.add('drink-glass');

          //drink glass span
          let createGlassSpan = document.createElement('span');
          let createGlassSpanContent = document.createTextNode(drinkGlass);
          createGlassSpan.appendChild(createGlassSpanContent);

          createGlassDiv.appendChild(createGlassSpan);

          //createCard append each part
          createCard.appendChild(createImage);
          createCard.appendChild(cardBody);
          createCard.appendChild(createSpanDiv);
          createCard.appendChild(createGlassDiv);
          cardBody.appendChild(createDrinkTitleLink);

          let eachCard = document.getElementById("id-all-drinks-container");
          eachCard.appendChild(createCard);
        }
       
      })
    }
});
}

alphabet.forEach(letter => {
  makeCards(letter);
});

}//end of onload function



