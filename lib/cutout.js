import { backgroundColor } from './compute.js';
import { clone } from './image.js';
import { Model } from './model.js';
import isNdarray from 'isndarray';

/**
 * Render a raster image to a collection of shapes
 * @param {ndarray} target The image to render to svg
 * @param {Object} [options] Configuration options
 * @param {number} [options.alpha=255] The opacity of the shapes (0-255)
 * @param {number[]} [options.background] Optional background color, expressed as an array of four numbers between 0 - 255 for respectively red, green, blue and transparency
 * @param {string[]} [options.shapeTypes] The types of shapes to use when generating the image, available are: `Circle`, `Cubic`, `RotatedEllipse`, `Ellipse`, `Line`, `Quadratic`, `Rect`, `RotatedRect`, `Square` and `Triangle`
 * @param {number} [options.amountOfShapes=1000] The number of shapes to try per step
 * @param {number} [options.amountOfAttempts=100] The number of times to mutate each candidate shape
 */
export class Cutout {
  /* istanbul ignore next */
  constructor(target, options = {}) {
    const settings = Object.assign(
      {
        alpha: 255,
        shapeTypes: [
          'Circle',
          'Cubic',
          'RotatedEllipse',
          'Ellipse',
          'Line',
          'Quadratic',
          'Rect',
          'RotatedRect',
          'Square',
          'Triangle'
        ],
        amountOfShapes: 1000,
        amountOfAttempts: 100
      },
      options
    );

    if (!isNdarray(target)) {
      throw new Error('Supplied image is not an ndarray');
    }

    // Ensure that target has transparency
    if (!(target.shape[2] === 4)) {
      // eslint-disable-next-line no-param-reassign
      target = clone(target);
    }

    // Calculate background color if it wasn't supplied
    const background = settings.background || backgroundColor(target);

    this.settings = settings;
    this.model = new Model(target, background);
  }

  /**
   * Get the current image
   * @return {ndarray} The current image
   */

  get image() {
    return this.model.image;
  }

  /**
   * Get the current svg
   * @return {string} The current svg
   */

  get svg() {
    return this.model.svg;
  }

  /**
   * Get the current difference
   * @return {number} The current difference
   */

  get difference() {
    return this.model.difference;
  }

  /**
   * Add a single new shape
   * @return {this} The class instance
   */

  step() {
    this.model.step(
      this.settings.shapeTypes,
      this.settings.alpha,
      this.settings.amountOfShapes,
      this.settings.amountOfAttempts
    );

    return this;
  }
}
