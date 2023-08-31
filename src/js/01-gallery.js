import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css'; // Імпорт стилів бібліотеки
import { galleryItems } from './gallery-items.js';

const galleryList = document.querySelector('.gallery');

const galleryMarkup = galleryItems
  .map(
    item => `
    <li class="gallery__item">
      <a class="gallery__link" href="${item.original}">
        <img
          class="gallery__image"
          src="${item.preview}"
          alt="${item.description}"
        />
      </a>
    </li>
  `
  )
  .join('');

galleryList.insertAdjacentHTML('beforeend', galleryMarkup);

// Ініціалізація бібліотеки SimpleLightbox
const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

// Обробник події кліку на зображенні
galleryList.addEventListener('click', event => {
  event.preventDefault();
});
