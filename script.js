const search = document.getElementById("search");
const submit = document.getElementById("submit");
const random = document.getElementById("random");
const resultHeading = document.getElementById("meal-result-heading");
const mealsEl = document.getElementById("meals");
const single_mealEl = document.getElementById("single-meal-container");

      function findMeal(e) {
        e.preventDefault();
        const item = search.value.trim();
        if (item) {
          fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${item}`)
            .then((res) => res.json())
            .then((data) => {
              resultHeading.textContent = `Search Results for "${item}"`;
              single_mealEl.innerHTML = "";
              if (!data.meals) {
                resultHeading.textContent = `Oops! No Results for "${item}"`;
                mealsEl.innerHTML = "";
              } else {
                mealsEl.innerHTML = data.meals
                  .map(
                    (meal) => `
                    <div class="meal">
                      <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
                      <div class="meal-info" data-mealid="${meal.idMeal}">
                        <h3>${meal.strMeal}</h3>
                      </div>
                    </div>
                  `
                  )
                  .join("");
              }
              search.value = "";
            });
        } else {
          alert("Please enter a meal name to search.");
        }
      }

      function getsingleitemId(mealId) {
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
          .then((res) => res.json())
          .then((data) => {
            const meal = data.meals[0];
            addMealToDOM(meal);
          });
      }

      function getRandomMeal() {
        mealsEl.innerHTML = "";
        resultHeading.textContent = "Your Random Meal Recipe is here!";
        fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
          .then((res) => res.json())
          .then((data) => {
            const meal = data.meals[0];
            addMealToDOM(meal);
          });
      }

      function addMealToDOM(meal) {
        const ingredients = [];
        for (let i = 1; i <= 20; i++) {
          if (meal[`strIngredient${i}`]) {
            ingredients.push(
              `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
            );
          } else {
            break;
          }
        }

        single_mealEl.innerHTML = `
          <div class="single-meal" id="result">
            <h1>${meal.strMeal}</h1>
            <div class="single-meal-info">
              ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ""}
              <hr />
              ${meal.strArea ? `<p>${meal.strArea}</p>` : ""}
            </div>
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
            <h2>Ingredients</h2>
            <ul>
              ${ingredients.map((ing) => `<li>${ing}</li>`).join("")}
            </ul>
            <h2>Instructions</h2>
            <p>${meal.strInstructions}</p>
          </div>
        `;
      }

      submit.addEventListener("submit", findMeal);
      random.addEventListener("click", getRandomMeal);
      mealsEl.addEventListener("click", (e) => {
  const mealInfo = e.composedPath().find((el) =>
    el.classList?.contains("meal-info")
  );
  if (mealInfo) {
    const mealId = mealInfo.getAttribute("data-mealid");
    getsingleitemId(mealId);

    setTimeout(() => {
      const resultEl = document.getElementById("result");
      if (resultEl) {
        resultEl.scrollIntoView({ behavior: "smooth" });
      }
    }, 300);
  }
});

const toggleBtn = document.getElementById('theme-toggle');

toggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');

  if (document.body.classList.contains('dark-mode')) {
    toggleBtn.innerHTML = `<i class="fa-solid fa-sun"></i>`;
  } else {
    toggleBtn.innerHTML = `<i class="fa-solid fa-moon"></i>`;
  }
});
