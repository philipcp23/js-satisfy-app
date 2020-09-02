import axios from 'axios';
import { api } from '../config';

export default class Recipe {
    constructor(id) {
        this.id = id;
    }

    async getRecipe() {
        try {
            const results = await axios(`${api}/get?rId=${this.id}`);
            this.title = results.data.recipe.title;
            this.author = results.data.recipe.publisher;
            this.img= results.data.recipe.image_url;
            this.url = results.data.recipe.source_url;
            this.ingredients = results.data.recipe.ingredients;
            console.log(results);
        } catch(error) {
            console.log(error);
            alert('alert in getRecipe()');
        }
    };

    calcTime() {
        const numIng = this.ingredients.lenght;
        const periods = Math.ceil(numIng / 3);
        this.time = periods * 15;
    };

    calcServing() {
        this.servings = 4;
    }
}

