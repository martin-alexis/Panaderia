from app import db
from sqlalchemy import Column, Integer, String, Text, Numeric, Enum

class Productos(db.Model):
    __tablename__ = 'productos'

    id_productos = Column(Integer, primary_key=True, autoincrement=True)
    nombre = Column(String(45), nullable=False, unique=True)
    descripcion = Column(Text)
    precio = Column(Numeric(10, 0), nullable=True)
    imagen = Column(String(255), nullable=False)
    disponibilidad = Column(Enum('Disponible', 'Agotado'), nullable=False)
    tipo = Column(Enum('Panaderia', 'Despensa'), nullable=False)

    def __init__(self, nombre, descripcion, precio, imagen, disponibilidad, tipo):
        self.nombre = nombre
        self.descripcion = descripcion
        self.precio = precio
        self.imagen = imagen
        self.disponibilidad = disponibilidad
        self.tipo = tipo