const express = require('express')
const routes = require('./routes');
const cors = require('cors');
const path = require('path')
const {errors} = require('celebrate')

const app = express();

app.use(cors());
app.use(express.json());
app.use('/imagem',express.static(path.resolve(__dirname,'..','public','imagens')))

app.use(routes);
app.use(errors());



app.listen(3333);