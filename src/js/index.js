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
} from './helpers';

const imageApi = new ImageApi();

//-------------------------------------------------
async function onSubmit(e) {
  e.preventDefault();
  hideLoadMore();
  // refs.searchQueryEl.disable = true;
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
   
//---
    const lightbox = new SimpleLightbox('.gallery a', {
      overlayOpacity: 0.7,
      captionsData: 'alt',
      captionDelay: 250,
    });
    lightbox.refresh();
//---
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
    
  //  refs.searchQueryEl.disable = false;
}
refs.formEl.addEventListener('submit', onSubmit);



//-------------------------------------------
async function onLoadMore() {
  imageApi.incrementPage();
  try {
    const data = await imageApi.getImages();
    const galleryMarkup = renderImages(data.hits);
    appendMarkup(refs.galleryDivEl, galleryMarkup);
 smoothScroll();
    // const isLArrLengLessFourty = data.hits.length < imageApi.per_page;
    //    if (data.hits.length < imageApi.per_page)

    const allHitsAmountOnThePage = imageApi.per_page * imageApi.page;
    // console.log(allHitsAmountOnThePage);
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

//?сет интервал / таймаут на сабмит по кнопке щоб заборонити повторні запити на те саме
//?нотифікаця забирається по кліку/ через якийсь час
//послідовність інструкцій ??
//рефакторинг onSubmit