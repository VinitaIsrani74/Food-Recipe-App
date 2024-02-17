const btn = document.querySelector(".btn");
const userInp = document.querySelector(".inp");
const recipeBody = document.querySelector(".recipe-body");

const findRecipe = async (userInp) => {
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${userInp}`;
  const res = await fetch(url);
  const data = await res.json();
  console.log(data);
if(data.meals == null){
  recipeBody.style.display = "flex";
  recipeBody.innerHTML = `
   <img src="./assets/lost.gif" />
  <h1 class="not-found"> Recipe not found </h1>
  `
}
  recipeBody.style.display = "flex";
  userInp.value = "";
  data.meals.forEach((meal) => {
    const recipeDiv = document.createElement("div");
    recipeDiv.classList.add("recipe");
    recipeDiv.innerHTML = `
    <img src="${meal.strMealThumb}">
    <h1>${meal.strMeal}</h1>
    <div class="dish"> <span>${meal.strArea}</span> Dish </div>
    <div class="category">Belongs to <span>${meal.strCategory}</span> Category </div>
   
    `;

    const viewRecipeBtn = document.createElement("button");
    viewRecipeBtn.classList.add("recipe-btn");
    viewRecipeBtn.textContent = "View Recipe";
    recipeDiv.appendChild(viewRecipeBtn);

    // adding event listener to view recipe button

    viewRecipeBtn.addEventListener("click", () => {
      openRecipePopup(meal);
    });

    recipeBody.appendChild(recipeDiv);

    viewRecipeBtn.addEventListener("click", () => {
      const recipeContainer = document.querySelector(".view-recipe-effect");
      const mealName = document.querySelector(".meal-name");
      const youtubeLink = document.querySelector(".youtube-link");
      const instructions = document.querySelector(".instructions");
      const ingredientList = document.querySelector(".ingredient-list");
      const crossBtn = document.querySelector("#cross-btn");
      ingredientList.innerHTML = "";
      instructions.innerHTML = meal.strInstructions;
      for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        if (ingredient != "") {
          ingredientList.innerHTML =
            ingredientList.innerHTML + `<li>Ingregient ${i}: ${ingredient}`;
        }
      }
      crossBtn.addEventListener("click", () => {
        recipeContainer.style.display = "none";
      });
      mealName.innerHTML = meal.strMeal;
      youtubeLink.setAttribute("href", meal.strYoutube);
      recipeContainer.style.display = "flex";
    });
  });
};

btn.addEventListener("click", (e) => {
  e.preventDefault();
  recipeBody.style.display = "none";
  recipeBody.innerHTML = "";

  findRecipe(userInp.value);
});
