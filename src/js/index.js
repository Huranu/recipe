require("@babel/polyfill");
import Search from "./model/Search";
import { elements, renderLoader, clearLoader } from "./view/base";
import * as searchView from "./view/searchView";
import Recipe from "./model/Recipe";
import {
  renderRecipe,
  clearRecipe,
  highlightSelectedRecipe,
} from "./view/recipeView";
import List from "./model/List";
import * as listView from "./view/listView";
import Like from "./model/Like";
/**
 * web app iin tuluv
 * -hailtiin ur dun
 * -uzuulj bui jor
 * -like lsan joruud
 * -zahialj bgaa joriin nairlaga
 */
const state = {};
/* 
hailtiin controller model>controller<view


*/

const controlSearch = async () => {
  // 1.webees haisan ugiig gargaj avna.
  const query = searchView.getInput();
  if (query) {
    // 2.Shineer hailtiin object uusgene.(Search)
    state.search = new Search(query);
    // 3.Haihad zoriulj delgetsiig beldene.
    searchView.clearSearchQuery();
    searchView.clearSearchResult();
    renderLoader(elements.searchResultDiv);
    // 4.Hailtiig hiine.
    await state.search.doSearch();
    // 5.Hailtiin ur dung haruulna.
    clearLoader();
    if (state.search.result === undefined) alert("Hailtaar ilertsgui");
    else searchView.renderRecipes(state.search.result);
  }
};
elements.searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  controlSearch();
});

elements.pageButtons.addEventListener("click", (e) => {
  const btn = e.target.closest(".btn-inline");

  if (btn) {
    const goto = parseInt(btn.dataset.goto);
    searchView.clearSearchResult();
    searchView.renderRecipes(state.search.result, goto);
  }
});

// Joriin controller
const controlRecipe = async () => {
  // 1. url-ees id-iig salgah
  const id = window.location.hash.replace("#", "");

  if (id) {
    // 2. joriin modeliig uusgeh
    state.recipe = new Recipe(id);
    // 3. ui delgets beldene
    clearRecipe();
    renderLoader(elements.recipeDiv);
    highlightSelectedRecipe(id);
    // 4. joroo tataj avchrah
    await state.recipe.getRecipe();
    // 5. joriig guitsetgeh hugatsaa bolon ortsiig tootsoolno.
    clearLoader();
    state.recipe.calcTime();
    state.recipe.calcHuniiToo();
    // 6. joroo delgetsend gargana.
    renderRecipe(state.recipe);
  }
};
// window.addEventListener("hashchange", controlRecipe);
// window.addEventListener("load", controlRecipe);

["hashchange", "load"].forEach((event) =>
  window.addEventListener(event, controlRecipe)
);

/**
 * Nairlaganii controller
 */

const controlList = () => {
  // Nairlaganii model uusgeh
  state.list = new List();
  // tseverleh
  listView.clearItems();
  // Nairlagiig avch hiine
  state.recipe.ingredients.forEach((n) => {
    const item = state.list.addItem(n);
    listView.renderItem(item);
  });
};
// like controller
const controllLike = () => {
  // like iin model uusgeh
  state.likes = new Like();
  // haragdaj bga joriin id g oloh
  const currentRecipeId = state.recipe.id;
  // tuhain joriig like lsn esehiig oloh
  if (state.likes.isLiked(currentRecipeId)) {
    // like lsan bol like iig ustgah
  } else {
    state.likes.addLikes(
      currentRecipeId,
      state.recipe.title,
      state.recipe.publisher,
      state.recipe.image_url
    );
  }
};

elements.recipeDiv.addEventListener("click", (e) => {
  if (e.target.matches(".recipe__btn,.recipe__btn *")) {
    controlList();
  } else if (e.target.matches(".recipe__love,.recipe__love *")) {
    controllLike();
  }
});

elements.shoppingList.addEventListener("click", (e) => {
  const id = e.target.closest(".shopping__item").dataset.itemid;
  // model oos ustgah
  state.list.deleteItem(id);
  // delgetsees ustgah
  listView.deleteItem(id);
});
