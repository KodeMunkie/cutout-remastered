import { NdArray } from 'ndarray';
import { toSvg } from './export/svg';
import { bestHillClimbState } from './core/hillclimb';
import { RGBA } from 'color-blend/dist/types';
import { clone, create, draw } from './core/image';
import { backgroundColor, differenceFull, differencePartial, scanlineColor } from './core/compute';
import { State } from './core/State';
import { Shape } from './shapes/Shape';
import { ShapeColor } from './shapes/ShapeColor';
import { ShapeNameProps } from './shapes/ShapeNameProps';
import { Options } from './config/Options';
import process from 'process';

/**
 * Render a raster image to a collection of shapes
 */
export class Shapesnap {

  private readonly width: number;
  private readonly height: number;
  private readonly background: RGBA;
  private readonly current: NdArray;
  private readonly buffer: NdArray;
  private readonly results: ShapeColor[];
  private score: number;

  constructor(public target: NdArray, public options: Options) {
    // Ensure that target has transparency
    if (!(target.shape[2] === 4)) {
      this.target = clone(target);
    }

    // Calculate background color if it wasn't supplied
    this.background = options.backgroundColor || backgroundColor(target);
    this.width = target.shape[0];
    this.height = target.shape[1];
    this.current = create(this.width, this.height, this.background);
    this.buffer = create(this.width, this.height, this.background);
    this.score = differenceFull(target, this.current);
    this.results = [];
  }

  get image(): NdArray {
    return this.current;
  }

  get shapes(): ShapeColor[] {
    return this.results;
  }

  get svg() {
    const shapes: ShapeNameProps[] = this.results.map(({ shape, color }) => {
      const {r, g, b, a} = color;
      const svg: ShapeNameProps = shape.svg;

      if (svg.name === 'line' || svg.name === 'path') {
        svg.props.fill = 'none';
        svg.props.stroke = `rgb(${r}, ${g}, ${b})`;
        svg.props['stroke-opacity'] = a / 255;
      } else {
        svg.props.stroke = 'none';
        svg.props.fill = `rgb(${r}, ${g}, ${b})`;
        svg.props['fill-opacity'] = a / 255;
      }
      return svg;
    });

    // Background color
    shapes.unshift({
      name: 'rect',
      props: {
        x: 0,
        y: 0,
        width: this.width,
        height: this.height,
        fill: `rgb(${this.background.r}, ${this.background.g}, ${this.background.b})`
      }
    });
    return toSvg(shapes, this.width, this.height);
  }

  get difference(): number {
    return this.score;
  }

  step(): void {
    const state: State = bestHillClimbState(
      this.options,
      this.target,
      this.current,
      this.buffer,
      this.score
    )!;
    this.addShape(state.shape, state.alpha);
  }

  autoStep(callback: (progress: string) => void = (progress: string) => process.stdout.write(`\r\x1b[KProgress: ${progress}%`)): void {
    const tenPercent: number = this.options.steps/10;
    for (let i = 0; i < this.options.steps; i++) {
      if (i % Math.round(tenPercent) == 0) {
        callback(`${(i/this.options.steps)*100}`);
      }
      this.step(); // number of rendered shapes
    }
    callback(`100`);
  }

  addShape(shape: Shape, alpha: number): void {
    const before: NdArray = clone(this.current);
    const scanlines: number[][] = shape.rasterize();
    const color = scanlineColor(this.target, this.current, scanlines, alpha);

    draw(this.current, color, scanlines);

    this.score = differencePartial(this.target, before, this.current, this.score, scanlines);
    this.results.push({ shape, color });
  }
}