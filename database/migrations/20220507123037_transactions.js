exports.up = function (knex) {
    return knex.schema.createTable('transactions', table => {
        table.increments('id')
        table.string('reciever_id')
        table.string('sender_name')
        table.string('reciever_name')
        table.uuid('sender_id')
        table.uuid('transaction_id')
        table.integer('amount')
        table.boolean('is_successful')
        table.timestamp('transaction_time').defaultTo(knex.fn.now())
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable('transactions')
};
