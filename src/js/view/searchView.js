import { elements } from "./base";

const renderRecipe = (recipe) => {
  const markup = `<li><a class="results__link" href="#${recipe.recipe_id}"><figure class="results__fig"><img src="${recipe.image_url}" alt="Test"></figure><div class="results__data"><h4 class="results__name">${recipe.title}</h4><p class="results__author">${recipe.publisher}</p></div</a></li>`;

  elements.searchResultList.insertAdjacentHTML("beforeend", markup);
};
export const clearSearchQuery = () => {
  elements.searchInput.value = "";
};
export const clearSearchResult = () => {
  elements.searchResultList.innerHTML = "";
  elements.pageButtons.innerHTML = "";
};
export const getInput = () => elements.searchInput.value;
export const renderRecipes = (recipes, currentPage = 1, resPerPage = 10) => {
  const start = (currentPage - 1) * resPerPage;
  const end = currentPage * resPerPage;

  recipes.slice(start, end).forEach((el) => renderRecipe(el));
  //   tovch visible
  const totalPages = Math.ceil(recipes.length / resPerPage);
  renderButtons(currentPage, totalPages);
};

// type>>>prev,next
const createButton = (page, type, direction) =>
  `
<button class="btn-inline results__btn--${type}" data-goto=${page}>
                    <svg class="search__icon">
                        <use href="img/icons.svg#icon-triangle-${direction}"></use>
                    </svg>
                    <span>Хуудас ${page}</span>
                </button>`;

const renderButtons = (currentPage, totalPages) => {
  let buttonhtml;
  if (currentPage === 1 && totalPages > 1) {
    buttonhtml = createButton(2, "next", "right");
  } else if (currentPage < totalPages) {
    buttonhtml = createButton(currentPage - 1, "prev", "left");
    buttonhtml += createButton(currentPage + 1, "next", "right");
  } else if (currentPage === totalPages) {
    buttonhtml = createButton(currentPage - 1, "prev", "left");
  }

  elements.pageButtons.insertAdjacentHTML("afterbegin", buttonhtml);
};
