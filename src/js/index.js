require("@babel/polyfill");
import Search from "./model/Search";
import { elements, renderLoader, clearLoader } from "./view/base";
import * as searchView from "./view/searchView";
import Recipe from "./model/Recipe";
/**
 * web app iin tuluv
 * -hailtiin ur dun
 * -uzuulj bui jor
 * -like lsan joruud
 * -zahialj bgaa joriin nairlaga
 */
const state = {};

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

const r = new Recipe(47746);
r.getRecipe();
