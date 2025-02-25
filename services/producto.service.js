const ProductoRepository = require('../repositories/producto.repository');
const Validaciones = require('../utils/validation');

class ProductoService {

    async getAllProductos() {
        return await ProductoRepository.getAllProductos();
    }

    async getProductoById(id) {
        const producto = await ProductoRepository.getProductoById(id);

        if (!producto) {
            throw new Error('Producto no encontrado');
        }

        return producto;
    }

    async getProductoByNumSerie(numSerie) {
        const producto = await ProductoRepository.getProductoByNumSerie(numSerie);

        if (!producto) {
            throw new Error('Producto no encontrado');
        }

        return producto;
    }

    async createProducto(producto) {
        if (!producto.nombre || !producto.precio || !producto.fechaAdquisicion || !producto.numSerie || !producto.numInventario) {
            throw new Error('Todos los campos son requeridos.');
        }

        const productoByNumSerie = await ProductoRepository.getProductoByNumSerie(producto.numSerie);

        if (productoByNumSerie) {
            throw new Error('El número de serie ya existe');
        }

        if (producto.precio <= 0) {
            throw new Error('El precio no puede ser menor a cero');
        }

        if (!Validaciones.esFechaValida(producto.fechaAdquisicion)) {
            throw new Error('La fecha de adquisición no tiene el formato válido');
        }

        // 2025-02-24
        const acquisitionYear = producto.fechaAdquisicion.split('-')[0];
        // 2025 [0]
        // 02 [1]
        // 24 [2]

        let countYear = await ProductoRepository.countProductosByYear(acquisitionYear);
        
        countYear++;

        producto.numInventario = `${acquisitionYear}-${countYear.toString().padStart(3, '0')}`;

        return await ProductoRepository.createProducto(producto);
    }
}

module.exports = new ProductoService();