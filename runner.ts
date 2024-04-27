import ndarray, { NdArray } from 'ndarray';
import Jimp from 'jimp';
import * as fs from 'node:fs';
import { Options } from './lib/config/Options';
import { Cutout } from './lib/core/Cutout';
import { DEFAULTS } from './lib/config/defaults';
import process from 'process';

export class Runner {
  async run(): Promise<void> {
    // Hide node deprecation warning output
    process.removeAllListeners('warning');

    const options: Options = DEFAULTS;
    console.info(`✂️🎨 Cutout Remastered\n`);
    console.info(`Using settings:\n${JSON.stringify(options)}\n`);
    console.info(`Processing '${process.argv[2]}' and writing to '${process.argv[3]}'\n`);
    let image: Jimp = await Jimp.read(process.argv[2]);
    image = image.resize(500, Jimp.AUTO);
    const ndArray: NdArray = ndarray(image.bitmap.data, [image.getWidth(), image.getHeight(), 4], [4, image.getWidth() * 4, 1], 0);

    const cutout = new Cutout(ndArray, options);
    for (let i = 0; i < options.steps; i++) {
      cutout.step(); // number of rendered shapes
    }
    fs.writeFileSync(process.argv[3], cutout.svg);

    console.info(`SVG written to '${process.argv[3]}'`);
  }
}
new Runner().run().then(r => {});