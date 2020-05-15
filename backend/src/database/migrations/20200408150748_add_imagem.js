
exports.up = function(knex) {
    return knex.schema.createTable('imagens',function(table){
         table.increments();
         
         table.string('name');
         table.string('url');
         table.string('pet_id')
         table.foreign('pet_id').references('id').inTable('pets');
 
     })
   
 };
 
 exports.down = function(knex) {
     return table.schema.dropTable('imagens');
   
 };
