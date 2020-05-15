const express = require('express');

const connection = require('../database/connection')

module.exports = {
    async index(req,res){
        const dono_id = req.headers.authorization

        const pets = await connection('pets')
        .where('dono_id',dono_id)
        .select('*');


        return res.json(pets);
    }

}