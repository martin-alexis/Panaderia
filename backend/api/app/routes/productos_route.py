from flask import jsonify, Blueprint, request

from backend.api.app.controllers.productos_controller import ProductosController

productos_bp = Blueprint('productos', __name__)

@productos_bp.route('/productos', methods=['GET'])
def get_productos():

    controller = ProductosController()
    return controller.get_productos()

@productos_bp.route('/productos_panaderia', methods=['GET'])
def get_productos_panaderia():

    controller = ProductosController()
    return controller.get_productos_panaderia()

@productos_bp.route('/productos_despensa', methods=['GET'])
def get_productos_despensa():

    controller = ProductosController()
    return controller.get_productos_despenda()