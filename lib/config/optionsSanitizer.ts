import { Options } from './Options';

export const sanitizeOptions = (defaults: Options, options?: Options): Options => {
  if (!options) {
    return defaults;
  };
  if (!options.maxSize || options.maxSize < 1) {
    options.maxSize = defaults.maxSize;
  }
  if (!options.steps || options.steps < 1) {
    options.steps = defaults.steps;
  }
  if (!options.alpha || options.alpha < 0) {
    options.alpha = defaults.alpha;
  }
  if (!options.amountOfAttempts || options.amountOfAttempts < 1) {
    options.amountOfAttempts = defaults.amountOfAttempts;
  }
  if (!options.amountOfShapes || options.amountOfShapes < 1) {
    options.amountOfShapes = defaults.amountOfShapes;
  }
  if (!options.shapeTypes || options.shapeTypes.length == 0) {
    options.shapeTypes = defaults.shapeTypes;
  }
  // background color optional so omitted
  return options;
}