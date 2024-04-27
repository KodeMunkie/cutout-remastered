/**
 * Gets the best state using a random algorithm
 */
import { randomShapeOf } from '../shapes/shapes';
import { State } from './State';
import { Shape } from '../shapes/Shape';
import { NdArray } from 'ndarray';
import { Options } from '../config/Options';

export const bestRandomState = (shapeTypes: string[], alpha: number, amountOfShapes: number, target: any, current: {
  shape: number[];
}, buffer: any, lastScore: number): State => {
  const xBound: number = current.shape[0] - 1;
  const yBound: number = current.shape[1] - 1;

  let bestEnergy: number = 0;
  let bestState = null;

  for (let i = 0; i < amountOfShapes; i += 1) {
    const shape: Shape = randomShapeOf(shapeTypes, xBound, yBound);
    const state: State = new State(shape, alpha, target, current, buffer);
    const energy: number = state.energy(lastScore);

    if (i === 0 || energy < bestEnergy) {
      bestEnergy = energy;
      bestState = state;
    }
  }

  return bestState!;
};

/**
 * Hill climbing optimization algorithm, attempts to minimize energy (the error/difference)
 */

const hillClimb = (state: State, amountOfAttempts: number, lastScore: number): State => {
  let currentState: State = state.clone();
  let bestState: State = state.clone();
  let bestEnergy: number = state.energy(lastScore);
  let attempt: number = 0;

  for (;attempt < amountOfAttempts;) {
    const undo: State = currentState.mutate();
    const energy: number = currentState.energy(lastScore);

    if (energy >= bestEnergy) {
      currentState = undo;
      attempt += 1;
      continue;
    }

    bestEnergy = energy;
    bestState = currentState.clone();
  }

  return bestState;
};

/**
 * Gets the best state using a hill climbing algorithm
 */

export const bestHillClimbState = (options: Options,
  target: NdArray,
  current: { shape: number[]; },
  buffer: any,
  lastScore: number
) => {
  let state: State = bestRandomState(
    options.shapeTypes,
    options.alpha,
    options.amountOfShapes,
    target,
    current,
    buffer,
    lastScore
  );
  return hillClimb(state, options.amountOfAttempts, lastScore);
};
