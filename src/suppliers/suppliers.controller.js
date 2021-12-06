const suppliersService = require('./suppliers.service')
const hasProperties = require('../errors/hasProperties')
const hasRequiredProperties = hasProperties('supplier_name', 'supplier_email')
const asyncErrorBoundary = require('../errors/asyncErrorBoundary')

const VALID_PROPERTIES = [
	'supplier_name',
	'supplier_address_line_1',
	'supplier_address_line_2',
	'supplier_city',
	'supplier_state',
	'supplier_zip',
	'supplier_phone',
	'supplier_email',
	'supplier_notes',
	'supplier_type_of_goods',
]

const hasOnlyValidProperties = (req, res, next) => {
	const { data = {} } = req.body

	const invalidFields = Object.keys(data).filter(
		field => !VALID_PROPERTIES.includes(field)
	)

	if (invalidFields.length) {
		return next({
			status: 400,
			message: `Invalid field(s): ${invalidFields.join(', ')}`,
		})
	}
	next()
}

const supplierExists = async (req, res, next) => {
	const data = await suppliersService.read(req.params.supplierId)
	if (supplier) {
		res.locals.supplier = supplier
		return next()
	}
	next({ status: 404, message: `Supplier cannot be found.` })
}

const create = async (req, res, next) => {
	const data = await supplierService.create(req.body.data)
	res.status(201).json({ data })
}

const update = async (req, res, next) => {
	const updatedSupplier = {
		...req.body.data,
		supplier_id: res.locals.supplier.supplier_id,
	}
	const data = await suppliersService.update(updatedSupplier)
	res.json({ data })
}

const destroy = async (req, res, next) => {
	const data = await suppliersService.delete(res.locals.supplier.supplier_id)
	res.sendStatus(204)
}

module.exports = {
	create: [
		hasOnlyValidProperties,
		hasRequiredProperties,
		asyncErrorBoundary(create),
	],
	update: [
		asyncErrorBoundary(supplierExists),
		hasRequiredProperties,
		hasRequiredProperties,
		asyncErrorBoundary(update),
	],
	delete: [asyncErrorBoundary(supplierExists), asyncErrorBoundary(destroy)],
}
