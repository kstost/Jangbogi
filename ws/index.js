const express = require('express');
const app = express();
const port = 3000;
app.use('/', express.static('../src'));
if (false) {
  app.get('/', (req, res, next) => {
  });
}
app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
