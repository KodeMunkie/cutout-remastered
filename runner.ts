import ndarray, { NdArray } from 'ndarray';
import Jimp from 'jimp';
import * as fs from 'node:fs';
import { Options } from './lib/config/Options';
import { Cutout } from './lib/core/cutout';
import { DEFAULTS } from './lib/config/defaults';


export class Runner {
  async run(): Promise<void> {
    console.info(`Cutout Remastered processing ${process.argv[2]}`);
    let image: Jimp = await Jimp.read(process.argv[2]);
    image = image.resize(500, Jimp.AUTO);
    const ndArray: NdArray = ndarray(image.bitmap.data, [image.getWidth(), image.getHeight(), 4], [4, image.getWidth() * 4, 1], 0);

    const options: Options = {
      ...DEFAULTS,
      steps: 1000
    };

    console.info(`Using settings: ${JSON.stringify(options)}`);

    const cutout = new Cutout(ndArray, options);
    for (let i = 0; i < options.steps; i++) {
      cutout.step(); // number of rendered shapes
    }
    fs.writeFileSync(process.argv[3], cutout.svg);

    console.info(`Written svg to ${process.argv[3]}`);
  }
}
new Runner().run().then(r => console.log("Done"));