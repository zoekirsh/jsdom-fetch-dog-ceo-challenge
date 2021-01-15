document.addEventListener("DOMContentLoaded", function () {
  console.log("%c HI", "color: firebrick");
  const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
  const breedUrl = "https://dog.ceo/api/breeds/list/all";

  //get images
  function insertImage(image) {
    let div = document.getElementById("dog-image-container");
    let newImg = document.createElement("img");
    newImg.src = `${image}`;
    div.appendChild(newImg);
  }

  function fetchImages() {
    return fetch(imgUrl)
      .then((resp) => resp.json())
      .then((dogPix) => {
        dogPix["message"].forEach((dogPic) => insertImage(dogPic));
      });
  }

  //get breeds
  function listBreeds(breedsObj) {
    let ul = document.getElementById("dog-breeds");
    breedsObj.forEach(function (breed) {
      let li = document.createElement("li");
      li.innerText = `${breed}`;
      ul.appendChild(li);
      li.addEventListener("click", changeFontColor);
    });
  }

  function fetchBreeds() {
    return fetch(breedUrl)
      .then((resp) => resp.json())
      .then((breeds) => listBreeds(Object.keys(breeds["message"])));
  }

  //click event helper fn
  function changeFontColor(e) {
    e.target.style.color = "pink";
  }

  //select certain breeds
  let select = document.getElementById("breed-dropdown");
  let ul = document.getElementById("dog-breeds");
  let lis = document.querySelectorAll("li");

  function extractText(obj) {
    let liText = [];
    obj.forEach(function (li) {
      liText.push(li.innerText);
    });
    return liText;
  }

  let breedsArr = extractText(lis);

  function filterBreeds() {
    // let ul = document.getElementById("dog-breeds");
    ul.innerHTML = "";
    let choice = select.value;
    let filteredDogs = breedsArr.filter(
      (breed) =>
        function () {
          breed.charAt(0) == choice;
        }
    );
    listBreeds(filteredDogs);
  }

  select.onchange = filterBreeds();
  select.addEventListener("change", filterBreeds);

  fetchImages();
  fetchBreeds();
});
