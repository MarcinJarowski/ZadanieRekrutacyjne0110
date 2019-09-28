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
const galleryList = document.querySelector(".gallery__list");
const gallerySection = document.querySelector("#gallery");
const modal = document.createElement("div");
const createImg = document.createElement("img");
const closeModalButton = document.createElement("button");

const randomDate = () => {
  const getRandomArbitrary = (min, max) => Math.random() * (max - min) + min;
  const date1 = new Date("01/01/2010").getTime();
  const date2 = new Date("01/10/2019").getTime();
  return new Date(getRandomArbitrary(date1, date2)).toLocaleDateString();
};

const createModal = url => {
  gallery.appendChild(modal);
  modal.setAttribute("class", "gallery__modal--open");
  modal.appendChild(createImg);
  createImg.setAttribute("class", "gallery__modal__img");
  createImg.setAttribute("src", url);
  createModalCloseButton();
};
const createModalCloseButton = () => {
  closeModalButton.setAttribute("class", "gallery__modal__closeButton");
  modal.appendChild(closeModalButton);
  closeModalButton.innerText = "ZAMKNIJ";
  closeModalButton.addEventListener("click", () => {
    gallerySection.removeChild(document.querySelector(".gallery__modal--open"));
  });
};
const createList = data => {
  const pictureObjectsArray = data.hits;
  pictureObjectsArray
    .map(element => {
      const galleryListItem = document.createElement("li");
      const galleryImage = document.createElement("img");
      const galleryImageTitle = document.createElement("h3");
      const galleryImageSubtitle = document.createElement("h5");

      galleryListItem.appendChild(galleryImage);
      galleryListItem.appendChild(galleryImageTitle);
      galleryListItem.appendChild(galleryImageSubtitle);

      galleryListItem.setAttribute("class", "gallery__listitem");
      galleryImage.setAttribute("src", element.largeImageURL);
      galleryImage.setAttribute("class", "gallery__image");
      galleryImageTitle.setAttribute("class", "gallery__image__title");
      galleryImageSubtitle.setAttribute("class", "gallery__image__subtitle");

      galleryImage.addEventListener("click", event => {
        createModal(element.largeImageURL);
      });

      galleryImageSubtitle.innerText = `Dodane przez: ${element.user}`;
      galleryImageTitle.innerText = randomDate();

      return galleryListItem;
    })
    .forEach(galleryListItem => galleryList.appendChild(galleryListItem));
};

requestData(
  "https://pixabay.com/api/?key=13774470-6c5a921daa2ecf77f068a8231&per_page=20&page=6",
  createList
);
