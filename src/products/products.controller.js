const productsService = require('./products.service')
const asyncErrorBoundary = require('../errors/asyncErrorBoundary')

const productExists = async (req, res, next) => {
	const product = await productsService.read(req.params.productId)
	if (product) {
		res.locals.product = product
		return next()
	}
	next({ status: 404, message: `Product cannot be found.` })
}

const read = (req, res) => {
	const { product: data } = res.locals
	res.json({ data })
}

const list = async (req, res, next) => {
	const data = await productsService.list()
	res.json({ data })
}

module.exports = {
	read: [asyncErrorBoundary(productExists), read],
	list: asyncErrorBoundary(list),
}
