exports.up = function (knex) {
    return knex.schema.createTable('transactions', table => {
        table.increments('id')
        table.string('recieverNumber')
        table.string('senderName')
        table.string('recieverName')
        table.string('senderNumber')
        table.uuid('transactionId').unique()
        table.integer('amount')
        table.boolean('isSuccessful')
        table.timestamp('transactionTime').defaultTo(knex.fn.now())
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable('transactions')
};
