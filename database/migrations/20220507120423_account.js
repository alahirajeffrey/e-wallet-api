exports.up = function (knex) {
    return knex.schema.createTable('user_accounts', table => {
        table.increments('id')
        table.string('user_id')
        table.float('account_balance')
        table.uuid('account_id')
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable('user_accounts')
};
