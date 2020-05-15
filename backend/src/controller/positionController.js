const connection = require('../database/connection');

module.exports = {
    async create(req,res){

        const pet_id = req.headers.authorization;
        const { description,cidade,rua,numero,bairro,uf} = req.body;
        

        await connection('positions').insert({
            description,
            cidade,
            rua,
            numero,
            bairro,
            uf,
            pet_id

        });

        res.json({message:"posiçao cadastrada"});


    },

    async index(req,res){
        
        const dono_id = req.headers.donoauthorization;
        const pet_id = req.headers.authorization;
        const message = ([{message:"erro ao exibir as posiçoes,tente novamente"}])
        const donopet = await connection('pets').where('id',pet_id).select('dono_id')
       
        
        if(donopet[0].dono_id == dono_id){
         const pet_id = req.headers.authorization;
         const positions = await connection('positions')
        .where('pet_id',pet_id)
        .select('*')
        console.log('if')
        return res.json(positions);
        }else{
            return res.json(message);
            console.log('else')

        }
        
        

      

    }


}