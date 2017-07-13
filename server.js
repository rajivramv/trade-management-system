const app = require('express')();
const file = require('./routes/file');
const data = require('./routes/data');
const PORT = process.env.PORT || 8000
app.use(file);
app.use(data);

app.listen(PORT, function(){
  console.log(`Open http://localhost:${PORT} in your browser`);
});