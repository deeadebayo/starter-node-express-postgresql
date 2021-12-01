const knex = require('../db/connection')

const list = () => knex('products').select('*')

const read = product_id =>
	knex('products').select('*').where({ product_id }).first()

module.exports = {
	list,
	read,
}
