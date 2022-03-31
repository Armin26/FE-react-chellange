import { axiosMockAdapterInstance } from './mock';
import IRecipeResults, { IRecipe } from '../../models/RecipeModel';

const apiKey = "d653dc61a60e4f4fbdb267844bf749ef"

const recipes = [{
  id: 654959,
  title: "Pasta With Tuna",
  summary: "Pasta With Tuna might be just the main course you are searching for. One serving contains",
  readyInMinutes: 45,
  servings: 4,
  image: "https://spoonacular.com/recipeImages/654959-312x231.jpg"
},
{
  id: 654960,
  title: "Pasta With Tuna",
  summary: "Pasta With Tuna might be just the main course you are searching for. One serving contains",
  readyInMinutes: 45,
  servings: 4,
  image: "https://spoonacular.com/recipeImages/654959-312x231.jpg"
},
{
  id: 654961,
  title: "Pasta With Tuna",
  summary: "Pasta With Tuna might be just the main course you are searching for. One serving contains",
  readyInMinutes: 45,
  servings: 4,
  image: "https://spoonacular.com/recipeImages/654959-312x231.jpg"
},
{
  id: 654962,
  title: "Pasta With Tuna",
  summary: "Pasta With Tuna might be just the main course you are searching for. One serving contains",
  readyInMinutes: 45,
  servings: 4,
  image: "https://spoonacular.com/recipeImages/654959-312x231.jpg"
}
  ,
{
  id: 654963,
  title: "Pasta With Tuna",
  summary: "Pasta With Tuna might be just the main course you are searching for. One serving contains",
  readyInMinutes: 45,
  servings: 4,
  image: "https://spoonacular.com/recipeImages/654959-312x231.jpg"
}
  ,
{
  id: 654964,
  title: "Pasta With Tuna",
  summary: "Pasta With Tuna might be just the main course you are searching for. One serving contains",
  readyInMinutes: 45,
  servings: 4,
  image: "https://spoonacular.com/recipeImages/654959-312x231.jpg"
}
  ,
{
  id: 654965,
  title: "Pasta With Tuna",
  summary: "Pasta With Tuna might be just the main course you are searching for. One serving contains",
  readyInMinutes: 45,
  servings: 4,
  image: "https://spoonacular.com/recipeImages/654959-312x231.jpg"
}]

axiosMockAdapterInstance
  .onGet(`/complexSearch?query=pasta&addRecipeInformation=true&apiKey=${apiKey}`)
  .reply(() => {
    const results = recipes
    return [200, { results }]
  });

axiosMockAdapterInstance
  .onGet(`/${recipes[0].id}/similar?apiKey=${apiKey}`)
  .reply(200, recipes);

axiosMockAdapterInstance
  .onGet(`/${recipes[0].id}/information?includeNutrition=false&apiKey=${apiKey}`)
  .reply(200, recipes[0]);
