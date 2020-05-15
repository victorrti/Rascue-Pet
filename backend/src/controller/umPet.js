const express = require('express');

const connection = require('../database/connection');

module.exports = {
    

    async index(req,res){
        const pet_id = req.headers.authorization;
        const pet = await connection('pets')
        .where('id',pet_id)
        .select('*');
    
        return res.json(pet);
    
     }
}