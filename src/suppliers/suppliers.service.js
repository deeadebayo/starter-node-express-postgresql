const knex = require('../db/connection')

const create = supplier =>
	knex('suppliers')
		.insert(supplier)
		.returning('*')
		.then(createdRecords => createdRecords[0])

const read = supplier_id =>
	knex('suppliers').select('*').where({ supplier_id }).first()

const update = updatedSupplier =>
	knex('suppliers')
		.select('*')
		.where({ supplier_id: updatedSupplier.supplier_id })
		.update(updatedSupplier, '*')
		.then(updatedRecords => updatedRecords[0])

const destroy = supplier_id => knex('suppliers').where({ supplier_id }).del()

module.exports = { create, read, update, delete: destroy }
