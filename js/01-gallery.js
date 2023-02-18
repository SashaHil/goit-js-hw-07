import { galleryItems } from "./gallery-items.js";
// Change code below this line

console.log(galleryItems);

const galleryPhotos = document.querySelector(".gallery");
const galleryMarkup = createGalleryMarkup(galleryItems);

galleryPhotos.insertAdjacentHTML("beforeend", galleryMarkup);

galleryPhotos.addEventListener("click", onGalleryMarkupClick);

//1. Рендер сторінки

function createGalleryMarkup(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `<div class="gallery__item">
         <a class="gallery__link" href="${original}">
           <img class ="gallery__image"
           src="${preview}"
           data-source ="${original}" 
           alt="${description}" />
        </a>
      </div>`;
    })
    .join("");
}

//2. Делегування подій і отримання велоикого зображення.
// Інсталяція бібліотеки та добавляння модального вікна
// Додавання закриття модального вікна після натискання клавіші Escape.

function onGalleryMarkupClick(event) {
  event.preventDefault();

  const imageEl = event.target;

  if (!imageEl.classList.contains("gallery__image")) {
    return;
  }

  const largeItem = imageEl.dataset.source;
  const instance = basicLightbox.create(
    `
    <img src="${largeItem}" width="800" height="600">
  `,
    {
      onShow: () => {
        document.addEventListener("keydown", keyDown);
      },
      onClose: () => {
        document.removeEventListener("keydown", keyDown);
      },
    }
  );

  instance.show();

  function keyDown(event) {
    if (event.key === "Escape") {
      instance.close();
    }
  }
}
