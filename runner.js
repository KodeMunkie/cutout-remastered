import { Cutout } from './lib/cutout.js';
import ndarray from 'ndarray';
import Jimp from 'jimp';
import * as fs from 'node:fs';

console.info(`Cutout Remastered processing ${process.argv[2]}`);

let image= await Jimp.read(process.argv[2]);
image = image.resize(500, Jimp.AUTO);
const asNd = ndarray(image.bitmap.data, [image.getWidth(),image.getHeight(),4], [4,image.getWidth()*4,1],0);

const options = {
  amountOfShapes: 100, // shape mutation variants (useful for quality)
  amountOfAttempts: 20, // attempts to fit (less useful for quality if high amountOfShapes)
  alpha: 128, // useful to smooth error
  steps: 2000
};

console.info(`Using settings: ${JSON.stringify(options)}`);

const cutout = new Cutout(asNd, options);
for (var i = 0; i < options.steps; i++) {
  cutout.step(); // number of rendered shapes
}
fs.writeFileSync(process.argv[3], cutout.svg);

console.info(`Written svg to ${process.argv[3]}`);