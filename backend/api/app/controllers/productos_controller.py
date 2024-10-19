from flask import jsonify

from backend.api.app.models.productos_model import Productos, Tipo


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

    def get_productos_panaderia(self):
        try:
            productos = Productos.query.filter_by(tipo=Tipo.PANADERIA).all()

            if productos:
                return jsonify([producto.to_dict() for producto in productos]), 200
            else:
                return jsonify({'message': 'No hay productos regitrados.'}), 200

        except Exception as e:
            return jsonify({'error': 'Ocurrió un error al obtener los productos.', 'message': str(e)}), 500

    def get_productos_despenda(self):
        try:
            productos = Productos.query.filter_by(tipo=Tipo.DESPENSA).all()

            if productos:
                return jsonify([producto.to_dict() for producto in productos]), 200
            else:
                return jsonify({'message': 'No hay productos regitrados.'}), 200

        except Exception as e:
            return jsonify({'error': 'Ocurrió un error al obtener los productos.', 'message': str(e)}), 500
