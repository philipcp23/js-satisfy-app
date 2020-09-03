import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import { elements, renderLoader, clearLoader } from './views/base';

/** Global state of the app
 * - Search object
 * - Current recipe object
 * - Shopping list object
 * - Liked recipes
 */
const state = {};

/**
 **********************SEARCH CONTROLLER**********************
 */

const controlSearch = async()=> {
    // 1. Get query from view
    const query = searchView.getInput();
    console.log(query);
    if(query) {
        // 2. New search object and add to state
        state.search = new Search(query);
    }
    // 3. Prepare UI for results
    searchView.clearInput();
    searchView.clearResults();
    renderLoader(elements.searchResult);
    try {
        // 4. Search for recipes
        await state.search.getResults();        
        // 5. Render results on UI
        clearLoader();
        searchView.renderResults(state.search.results);

    } catch(err) {
        alert('Error in SEARCH');
        searchView.clearResults();
    }

}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});

elements.searchResultPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');
    if(btn) {
        const goToPage = parseInt(btn.dataset.goto, 10);
        searchView.clearResults();
        searchView.renderResults(state.search.results, goToPage);
    }
});


/**
 **********************RECIPE CONTROLLER**********************
 */
const controlRecipe = async () => {
    const id = window.location.hash.replace('#', '');
    
    if(id) {
        recipeView.clearRecipe();
        renderLoader(elements.recipe); 
        if(state.search) {
            searchView.highlightSelected(id);
        }
        state.recipe = new Recipe(id);

        try {
            await state.recipe.getRecipe();
            state.recipe.parseIngredients();

            state.recipe.calcTime();
            state.recipe.calcServing();

            clearLoader();
            recipeView.renderRecipe(state.recipe);
        } catch(err) {
            alert('Error Processing Recipe!');
        }        
    }
};

 ['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));

