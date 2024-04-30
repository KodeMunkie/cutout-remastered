import ndarray, { NdArray } from 'ndarray';
//@ts-ignore
import Jimp from 'jimp/es';
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
    console.info(`🃏 Shapesnap 🃏\n`);
    console.info(`Using settings:\n${JSON.stringify(options)}\n`);
    console.info(`Processing '${process.argv[2]}' and writing to '${process.argv[3]}'`);
    let image: Jimp = await Jimp.read(process.argv[2]);
    image = image.resize(500, Jimp.AUTO); // TODO: will fix in a later revision, change this or use the API in the meantime
    const ndArray: NdArray = ndarray(image.bitmap.data, [image.getWidth(), image.getHeight(), 4], [4, image.getWidth() * 4, 1], 0);
    const stopwatch = new Stopwatch();
    stopwatch.start();
    const shapesnap = new Shapesnap(ndArray, options);
    shapesnap.autoStep();
    fs.writeFileSync(process.argv[3], shapesnap.svg);
    const timeTaken: number = stopwatch.stop();
    console.info(`SVG written to '${process.argv[3]}'`);
    console.info(`Finished in ${timeTaken/1000} seconds`);
  }
}
new Runner().run().then(() => {});