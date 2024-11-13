import enum

from backend.api.app import db
from sqlalchemy import Column, Integer, String, Text, Numeric, Enum


class Tipo(enum.Enum):
    PANADERIA = "PANADERIA"
    DESPENSA = "DESPENSA"

class Disponibilidad(enum.Enum):
    DISPONIBLE = "DISPONIBLE"
    AGOTADO = "AGOTADO"

class Productos(db.Model):
    __tablename__ = 'productos'

    id_productos = Column(Integer, primary_key=True, autoincrement=True)
    nombre = Column(String(45), nullable=False, unique=True)
    unidad = Column(String(45), nullable=False)
    precio = Column(Numeric(10, 0), nullable=True)
    imagen = Column(String(255), nullable=False)
    disponibilidad = Column(Enum(Disponibilidad), nullable=False)
    tipo = Column(Enum(Tipo), nullable=False)

    def __init__(self, nombre, unidad, precio, imagen, disponibilidad, tipo):
        self.nombre = nombre
        self.unidad = unidad
        self.precio = precio
        self.imagen = imagen
        self.disponibilidad = disponibilidad
        self.tipo = tipo

    def to_dict(self):
        return {
            'id_productos': self.id_productos,
            'nombre': self.nombre,
            'unidad': self.unidad,
            'precio': self.precio,
            'imagen': self.imagen,
            'disponibilidad': self.disponibilidad.value,
            'tipo': self.tipo.value
        }
