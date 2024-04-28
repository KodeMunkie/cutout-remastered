/**
 * Stores the current shape iteration
 */
import { energy } from './compute';
import { Shape } from '../shapes/Shape';
import { NdArray } from 'ndarray';

export class State {
  constructor(public shape: Shape, public alpha: number, public target: NdArray, public current: NdArray, public buffer: NdArray, public score?: number) {
    this.shape = shape;
    this.alpha = alpha;
    this.target = target;
    this.current = current;
    this.buffer = buffer;
  }

  energy(lastScore: number): number {
    if (!this.score) {
      this.score = energy(
        this.shape,
        this.alpha,
        this.target,
        this.current,
        this.buffer,
        lastScore
      );
    }

    return this.score!;
  }

  clone(): State {
    return new State(this.shape.clone(), this.alpha, this.target, this.current, this.buffer);
  }

  mutate(): State {
    const oldState: State = this.clone();
    this.shape.mutate();
    return oldState;
  }
}
