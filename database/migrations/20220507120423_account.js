exports.up = function (knex) {
    return knex.schema.createTable('wallet', table => {
        table.increments('id')
        table.string('userEmail')
        table.string('userNumber')
        table.float('accountBalance')
        table.uuid('accountId')
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable('user_accounts')
};
