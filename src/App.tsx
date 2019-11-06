import React from 'react';
import logo from './logo.svg';
import throttle from 'lodash/throttle';
import identity from 'lodash/identity';
import Input from './Input';
import { Row, Column } from './Table';
import { toHumanName } from './utils';

interface Recipe {
  flour: number,
  water: number,
  starter: number,
  salt: number,
  totalDoughWeight: number,
};

interface RecipePercentInput {
  totalDoughWeight: number,
  hydrationPercent: number,
  starterPercent: number,
  saltPercent: number,
};

const RECIPE_INPUTS:{ [index:string] : RecipePercentInput } = {
  sourdough: {
    totalDoughWeight: 1970,
    hydrationPercent: 77,
    starterPercent: 10,
    saltPercent: 1,
  },
  pizza: {
    totalDoughWeight: 1000,
    hydrationPercent: 68,
    starterPercent: 10,
    saltPercent: 1,
  },
};

const percent = (p: number) => p / 100;

const recipeFromInput = (recipeInput: RecipePercentInput) => {
  const {
    totalDoughWeight,
    hydrationPercent,
    starterPercent,
    saltPercent,
  } = recipeInput;

  const salt : number = (percent(saltPercent) * totalDoughWeight) / (1 + percent(saltPercent))
  const coreIngredientWeight : number = totalDoughWeight - salt;
  const dryWeight : number = coreIngredientWeight / (1 + percent(hydrationPercent));
  const wetWeight : number = coreIngredientWeight - dryWeight;
  const flourWeight : number = dryWeight / (1 + percent(starterPercent));
  const starter : number = (dryWeight - flourWeight) * 2
  const waterWeight : number = wetWeight - (starter / 2);

  const recipe : Recipe = {
    flour: Math.round(flourWeight),
    water: Math.round(waterWeight),
    starter: Math.round(starter),
    salt: Math.round(salt),
    totalDoughWeight: Math.round(flourWeight + waterWeight + starter + salt),
  };

  return recipe;
}

const DEFAULT_RECIPE = 'sourdough';

const App: React.FC = () => {
  const [recipeInput, setRecipeInput] = React.useState<RecipePercentInput>(RECIPE_INPUTS[DEFAULT_RECIPE]);
  const calculatedRecipe : Recipe = recipeFromInput(recipeInput)
  const [recipe, setRecipe] = React.useState<Recipe>(calculatedRecipe);
  const [scale, setScale] = React.useState<number>(1);

  const updateRecipeInput = (fieldName: string, newValue: string) => {
    console.log(fieldName, newValue)
    setRecipeInput({
      ...recipeInput,
      [fieldName]: parseInt(newValue, 10),
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setRecipe(calculatedRecipe);
  };

  const handleSelect = (e: any) => {
    const newRecipeInput = RECIPE_INPUTS[e.target.value];
    setRecipeInput(newRecipeInput);
    setRecipe(recipeFromInput(newRecipeInput));
  }

  const scaleRecipeInput = (e: any) => {
    const newRecipeInput = {
      ...recipeInput,
      totalDoughWeight: recipeInput.totalDoughWeight * scale,
    };
    setRecipeInput(newRecipeInput);
    setRecipe(recipeFromInput(newRecipeInput));
    e.preventDefault();
  };

  return (
    <div style={{
      margin: '30px 20% 0',
    }}>
      <div>
        <Row>
          <Column>Preset</Column>
          <Column>
            <select onChange={handleSelect}>
              {Object.keys(RECIPE_INPUTS).map((recipeName: string) => (
                <option value={recipeName}>{toHumanName(recipeName)}</option>
              ))}
            </select>
          </Column>
        </Row>

        <form onSubmit={scaleRecipeInput}>
          <Input fieldName='scale' value={scale} onChange={(e: any) => setScale(e.target.value)} />
          <Row>
            <Column>
              <button>Scale</button>
            </Column>
          </Row>
        </form>

        <hr/>

        <form onSubmit={handleSubmit}>
          {Object.entries(recipeInput).map(([fieldName, value]) => (
            <Input fieldName={fieldName} value={value} onChange={(e: any) => updateRecipeInput(fieldName, e.target.value)} />
          ))}

          <hr/>
          <button>Calculate</button>
          <hr/>

          {Object.entries(recipe).map(([fieldName, value]) => (
            <Row>
              <Column>{toHumanName(fieldName)}</Column>
              <Column>{value}</Column>
            </Row>
          ))}
        </form>
      </div>
    </div>
  );
}

      // <Row>
      //   <Column>Salt</Column>
      //   <Column>{isNaN(salt) ? '-' : salt}</Column>
      // </Row>
      // <Input fieldName='hydration' value={userDefinedHydration || hydration} onChange={updateRecipe(recipe, setRecipe)} />
      // <Row>
      //   <Column>Total</Column>
      //   <Column>{totalDoughWeight}</Column>
      // </Row>
export default App;
