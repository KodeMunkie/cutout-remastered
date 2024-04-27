import { ShapeNameProps } from '../shapes/ShapeNameProps';

export const toSvg = (shapes: ShapeNameProps[], width: number, height: number): string => {
  const header: string =
    `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg">\n`;
  const footer: string = `</svg>\n`;
  let body: string = header;
  for (let shape of shapes) {
    body += `<${shape.name} `
    for (let [name, value] of Object.entries(shape.props)) {
      body += `${name}="${value}" `;
    }
    body += `/>\n`;
  }
  body += footer;
  return body;
}