const { writeFile } = require("fs");
const { promisify } = require("util");
const fetch = require("node-fetch");
const writeFilePromise = promisify(writeFile);

for (let i = 0; i < 50; i++) {
  fetch(`https://mmoquest.com/img/skin/0/2/${i}.png`)
    .then((x) => x.arrayBuffer())
    .then((x) => writeFilePromise(`./player2/${i}.png`, Buffer.from(x)));
}
