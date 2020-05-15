
exports.up = function(knex) {
    return knex.schema.createTable('positions',function(table){
        table.string('description')
        table.string('cidade');
        table.string('rua');
        table.string('numero')
        table.string('bairro');
        table.string('uf',2)
        table.string('pet_id')
        table.foreign('pet_id').references('id').inTable('pets')
        
    });
 
 }

exports.down = function(knex) {

    return knex.schema.dropTable('positions')

  
};
