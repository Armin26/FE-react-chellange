import React from 'react';
import { Routes, Route, Link } from "react-router-dom";
import parse from 'html-react-parser';
import './Home.css';
import Details from '../details/Details';
import IRecipeResults, { IRecipe } from '../models/RecipeModel';
import { Recipes } from '../endpoint/endpoints';
import { debounce } from "lodash";

function Home() {

  const cuisines =
    ['African', 'American', 'British', 'Cajun', 'Caribbean', 'Eastern European', 'European',
      'French', 'German', 'Greek', 'Indian', 'Irish', 'Italian', 'Japanese',
      'Jewish', 'Korean', 'Latin American', 'Mediterranean', 'Mexican', 'Middle Eastern',
      'Nordic', 'Southern', 'Spanish', 'Thai', 'Vietnamese'];

  const mealTypes =
    ['main course', 'side dish', 'dessert', 'appetizer', 'salad', 'bread', 'breakfast',
      'soup', 'beverage', 'sauce', 'marinade', 'fingerfood', 'snack', 'drink'];

  const sort =
    ['popularity', 'healthiness', 'price', 'time', 'random'];

  const defaultRecipes: IRecipe[] = [];

  const [recipes, setRecipes]: [IRecipe[], (recipes: IRecipe[]) => void] = React.useState(
    defaultRecipes
  );

  const [loading, setLoading]: [
    boolean,
    (loading: boolean) => void
  ] = React.useState<boolean>(true);

  const [error, setError]: [string, (error: string) => void] = React.useState('');

  React.useEffect(() => {
    loadRecipes('')
  }, []);

  function loadRecipes(query: string) {
    setLoading(true);

    Recipes.search(query, '', '', '')
      .then((response) => {
        setRecipes(response.data.results);
        setLoading(false);
      })
      .catch((ex) => {
        let error = ex.message;
        setError(error);
        setLoading(false);
      });
  }

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    loadRecipes(event.target.value)
  };
  const debouncedChangeHandler = React.useCallback(
    debounce(changeHandler, 700)
    , []);

  return (
    <>
      <main>
        <h1> Recipes </h1>

        <div className="navbar">
          <input placeholder="Search recipes" onChange={debouncedChangeHandler} />
          <div className="dropdown">
            <button className="dropbtn">Cuisine <i className="fa fa-caret-down"></i>
            </button>
            <div className="dropdown-content">
              {cuisines.map((cuisine) => (
                <button key={cuisine} >{cuisine}</button>
              ))}
            </div>
          </div>

          <div className="dropdown">
            <button className="dropbtn">Type <i className="fa fa-caret-down"></i>
            </button>
            <div className="dropdown-content">

              {mealTypes.map((mealType) => (

                <button key={mealType} >{mealType}</button>
              ))}
            </div>
          </div>

          <div className="dropdown align-left">
            <button className="dropbtn">Sort <i className="fa fa-caret-down"></i>
            </button>

            <div className="dropdown-content">
              {sort.map((sort) => (
                <button key={sort} >{sort}</button>
              ))}
            </div>
          </div>
        </div>

        <div className="wrapper">
          {!loading ?
            recipes.map((recipe) => (
              <div key={recipe.id} className="box">
                <nav>
                  <Link to={`/details/${recipe.id}`}>

                    <img className="center" src={recipe.image} />
                    <h2>{recipe.title}</h2>
                    <p>
                      {parse(recipe.summary)}
                    </p>
                    <hr className="solid" />
                    <span> {recipe.readyInMinutes}min </span> <span className="align-left"> {recipe.servings}servings </span>
                  </Link>
                </nav>
              </div>
            )) : <div className="loader"></div>}
        </div>

        {error && <p>{error}</p>}
      </main>
    </>
  );
}

export default Home;
