const connection = require('../database/connection');
module.exports={
    async create(req,res){
        const {id}=req.body;

        const dono = await connection('donos')
        .where('id',id)
        
        .select('name')
        .first();

    if(!dono){
           return res.status(400).json({error:'no found with this is ID'})
        }
        return res.json(dono);

    }
}