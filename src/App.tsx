import React from 'react';
import logo from './logo.svg';
import throttle from 'lodash/throttle';
import identity from 'lodash/identity';
import Input from './Input';
import { Row, Column } from './Table';
import { toHumanName } from './utils';
import {
  Recipe,
  RecipePercentInput,
} from './recipe/types'
import {
  recipeFromInput,
} from './recipe'
import {
  RECIPE_PROFILES,
} from './recipe/data'

const DEFAULT_RECIPE = 'sourdoughLoaf';

const App: React.FC = () => {
  const [recipeInput, setRecipeInput] = React.useState<RecipePercentInput>(RECIPE_PROFILES[DEFAULT_RECIPE]);
  const calculatedRecipe : Recipe = recipeFromInput(recipeInput)
  const [recipe, setRecipe] = React.useState<Recipe>(calculatedRecipe);

  const updateRecipeInput = (fieldName: string, newValue: string) => {
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
    const newRecipeInput = RECIPE_PROFILES[e.target.value];
    setRecipeInput(newRecipeInput);
    setRecipe(recipeFromInput(newRecipeInput));
  }

  return (
    <div style={{
      margin: '30px 30% 0',
    }}>
      <div>
        <Row>
          <Column>Preset</Column>
          <Column right>
            <select onChange={handleSelect}>
              {Object.keys(RECIPE_PROFILES).map((recipeName: string) => (
                <option value={recipeName}>{toHumanName(recipeName)}</option>
              ))}
            </select>
          </Column>
        </Row>

        <hr/>

        <form onSubmit={handleSubmit}>
          <div>Yields: {recipeInput.yield}</div>
          {Object.entries(recipeInput).map(([fieldName, value]) => fieldName != 'yield' && (
            <Input fieldName={fieldName} value={value} onChange={(e: any) => updateRecipeInput(fieldName, e.target.value)} />
          ))}

          <hr/>
          <Row>
            <Column right>
              <button>Calculate</button>
            </Column>
          </Row>
          <hr/>

          {Object.entries(recipe).map(([fieldName, value]) => (
            <Row>
              <Column>{toHumanName(fieldName)}</Column>
              <Column right>{value} grams</Column>
            </Row>
          ))}
        </form>
      </div>
    </div>
  );
}

export default App;
