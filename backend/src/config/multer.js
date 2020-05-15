const multer = require('multer');
const path = require('path');
const crypto = require('crypto');

module.exports = {
    dest: path.resolve(__dirname,'..','..','public','imagens'),
    storage: multer.diskStorage({
        destination:(req,file,cb)=>{
            cb(null,path.resolve(__dirname,'..','..','public','imagens'))
        },
        filename:(req,file,cb)=>{
            crypto.randomBytes(16,(err,hash)=>{
                if(err) cb(err);

                const filename = `${hash.toString('HEX')}-${file.originalname}`
                cb(null,filename)
            })
        }

    }),
    limits:{
        fileSize: 2*1024 *1024,
    },
    fileFilter:(req, file,cb) => {
        const allowwedMimes =[
            'image/jpeg',
            'image/pjpeg',
            'image/png',

        ];
        if(allowwedMimes.includes(file.mimetype)){
            cb(null,true)
        }else{
            cb(new Error('invalid file type'))
        }
    },

    

}