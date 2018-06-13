const { randomIntInclusive, clampToInt, randomNormal } = require('../util');
const { bezierToScanlines } = require('../rasterizer');

/**
 * A quadratic bezier
 * @param {number} xBound maximum value for x-coordinates, zero-based
 * @param {number} yBound maximum value for y-coordinates, zero-based
 */

class Quadratic {
  constructor(xBound, yBound) {
    this.xBound = xBound;
    this.yBound = yBound;

    this.x1 = randomIntInclusive(0, xBound);
    this.y1 = randomIntInclusive(0, yBound);
    this.x2 = this.x1 + randomIntInclusive(-15, 15);
    this.y2 = this.y1 + randomIntInclusive(-15, 15);
    this.x3 = this.x1 + randomIntInclusive(-15, 15);
    this.y3 = this.y1 + randomIntInclusive(-15, 15);
  }

  set props([x1, y1, x2, y2, x3, y3]) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.x3 = x3;
    this.y3 = y3;
  }

  get props() {
    return [this.x1, this.y1, this.x2, this.y2, this.x3, this.y3];
  }

  get svg() {
    const [x1, y1, x2, y2, x3, y3] = this.props;
    const shape = [
      'path',
      {
        d: `M${x1},${y1} Q${x2},${y2} ${x3},${y3}`
      }
    ];

    return shape;
  }

  clone() {
    const quadratic = new Quadratic(this.xBound, this.yBound);
    quadratic.props = this.props;

    return quadratic;
  }

  mutate() {
    /* istanbul ignore next */
    switch (randomIntInclusive(0, 2)) {
      case 0:
        this.x1 = clampToInt(this.x1 + randomNormal() * 15, 0, this.xBound);
        this.y1 = clampToInt(this.y1 + randomNormal() * 15, 0, this.yBound);
        break;
      case 1:
        this.x2 = clampToInt(this.x2 + randomNormal() * 15, 0, this.xBound);
        this.y2 = clampToInt(this.y2 + randomNormal() * 15, 0, this.yBound);
        break;
      case 2:
        this.x3 = clampToInt(this.x3 + randomNormal() * 15, 0, this.xBound);
        this.y3 = clampToInt(this.y3 + randomNormal() * 15, 0, this.yBound);
    }
  }

  rasterize() {
    const [x1, y1, x2, y2, x3, y3] = this.props;

    return bezierToScanlines(
      x1,
      y1,
      x2,
      y2,
      x3,
      y3,
      undefined,
      undefined,
      this.xBound,
      this.yBound
    );
  }
}

module.exports = Quadratic;
