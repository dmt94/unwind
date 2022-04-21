document.querySelector('.btn').addEventListener('click', getDrink);

let searchDrink = document.getElementById('find-drink');
let topDiv = document.querySelector('.ingr-descr')

window.onload = function() {
  event.preventDefault();
  searchDrink.style.visibility = 'hidden';
  topDiv.style.display = 'none';
}

function getDrink() {
  event.preventDefault();
  let drink = document.querySelector('input').value;
  console.log('clicked');


  if (drink.length < 3) {
    searchDrink.style.visibility = 'visible';
    return false;
  }

  fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drink}`)
  .then(res => res.json()) 
  .then(data => {
    console.log(data);
    
    if (data.drinks === null) {
      searchDrink.style.visibility = 'visible';
      return false;
    } 
    if (data.drinks !== null) {
      searchDrink.style.visibility = 'hidden';
    }

    let myNode = document.getElementById('id-all-drinks-container');
    while (myNode.firstChild) {
    myNode.removeChild(myNode.lastChild);
    }

    makeCards(drink);

    function makeCards(drink) {
      data.drinks.forEach(drink => {
          let drinkIdCard = drink['idDrink'];
          let drinkName = drink['strDrink'];
          let drinkType = drink['strAlcoholic'];
          let drinkCategory = drink['strCategory'];
          let drinkGlass = drink['strGlass'];
          let drinkImg = drink['strDrinkThumb'];
          console.log(drink);
          let createCard = document.createElement('div');
          createCard.classList.add("card");
          createCard.style.width = '18rem';
          createCard.setAttribute("id", drinkIdCard);
          

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
          // let createDrinkTitle = document.createElement('button');
          let createDrinkTitle = document.createElement('h5');
          createDrinkTitle.setAttribute('value', drinkName);
          titleId = drinkName.toLowerCase().replaceAll(' ','-');
          createDrinkTitle.setAttribute("id", titleId);
          createDrinkTitle.classList.add('drink-title-button');
          
          
          createDrinkTitle.classList.add('card-title');
          createDrinkTitle.classList.add('drink-title');
          let createDrinkTitleContent = document.createTextNode(drinkName);
          createDrinkTitle.appendChild(createDrinkTitleContent);

          //creating value of link
          // VALUE AND ID FOR LINK
          createDrinkTitleLink.value = drinkName;

          createDrinkTitleLink.classList.add('drink-link');
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

          let button = document.getElementById(titleId);
          //click "link"
          button.addEventListener('click', function handleClick() {
            topDiv.style.display = 'flex';
            console.log('element clicked');
            console.log(drinkName);
            let theDrink = drinkName;

            fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${theDrink}`)
            .then(res => res.json()) 
            .then(data => {
              console.log(data);
              console.log(data.drinks[0].strInstructions);

              //remove all elements within cards
              eachCard.style.display = 'none';

              //add title, image, instruction
              document.querySelector('.name-of-drink').innerText = data.drinks[0].strDrink;
              document.querySelector('.drink-img').src = data.drinks[0].strDrinkThumb;
              let instr = data.drinks[0].strInstructions;
              let myNode = document.getElementById('id-ingredient-list');
              document.querySelector('.instructions').innerText = instr.split('.').join('.\n');


              //add ingredient list
              let keyPairNestedArray2 = Object.entries(data.drinks[0]);

              let ingredientsArray2 = keyPairNestedArray2.filter(arr => {
                return arr[0].includes('strIngredient') && arr[1] !== null && arr[1] !== "";
              }).map(arr => arr[1]);
              
              let quantityArray2 = keyPairNestedArray2.filter(arr => {
                return arr[0].includes('strMeasure') && arr[1] !== null && arr[1] !== '\n' && arr[1] !== "";
              }).map(arr => '⟡' + ' ' + arr[1]);
              
              let fullIngredientsArray2 = [];
              
              for (let i = 0; i < quantityArray2.length; i++) {
                fullIngredientsArray2.push(quantityArray2[i] + ' ' + ingredientsArray2[i]);
              }

              let fullIngredients = fullIngredientsArray2.join('\n\n');
              console.log(fullIngredients);

              document.querySelector('.list-of-ingredient').innerText = fullIngredients;

              //back to normal cards
              document.addEventListener('click', function handleClick() {
                eachCard.style.display = 'flex';
              });
            })
            .catch(err => {
              console.log(`error ${err}`);
            });

          }); // end of event listener
          
      });

    }//end of makeCards function
    
  })//end of .then(data =>)
  .catch(err => {
    console.log(`error ${err}`);
  });
}//end of getDrink