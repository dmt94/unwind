
let searchDrink = document.getElementById('find-drink');

window.onload = function() {
  event.preventDefault();
  searchDrink.style.visibility = 'hidden';
}

document.querySelector('.btn').addEventListener('click', getDrink);

document.querySelector('.random-link').addEventListener('click', randomDrink);

function getDrink() {
  event.preventDefault();
  let drink = document.querySelector('input').value;
  console.log('clicked');

  if (drink.length < 3) {
    return false;
  }

  fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drink}`)
  .then(res => res.json()) 
  .then(data => {
    console.log(data);
    // console.log(data.drinks.length);
    
    if (data.drinks === null) {
      searchDrink.style.visibility = 'visible';
      return false;
    } 
    if (data.drinks !== null) {
      searchDrink.style.visibility = 'hidden';
    }
    let instr = data.drinks[0].strInstructions;


    if (document.querySelector('.name-of-drink').innerText !== data.drinks[0].strDrink.toUpperCase()) {
      let myNode = document.getElementById('id-all-drinks-container');
      while (myNode.firstChild) {
      myNode.removeChild(myNode.lastChild);
  }
    document.querySelector('.name-of-drink').innerText = data.drinks[0].strDrink;
    document.querySelector('.first').src = data.drinks[0].strDrinkThumb;
    document.querySelector('.instructions').innerText = instr.split('.').join('\n');

    //trial
    let keyPairNestedArray = Object.entries(data.drinks[0]);

    let ingredientsArray = keyPairNestedArray.filter(arr => {
      return arr[0].includes('strIngredient') && arr[1] !== null;
    }).map(arr => arr[1]);
    
    let quantityArray = keyPairNestedArray.filter(arr => {
      return arr[0].includes('strMeasure') && arr[1] !== null;
    }).map(arr => arr[1]);
    
    let fullIngredientsArray = [];
    
    for (let i = 0; i < quantityArray.length; i++) {
      fullIngredientsArray.push(quantityArray[i] + ' ' + ingredientsArray[i]);
    }

    for (let i = 0; i < fullIngredientsArray.length; i++) {
      if (fullIngredientsArray[i].length > 1) {
        let createList = document.createElement('li');
        let pairAsList = document.createTextNode(fullIngredientsArray[i]);
        createList.appendChild(pairAsList);
        createList.classList.add("list-class");
        document.getElementById("id-ingredient-list").appendChild(createList);
      }
    }}
  })
  .catch(err => {
    console.log(`error ${err}`);
  });
}


function randomDrink() {
  event.preventDefault();
  console.log('hello');
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/random.php`)
  .then(res => res.json()) 
  .then(data => {
  
    let instr = data.drinks[0].strInstructions;
    if (document.querySelector('.name-of-drink').innerText !== data.drinks[0].strDrink.toUpperCase()) {
      let myNode = document.getElementById('id-ingredient-list');
      while (myNode.firstChild) {
      myNode.removeChild(myNode.lastChild);
  }
    document.querySelector('.name-of-drink').innerText = data.drinks[0].strDrink;
    document.querySelector('.first').src = data.drinks[0].strDrinkThumb;
    document.querySelector('.instructions').innerText = instr.split('.').join('\n');

    //trial
    let keyPairNestedArray = Object.entries(data.drinks[0]);

    let ingredientsArray = keyPairNestedArray.filter(arr => {
      return arr[0].includes('strIngredient') && arr[1] !== null;
    }).map(arr => arr[1]);
    
    let quantityArray = keyPairNestedArray.filter(arr => {
      return arr[0].includes('strMeasure') && arr[1] !== null;
    }).map(arr => arr[1]);
    
    let fullIngredientsArray = [];
    
    for (let i = 0; i < quantityArray.length; i++) {
      fullIngredientsArray.push(quantityArray[i] + ' ' + ingredientsArray[i]);
    }

    for (let i = 0; i < fullIngredientsArray.length; i++) {
      if (fullIngredientsArray[i].length > 1) {
        let createList = document.createElement('li');
        let pairAsList = document.createTextNode(fullIngredientsArray[i]);
        createList.appendChild(pairAsList);
        createList.classList.add("list-class");
        document.getElementById("id-ingredient-list").appendChild(createList);
      }
    }}
  })
  .catch(err => {
    console.log(`error ${err}`);
  });
}