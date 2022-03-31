export interface IRecipe {
  id: number;
  image: string;
  title: string;
  summary: string;
  servings: number;
  readyInMinutes: number
}

interface IRecipeResults {
  results: [IRecipe]
}

export default IRecipeResults;
