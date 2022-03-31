import React from 'react';
import parse from 'html-react-parser';
import './Details.css';
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import IRecipeResults, { IRecipe } from '../models/RecipeModel';
import { Recipes } from '../endpoint/endpoints';

function Details() {
  let params = useParams();
  const navigate = useNavigate();

  const defaultRecipes: IRecipe[] = [];
  const [recipes, setRecipes]: [IRecipe[], (recipes: IRecipe[]) => void] = React.useState(
    defaultRecipes
  );

  const defaultRecipe: IRecipe = {} as IRecipe;
  const [recipe, setRecipe]: [IRecipe, (recipe: IRecipe) => void] = React.useState(
    defaultRecipe
  );

  const [loading, setLoading]: [
    boolean,
    (loading: boolean) => void
  ] = React.useState<boolean>(true);

  const [similarLoading, setSimilarLoading]: [
    boolean,
    (similarLoading: boolean) => void
  ] = React.useState<boolean>(true);

  const [error, setError]: [string, (error: string) => void] = React.useState('');
  const [errorSimilar, setErrorSimilar]: [string, (errorSimilar: string) => void] = React.useState('');

  function loadData(id: number) {
    Recipes.details(id)
      .then((response) => {
        console.log(response.data);

        setRecipe(response.data);
        setLoading(false);
      })
      .catch((ex) => {
        let error = ex.message;

        setError(error);
        setLoading(false);
      });

    Recipes.similar(id)
      .then((response) => {
        console.log(response.data);
        setRecipes(response.data);
        setSimilarLoading(false);
      })
      .catch((ex) => {
        let error = ex.message;

        setErrorSimilar(error);
        setSimilarLoading(false);
      });
  }

  React.useEffect(() => {

    loadData(Number(params.recepieId))

  }, []);

  return (
    <>
      <main>
        <button onClick={() => navigate(-1)}>Back</button>
        {loading ? <div className="loader"></div> :
          <div className="content">

            <div className="summary">
              <h1> {recipe.title} </h1>
              {parse(recipe.summary)}
            </div>
            <img src={recipe.image} />

          </div>}
        {error && <p>{error}</p>}

        <h2> Similar Recipes </h2>
        {similarLoading ? <div className="loader"></div> :
          <div className="wrapper-horizontal">
            {recipes.map((recipe) => (

              <div key={recipe.id} className="box-horizontal">
              <img src={recipe.image} />
              <h2>{recipe.title}</h2>
              <button onClick={() => loadData(recipe.id)}> Test</button>
              <hr className="solid" />
              <span> {recipe.readyInMinutes}min </span> <span className="align-left"> {recipe.servings}servings </span>
              </div>
            ))}

          </div>}

        {errorSimilar && <p>{errorSimilar}</p>}
      </main>

    </>
  );
}

export default Details;
