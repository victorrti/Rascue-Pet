
exports.up = function(knex) {
    return  knex.schema.createTable('donos',function (table){
        table.string('id').primary();
        table.string('name');
        table.string('email');
        table.string('whatsapp');
        
        })
  
};

exports.down = function(knex) {

    return table.scherma.dropTable('donos');
  
};
