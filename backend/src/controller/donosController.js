const express = require('express')
const connection = require('../database/connection')
const crypto = require('crypto')
const nodemailer = require('nodemailer')
const SMTP_CONFIG = require('../config/smtp');
const smtpTransport = require('nodemailer-smtp-transport');

const transporter =  nodemailer.createTransport(smtpTransport({
     service:'gmail',
    host:SMTP_CONFIG.host,
    port:SMTP_CONFIG.port,
    secure:false,
    auth:{
        user:SMTP_CONFIG.user,
        pass:SMTP_CONFIG.pass,
     },
     tls:{
        rejectUnauthorized:false, 
     },
     
    
}));


module.exports ={
    
    async create(req,res){
        const id = crypto.randomBytes(4).toString('HEX');
        const {name,email,whatsapp,} = req.body

        await connection('donos').insert({
            id,
            name,
            email,
            whatsapp,
        });



       const mailOptions =  ({
            text:`Ola ${name}!, agradecemos por confiar em nossa plataforma para encontrar seu bixinho de estimação, para ter acesso a plataforma anote seu ID  de acesso, ID:${id},Boa Sorte`,
            subject:'conta criado com sucesso',
            from: 'Rascue pets <rascuepets@gmail.com>',
            
            to:`${email}`,
        })
         transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
              
            }
          }); 

          return res.json({message:`anote seu id: ${id}, o id de acesso esta disponivel no email  cadastrado`})

        

    
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