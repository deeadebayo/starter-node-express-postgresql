const knex = require('../db/connection')

const list = () => knex('categories').select('*')

module.exports = {
	list,
}
