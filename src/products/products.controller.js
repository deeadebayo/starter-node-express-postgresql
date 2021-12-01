const productsService = require('./products.service')

const productExists = (req, res, next) =>
	productsService
		.read(req.params.productId)
		.then(product => {
			if (product) {
				res.locals.product = product
				return next()
			}
			next({ status: 404, message: `Product cannot be found.` })
		})
		.catch(next)

const read = (req, res) => {
	const { product: data } = res.locals
	res.json({ data })
}

const list = (req, res, next) =>
	productsService
		.list()
		.then(data => res.json({ data }))
		.catch(next)

module.exports = {
	read: [productExists, read],
	list,
}
