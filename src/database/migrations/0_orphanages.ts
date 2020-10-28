import Knex from 'knex';

export function up(knex: Knex) {
    return knex.schema.createTable('orphanages', table => {
        
    });
}

export function down(knex: Knex) {
    return knex.schema.dropTable('orphanages');
}