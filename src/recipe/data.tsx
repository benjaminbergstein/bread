import { RecipePercentInput } from './types';

export const RECIPE_PROFILES:{ [index:string] : RecipePercentInput } = {
  sourdoughLoaf: {
    totalDoughWeight: 1970,
    hydrationPercent: 77,
    starterPercent: 10,
    saltPercent: 1,
    scale: 100,
    yield: 'One dough ball',
  },
  pizzaDough: {
    totalDoughWeight: 1000,
    hydrationPercent: 68,
    starterPercent: 10,
    saltPercent: 1,
    scale: 100,
    yield: 'Four 250g dough balls',
  },
};

