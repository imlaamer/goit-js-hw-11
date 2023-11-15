import { ImageApi } from './api';
import { refs } from './refs';
import { renderImages } from './renderMarkup';

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
} from './helpers';

const imageApi = new ImageApi();

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
      notifyNoImagesWarning();
      return;
    }
    if (imageApi.page === 1) {
      notifySuccess(data.totalHits);
    }
    const galleryMarkup = renderImages(data.hits);
    appendMarkup(refs.galleryDivEl, galleryMarkup);

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
    if (data.hits.length < imageApi.per_page) {
      notifyEndInfo();
      hideLoadMore();
      return; //
    }
  } catch (error) {
    notifyFailure();
    console.error(error.message);
  }
}

refs.btnLoadMoreEl.addEventListener('click', onLoadMore);
