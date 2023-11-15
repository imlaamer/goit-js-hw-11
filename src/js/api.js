import axios from 'axios';
import { refs } from './refs';

axios.defaults.baseURL = 'https://pixabay.com/api/';

export class ImageApi {
    constructor() {
        this.page = 1;
        this.per_page = 40;
        //   this.q = '';
    }

    async getImages() {
        //??
        const searchParams = new URLSearchParams({
            key: '40654328-1d494b77cf448b3eaf3a4f517',
            q: `${refs.searchQueryEl.value}`,
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: true,
            per_page: this.per_page,
            page: this.page,
        });

        const res = await axios.get('', {
            params: searchParams,
        });
        return res.data;
    }

    incrementPage() {
        this.page += 1;
    }

    resetPage() {
        this.page = 1;
    }
}

