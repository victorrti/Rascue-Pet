const multer  = require('multer')
const multerConfig = require('../config/multer')
const connection = require('../database/connection')
const path = require('path');
const fs = require('fs');

module.exports = {
 async create(req,res){
     await  connection('imagens').insert({
        name: req.file.filename,
        url:`http://localhost:3333/imagem/${req.file.filename}`,
        pet_id: req.headers.authorization,

        
     });

    

    },
    async index(req,res){
        const pet_id = req.headers.authorization
        const imagens = await connection('imagens').where('pet_id',pet_id).select('*')

        return res.json(imagens);

},
async delete(req,res){
    const id = req.headers.id;
    await connection('imagens').where('id',id).del();

    const name = req.headers.name;
   
    const filePath = path.resolve(__dirname,'../../public','imagens',`${name}`)
    fs.unlinkSync(filePath,(err)=>{
    if (err) throw err;
  console.log('was deleted');
});



}  }
 