export const toSvg = (shapes, width, height) => {
  const header =
    `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg">\n`;
  const footer = `</svg>\n`;
  let body = header;
  for (let shape of shapes) {
    body += `<${shape[0]} `
    for (let [name, value] of Object.entries(shape[1])) {
      body += `${name}="${value}" `;
    }
    body += `/>\n`;
  }
  body += footer;
  return body;
}