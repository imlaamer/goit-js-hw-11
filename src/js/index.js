import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { ImageApi } from './api';
import { refs } from './refs';
import { renderImages } from './renderMarkup';
import { smoothScroll } from './smoothScroll';

import {
  appendMarkup,
  notifySuccess,
  notifyNoImagesWarning,
  notifyFailure,
  notifyFillWarning,
  hideLoadMore,
  showLoadMore,
  showBackdropLoader,
  hideBackdropLoader,
  notifyEndInfo,
} from './helpers'; //

const imageApi = new ImageApi();

const lightbox = new SimpleLightbox('.gallery a', {
  overlayOpacity: 0.7,
  captionsData: 'alt',
  captionDelay: 250,
});

//-------------------------------------------------
async function onSubmit(e) {
  e.preventDefault();
  hideLoadMore();
  refs.galleryDivEl.innerHTML = '';
  if (refs.searchQueryEl.value.trim() === '') {
    return notifyFillWarning();
  }
  showBackdropLoader();
  imageApi.resetPage();

  try {
    const data = await imageApi.getImages();
    hideBackdropLoader();
    if (data.hits.length === 0) {
      return notifyNoImagesWarning();
    }
    if (imageApi.page === 1) {
      notifySuccess(data.totalHits);
    }
    const galleryMarkup = renderImages(data.hits);
    appendMarkup(refs.galleryDivEl, galleryMarkup);
    lightbox.refresh();

    if (data.totalHits === data.hits.length) {
      notifyEndInfo();
      hideLoadMore();
      return;
    }
    showLoadMore();
  } catch (error) {
    notifyFailure();
    console.error(error.message);
  }
}
refs.formEl.addEventListener('submit', onSubmit);

//-------------------------------------------
async function onLoadMore() {
  imageApi.incrementPage();
  try {
    const data = await imageApi.getImages();
    const galleryMarkup = renderImages(data.hits);
    appendMarkup(refs.galleryDivEl, galleryMarkup);
    lightbox.refresh();
    smoothScroll();
    // const isArrLengLessFourty = data.hits.length < imageApi.per_page;
    //    if (data.hits.length < imageApi.per_page)
    const allHitsAmountOnThePage = imageApi.per_page * imageApi.page;
    if (data.totalHits <= allHitsAmountOnThePage) {
      notifyEndInfo();
      hideLoadMore();
      //   console.log('This is the end of your array');
      return;
    }
  } catch (error) {
    notifyFailure();
    console.error(error.message);
  }
}
refs.btnLoadMoreEl.addEventListener('click', onLoadMore);
