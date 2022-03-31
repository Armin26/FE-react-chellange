import { get } from './base';

const apiKey = "4b70fbe7358241cb8fb2d0dc12be8c20"

export const Recipes = {
  search: (query: string, cuisine: string, type: string, sort: string) =>
    get(`/complexSearch?addRecipeInformation=true&apiKey=${apiKey}${query && `&query=${query}`}`),
  details: (id: number) =>
    get(`/${id}/information?includeNutrition=false&apiKey=${apiKey}`),
  similar: (id: number) =>
    get(`/${id}/similar?apiKey=${apiKey}`),
}
