const path = require('path');

module.exports = (page, name) =>
  page.screenshot({ path: path.join(__dirname, '../screenshots/', `${name}.jpg`), fullPage: true });