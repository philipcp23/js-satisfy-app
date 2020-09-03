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
            this.img = results.data.recipe.image_url;
            this.url = results.data.recipe.source_url;
            this.ingredients = results.data.recipe.ingredients;
        } catch(error) {
            console.log(error);
            alert('alert in getRecipe()');
        }
    }

    calcTime() {
        const numIng = this.ingredients.lenght;
        const periods = Math.ceil(numIng / 3);
        this.time = periods * 15;
    }

    calcServing() {
        this.servings = 4;
    }

    parseIngredients() {
        const unitsLong = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds'];
        const unitsShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound'];
        const units = [...unitsShort, 'kg', 'g'];

        const newIngredients = this.ingredients.map(el => {
            let ingredient = el.toLowerCase();
            unitsLong.forEach((unit, i) => {
                ingredient = ingredient.replace(unit, unitsShort[i]);
            });

            ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');

            const arrIng = ingredient.split(' ');
            const unitIndex = arrIng.findIndex(el2 => units.includes(el2));

            let objIng;
            if(unitIndex > -1) { // is a unit
                const arrCount = arrIng.slice(0, unitIndex);

                let count;
                if(arrCount.length === 1) {
                    count = eval(arrIng[0].replace('-', '+'));
                } else { 
                    count = eval(arrIng.slice(0, unitIndex).join('+'));
                }

                objIng = {
                    count,
                    unit: arrIng[unitIndex],
                    ingredient: arrIng.slice(unitIndex + 1).join(' ')
                };

            } else if(parseInt(arrIng[0], 10)) { // no unit but first el is number
                objIng = {
                    count: parseInt(arrIng[0], 10),
                    unit: '',
                    ingredient: arrIng.slice(1).join(' ')
                };

            } else if(unitIndex > -1) { // no unit no number
                objIng = {
                    count: 1,
                    unit: '',
                    ingredient
                };
            };
            return objIng;

        });

        this.ingredients = newIngredients;

    }
}

