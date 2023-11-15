import { refs } from './refs';
import { Notify } from 'notiflix';


//------------------------додати в ДОМ
function appendMarkup(parentEl, markup) {
  parentEl.insertAdjacentHTML('beforeend', markup);
}

//------------------------нотифікація
function notifySuccess(totalHits) {
    Notify.success(`Hooray! We found ${totalHits} images.`);
}

function notifyEndInfo(){
    Notify.info( "We're sorry, but you've reached the end of search results.")
   
}

function notifyNoImagesWarning() {
  Notify.warning(
    'Sorry, there are no images matching your search query. Please try again.'
  );
}

function notifyFillWarning() {
    Notify.warning('Please fill out the search field')
}

function notifyFailure() {
    Notify.failure('Oops! Something went wrong! Try reloading the page!');
}

//------------------------лоуд мор кнопка

function showLoadMore() {
      refs.btnLoadMoreEl.classList.remove('visually-hidden');
}


function hideLoadMore() {
    refs.btnLoadMoreEl.classList.add('visually-hidden');
}


//------------------------бекдропg з лоудером

function showBackdropLoader() {
        refs.backdropEl.classList.remove('visually-hidden');
}

function hideBackdropLoader () {
      refs.backdropEl.classList.add('visually-hidden');
}
 

export { appendMarkup, notifySuccess, notifyNoImagesWarning, notifyFailure, notifyFillWarning, hideLoadMore, showLoadMore, showBackdropLoader, hideBackdropLoader,notifyEndInfo };
// ??