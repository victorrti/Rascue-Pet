const express = require('express');

const connection = require('../database/connection');

module.exports = {
    

    async index(req,res){
        const dono_id = req.headers.authorization;
        const pets = await connection('pets')
        .where('dono_id',dono_id)
        .select('*');
    
        return res.json(pets);
    
     },

     async delete(req,res){
         const {pet_id} = req.params
         const  dono_id = req.headers.authorization

         const pet = connection('pets')
         .where('id',pet_id)
         .select('dono_id')
         .first();

         if(pet.dono_id !== dono_id){
             return res.status(401).json({error:"operação nao permitida "})
         }else{
             await connection('pets').where('id',pet_id).delete();

             return res.status(204).send();
         }

     }
}