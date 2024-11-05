from flask import jsonify, Blueprint, request

from backend.api.app.controllers.productos_controller import ProductosController

productos_bp = Blueprint('productos', __name__)

@productos_bp.route('/api/productos', methods=['GET'])
def get_productos():

    controller = ProductosController()
    return controller.get_productos()

@productos_bp.route('/api/productos/categoria', methods=['GET'])
def get_productos_categoria():

    busqueda = request.args.get('termino', '')

    precio_min = request.args.get('precio_min', type=float)
    precio_max = request.args.get('precio_max', type=float)
    disponible = request.args.get('disponible', type=lambda v: v.lower() == 'true')
    agotado = request.args.get('agotado', type=lambda v: v.lower() == 'true')
    categoria = request.args.get('categoria')

    controller = ProductosController()
    return controller.get_productos(busqueda, precio_min, precio_max, agotado, disponible, categoria)

@productos_bp.route('/api/productos_despensa', methods=['GET'])
def get_productos_despensa():

    controller = ProductosController()
    return controller.get_productos_despenda()