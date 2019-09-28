const requestData = (url, functionHandler) => {
  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Response in not OK");
    })
    .then(functionHandler)
    .catch(error => console.log(error.message));
};

const galleryWrapper = document.querySelector("#gallery");
const galleryList = document.querySelector(".gallery__list");

const randomDate = () => {
  const getRandomArbitrary = (min, max) => Math.random() * (max - min) + min;
  const date1 = new Date("01/01/2000").getTime();
  const date2 = new Date("01/10/2019").getTime();
  return new Date(getRandomArbitrary(date1, date2)).toLocaleDateString();
};

const createList = data => {
  console.log(data);
  let pictureObjectsArray = data.hits;
  pictureObjectsArray
    .map(element => {
      const galleryListItem = document.createElement("li");
      const galleryImage = document.createElement("img");
      const galleryImageTitle = document.createElement("h3");
      const galleryImageSubtitle = document.createElement("h5");

      galleryListItem.appendChild(galleryImage);
      galleryListItem.appendChild(galleryImageTitle);
      galleryListItem.appendChild(galleryImageSubtitle);

      galleryImage.setAttribute("src", element.largeImageURL);
      galleryImageTitle.innerText = element.user;
      galleryImageSubtitle.innerText = randomDate();

      return galleryListItem;
    })
    .forEach(element => galleryList.appendChild(element));
};

requestData(
  "https://pixabay.com/api/?key=13774470-6c5a921daa2ecf77f068a8231&per_page=21&page=3",
  createList
);
