const ProductoService = require('../services/producto.service');

class ProductoController {

    async getAllProductos(req, res) {
        try {
            const productos = await ProductoService.getAllProductos();
            res.status(200).json(productos);

        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async getProductoById(req, res) {
        try {
            const productoId = req.params.id;

            if (!productoId || productoId == '' || productoId == null || productoId == undefined) {
                throw new Error('El id no puede ser nulo');
            }

            const producto = await ProductoService.getProductoById(productoId);
            res.status(200).json(producto);
        } catch (e) {
            res.status(400).json({ message: e.message });
        }
    }

    async getProductoByNumSerie(req, res) {
        try {
            
            const numSerie = req.params.numSerie;

            if (!numSerie || numSerie == '' || numSerie == null || numSerie == undefined) {
                throw new Error('El número de serie no puede ser nulo');
            }

            const producto = await ProductoService.getProductoByNumSerie(numSerie);
            res.status(200).json(producto);
        } catch (e) {
            res.status(400).json({ message: e.message });
        }
    }

    async createProducto(req, res) {
        try {

            const producto = await ProductoService.createProducto(req.body);
            res.status(200).json(producto);

        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}

module.exports = new ProductoController();