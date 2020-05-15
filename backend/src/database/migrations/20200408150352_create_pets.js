
exports.up = function(knex) {
    return  knex.schema.createTable('pets',function (table){
        table.string('id').primary();
        table.string('name');
        table.string('description');
        table.string('value');
        table.string('dono_id');
        table.foreign('dono_id').references('id').inTable('donos');
        
        })
  
};

exports.down = function(knex) {

    return table.schema.dropTable('pets');
  
};
