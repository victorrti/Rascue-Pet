const express = require('express');
const crypto = require('crypto');
const connection = require('../database/connection');
const path = require('path');
const fs = require('fs')

module.exports = {
    async create(req,res){
        const id = crypto.randomBytes(4).toString('HEX');

        const {name,value,description} = req.body
        const dono_id = req.headers.authorization;

       await  connection('pets').insert({
            id,
            value,
            description,
            name,
            dono_id,
            
         
         });
         

         return res.json({id});
         
    },
    async index(req,res){
        
        const pets = await connection('pets')
        .join('donos','donos.id','=','pets.dono_id')
        .select(['pets.*',
        'donos.whatsapp'

        ]);
    
        return res.json(pets);
    
     },
     async updatepet(req,res){
         const {name,value,description} = req.body
         const pet_id = req.headers.authorization


         await connection('pets').where('id','=',pet_id)
         
         .update({
             name:name,
             value:value,
             description:description,
         })
         
     },
     async delete(req,res){
        const pet_id = req.params
        const  dono_id = req.headers.authorization

        const pet = await connection('pets')
        .where('id',pet_id.id)
        .select('dono_id')
        .first();
       
        if(pet.dono_id !== dono_id){
            return res.status(401).json({error:"operação nao permitida "})
        }else{

            const imagens_pet =  await connection('imagens').where('pet_id',pet_id.id);

            imagens_pet.map(async(imagem)=> {

            const filePath = path.resolve(__dirname,'../../public','imagens',`${imagem.name}`)
            
            
            fs.unlinkSync(filePath,(err)=>{
            if (err) throw err;
            
          console.log('was deleted');
        });

           })
          const petdel =  await connection('imagens').where('pet_id',pet_id.id)
          console.log(petdel)
          
           await connection('pets').where('id',pet_id.id).del();

            return res.status(204).send();
        }

    }
}