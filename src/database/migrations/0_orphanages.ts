import Knex from 'knex';

export function up(knex: Knex) {
    return knex.schema.createTable('orphanages', table => {
        table.string('name').notNullable();
        table.string('about').notNullable();
        table.string('instructions').notNullable();
        table.string('whatsapp').notNullable();
        table.json('location').notNullable();
        table.json('photosUrls').notNullable();
        table.json('open_hours').notNullable();
        table.boolean('open_on_weekends').notNullable();
    });
}

export function down(knex: Knex) {
    return knex.schema.dropTable('orphanages');
}