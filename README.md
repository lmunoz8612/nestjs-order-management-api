# API de Gestión de Compras

Esta es una API REST construida con **Nest JS Framework** y **MySQL** para administrar clientes, productos y ordenes de compra.

---

## Instrucciones de instalación

### Requisitos previos

- Nestjs v10+
- MySQL Workbench client
- docker image MySQL

### 1. Clonar el repositorio

```bash
git clone https://github.com/lmunoz8612/nestjs-order-management-api.git
cd nestjs-order-management-api
```

### 2. Endpoints principales:
Documentación completa:
- http://[host]:8000/docs/

### 3. Desiciones técnicas
Base de datos: Se utilizó MySQL por su flexibilidad de esquema y velocidad en operación.
Framework: NestJS REST Framework facilita la creación de APIs robustas con validación y documentación automática.
Swagger: Para exponer documentación dinámica de los endpoints.
Estructura modular: Se organizaron las apps por contexto (clients, products, orders), facilitando el mantenimiento.
