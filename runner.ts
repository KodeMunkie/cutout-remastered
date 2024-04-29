import ndarray, { NdArray } from 'ndarray';
import Jimp from 'jimp';
import * as fs from 'node:fs';
import { Options } from './lib/config/Options';
import { Shapesnap } from './lib/Shapesnap';
import { DEFAULTS } from './lib/config/defaults';
import { Stopwatch } from "ts-stopwatch";
import process from 'process';

export class Runner {
  async run(): Promise<void> {
    // Hide node deprecation warning output
    process.removeAllListeners('warning');

    const options: Options = {
      ...DEFAULTS,
    }
    console.info(`🃏 Shapesnape 🃏\n`);
    console.info(`Using settings:\n${JSON.stringify(options)}\n`);
    console.info(`Processing '${process.argv[2]}' and writing to '${process.argv[3]}'`);
    let image: Jimp = await Jimp.read(process.argv[2]);
    image = image.resize(500, Jimp.AUTO);
    const ndArray: NdArray = ndarray(image.bitmap.data, [image.getWidth(), image.getHeight(), 4], [4, image.getWidth() * 4, 1], 0);

    const stopwatch = new Stopwatch();
    stopwatch.start();
    const shapesnap = new Shapesnap(ndArray, options);
    const tenPercent: number = options.steps/10;
    for (let i = 0; i < options.steps; i++) {
      if (i % Math.round(tenPercent) == 0) {
        process.stdout.write(`\r\x1b[KProgress: ${(i/options.steps)*100}%`);
      }
      shapesnap.step(); // number of rendered shapes
    }
    process.stdout.write(`\r\x1b[KProgress: 100%\n\n`);
    fs.writeFileSync(process.argv[3], shapesnap.svg);
    const timeTaken: number = stopwatch.stop();
    console.info(`SVG written to '${process.argv[3]}'`);
    console.info(`Finished in ${timeTaken/1000} seconds`);
  }
}
new Runner().run().then(r => {});