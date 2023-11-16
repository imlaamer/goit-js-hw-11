import { refs } from "./refs";

export function smoothScroll() {
  const { height: cardHeight } =
    refs.galleryDivEl.firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: (cardHeight * 2 - 18),
    behavior: 'smooth',
  });
}
// document.querySelector('.gallery');

