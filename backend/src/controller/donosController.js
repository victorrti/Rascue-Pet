const express = require('express')
const connection = require('../database/connection')
const crypto = require('crypto')

module.exports ={
    async create(req,res){
        const id = crypto.randomBytes(4).toString('HEX');
        const {name,email,whatsapp,} = req.body

        await connection('donos').insert({
            id,
            name,
            email,
            whatsapp,
        })

        return res.json({id});

    
    },

    async index(req,res){

        const donos = await connection('donos').select('*')

        res.json(donos);
    },
    async updatepet(req,res){
        const {name,value,description} = req.body
        const dono_id = req.headers.authorization


        await connection('pets').where('id','=',dono_id)
        
        .update({
            name:name,
            value:value,
            description:description,
        })
        
    }
}