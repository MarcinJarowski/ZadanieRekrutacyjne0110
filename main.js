const galleryList = document.querySelector(".gallery__list");
const gallerySection = document.querySelector("#gallery");
const createModal = document.createElement("div");
const createImg = document.createElement("img");
const closeModalButton = document.createElement("button");

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
const randomDate = () => {
  const getRandomArbitrary = (min, max) => Math.random() * (max - min) + min;
  const date1 = new Date("01/01/2010").getTime();
  const date2 = new Date("01/10/2019").getTime();
  return new Date(getRandomArbitrary(date1, date2)).toLocaleDateString();
};

const appendModal = url => {
  gallery.appendChild(createModal);
  createModal.setAttribute("class", "gallery__modal--open");
  createModal.appendChild(createImg);
  createImg.setAttribute("class", "gallery__modal__img");
  createImg.setAttribute("src", url);
  createModalCloseButton();
};
const deleteModal = () => {
  gallerySection.removeChild(document.querySelector(".gallery__modal--open"));
};
const createModalCloseButton = () => {
  closeModalButton.setAttribute("class", "gallery__modal__closeButton");
  createModal.appendChild(closeModalButton);
  closeModalButton.innerText = "X";
  closeModalButton.addEventListener("click", () => deleteModal());
};
const createList = data => {
  const pictureObjectsArray = data.hits;

  return pictureObjectsArray
    .map(element => {
      const galleryListItem = document.createElement("li");
      const galleryImage = document.createElement("img");
      const galleryImageTitle = document.createElement("h3");
      const galleryImageSubtitle = document.createElement("h5");

      galleryImage.setAttribute("src", element.largeImageURL);
      galleryImage.setAttribute("class", "gallery__image");
      galleryImage.addEventListener("load", () => {
        galleryListItem.appendChild(galleryImage);
        galleryListItem.appendChild(galleryImageTitle);
        galleryListItem.appendChild(galleryImageSubtitle);
        galleryImage.addEventListener("click", () => {
          appendModal(element.largeImageURL);
        });
      });

      galleryListItem.setAttribute("class", "gallery__listitem");
      galleryImageTitle.setAttribute("class", "gallery__image__title");
      galleryImageSubtitle.setAttribute("class", "gallery__image__subtitle");

      galleryImageSubtitle.innerText = `Dodane przez: ${element.user}`;
      galleryImageTitle.innerText = randomDate();

      return galleryListItem;
    })
    .forEach(galleryListItem => {
      galleryList.appendChild(galleryListItem);
    });
};

requestData(
  "https://pixabay.com/api/?key=13774470-6c5a921daa2ecf77f068a8231&per_page=20&page=13",
  createList
);
