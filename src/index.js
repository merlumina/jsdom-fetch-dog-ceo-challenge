// console.log('%c HI', 'color: firebrick')

//const imgContainer = document.getElementById('dog-image-container');
let breeds = [];

document.addEventListener('DOMContentLoaded', function () {
    fetchImages();
    fetchBreeds();
});

function fetchImages() {
    const imgUrl = 'https://dog.ceo/api/breeds/image/random/4';
    fetch(imgUrl)
    .then(resp => resp.json())
    .then(results => {
        results.message.forEach(image => addImage(image))
    }); 
}

function addImage(url) {
    let imgContainer = document.getElementById('dog-image-container');
    let img = document.createElement('img');
    img.src = url;
    imgContainer.append(img);
}

function fetchBreeds () {
    const breedUrl = 'https://dog.ceo/api/breeds/list/all';
    fetch (breedUrl)
    .then (resp => resp.json())
    .then (results => {
        breeds = Object.keys(results.message);
        updateBreedList(breeds);
        addBreedSelectListener();
        });
}

function updateBreedList(breeds) {
  let ul = document.getElementById('dog-breeds');
  removeChildren(ul);
  breeds.forEach(breed => addBreed(breed));
}

function removeChildren(element) {
  let child = element.lastElementChild;
  while (child) {
    element.removeChild(child);
    child = element.lastElementChild;
  }
}

function selectBreedsStartingWith(letter) {
    updateBreedList(breeds.filter(breed => breed.startsWith(letter)));
}

function addBreedSelectListener() {
    let breedDropDown = document.getElementById('breed-dropdown');
    breedDropDown.addEventListener('change', function (event) {
        selectBreedsStartingWith(event.target.value);
    });
}

function addBreed(breed) {
    let breedUL = document.getElementById('dog-breeds');
    let li = document.createElement('li');
    li.innerText = breed;
    li.style.cursor = 'pointer';
    breedUL.append(li);
    li.addEventListener('click', updateColor);
}

function updateColor(e) {
    e.target.style.color = "cornflowerblue"
}