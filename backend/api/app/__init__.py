from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

from backend.api.config import Config

db = SQLAlchemy()


def create_app():
    app = Flask(__name__,
                template_folder='../../../frontend/pages',
                static_folder='../../../frontend/static')

    CORS(app)
    Config.select_config(app)
    db.init_app(app)

    # Import and register the route blueprint
    from .routes.main_route import main_bp
    app.register_blueprint(main_bp, url_prefix='/')

    from .routes.productos_route import productos_bp
    app.register_blueprint(productos_bp, url_prefix='/')

    return app
