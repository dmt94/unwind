document.querySelector('.btn').addEventListener('click', getDrink)

function getDrink() {
  let drink = document.querySelector('input').value;
  console.log('clicked');

  fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drink}`)
  .then(res => res.json()) 
  .then(data => {
    console.log(data);
    // console.log(data.drinks[1]);
    let instr = data.drinks[0].strInstructions;
    //if 
    document.querySelector('h2').innerText = data.drinks[0].strDrink;
    document.querySelector('.first').src = data.drinks[0].strDrinkThumb;
    document.querySelector('.instructions').innerText = instr.split('.').join('\n');
  })
  .catch(err => {
    console.log(`error ${err}`);
  });
}
