from flask import jsonify

from backend.api.app.models.productos_model import Productos, Tipo, Disponibilidad


class ProductosController:

    def __init__(self):
        pass

    def get_productos(self):
        try:
            productos = Productos.query.all()

            if productos:
                return jsonify([producto.to_dict() for producto in productos]), 200
            else:
                return jsonify({'message': 'No hay productos regitrados.'}), 200

        except Exception as e:
            return jsonify({'error': 'Ocurrió un error al obtener los productos.', 'message': str(e)}), 500

    def get_productos_categoria(self, busqueda, precio_min, precio_max, agotado, disponible, categoria):
        try:
            # Llama a `filter_productos` independientemente de la categoría específica
            consulta = Productos.query.filter(Productos.tipo == categoria)

            if busqueda:
                consulta = consulta.filter(Productos.nombre.like(f"{busqueda}%"))

            if precio_min is not None and precio_max is not None:
                consulta = consulta.filter(Productos.precio.between(precio_min, precio_max))

            if agotado:
                consulta = consulta.filter(Productos.disponibilidad == Disponibilidad.AGOTADO)
            if disponible:
                consulta = consulta.filter(Productos.disponibilidad == Disponibilidad.DISPONIBLE)

            productos = consulta.all()

            if productos:
                return jsonify([producto.to_dict() for producto in productos]), 200
            else:
                return jsonify({'message': 'No hay productos registrados.'}), 200

        except Exception as e:
            return jsonify({'error': 'Ocurrió un error al obtener los productos.', 'message': str(e)}), 500

