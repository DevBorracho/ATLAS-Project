# 🗂️ Tablas del Proyecto Atlas ERP

## 🔐 Autenticación y Autorización

### users (usuarios)

- `_id`
- `nombre`
- `email`
- `password`
- `rolId`
- `activo`
- `avatar`
- `fechaCreacion`

### roles (roles)

- `_id`
- `nombre`
- `nivelJerarquia`
- `descripcion`

### permissions (permisos)

- `_id`
- `nombre`
- `codigo`
- `descripcion`

### role_permissions (rol_permisos)

- `rolId`
- `permisoId`

---

## 👤 Usuarios y Perfiles

### user_profiles (perfiles de usuario)

- `_id`
- `userId`
- `telefono`
- `direccion`
- `pais`
- `ciudad`

### user_history (historial de usuario)

- `_id`
- `userId`
- `cambios`
- `fecha`

---

## 📦 Inventario

### products (productos)

- `_id`
- `nombre`
- `categoriaId`
- `precioCompra`
- `precioVenta`
- `unidad`
- `stock`
- `almacenId`
- `activo`

### categories (categorías)

- `_id`
- `nombre`
- `descripcion`

### warehouses (almacenes)

- `_id`
- `nombre`
- `ubicacion`
- `capacidad`
- `responsableId`

### stock_movements (movimientos de stock)

- `_id`
- `productoId`
- `tipo (entrada/salida)`
- `cantidad`
- `referenciaId (venta o compra)`
- `fecha`

---

## 🛒 Compras

### suppliers (proveedores)

- `_id`
- `nombre`
- `contacto`
- `telefono`
- `email`
- `direccion`

### purchase_orders (órdenes de compra)

- `_id`
- `proveedorId`
- `fechaOrden`
- `estado`
- `total`
- `observaciones`

### purchase_order_items (detalles de orden de compra)

- `_id`
- `ordenId`
- `productoId`
- `cantidad`
- `precioUnitario`
- `subtotal`

### supplier_payments (pagos a proveedores)

- `_id`
- `proveedorId`
- `monto`
- `fechaPago`
- `referencia`

---

## 💰 Ventas

### clients (clientes)

- `_id`
- `nombre`
- `telefono`
- `email`
- `direccion`

### sales (ventas)

- `_id`
- `clienteId`
- `fechaVenta`
- `total`
- `descuento`
- `impuestos`
- `estado`

### sale_items (detalles de venta)

- `_id`
- `ventaId`
- `productoId`
- `cantidad`
- `precioUnitario`
- `subtotal`

### invoices (facturas)

- `_id`
- `ventaId`
- `numeroFactura`
- `fechaEmision`
- `pdfUrl`

### client_payments (pagos de clientes)

- `_id`
- `clienteId`
- `monto`
- `fechaPago`
- `referencia`

---

## 💼 Finanzas

### accounts_receivable (cuentas por cobrar)

- `_id`
- `clienteId`
- `montoPendiente`
- `fechaLimite`
- `estado`
- `ventaId`

### accounts_payable (cuentas por pagar)

- `_id`
- `proveedorId`
- `montoPendiente`
- `fechaLimite`
- `estado`
- `compraId`

### transactions (transacciones financieras)

- `_id`
- `tipo (ingreso/gasto)`
- `monto`
- `fecha`
- `descripcion`
- `referenciaId (venta o compra)`

### balances (balances financieros)

- `_id`
- `mes`
- `año`
- `ingresosTotales`
- `gastosTotales`
- `utilidadNeta`

---

## 📊 Dashboard

_(No tiene tablas propias — solo lee datos de los demás módulos)_

---

# 🧩 Explicación de Cada Tabla

- **`users (usuarios)`**: guarda las credenciales y datos básicos de cada persona que usa el sistema.
- **`roles (roles)`**: define el nivel jerárquico y permisos base (admin, empleado, etc.).
- **`permissions (permisos)`**: lista las acciones específicas que se pueden otorgar a un rol.
- **`role_permissions (rol_permisos)`**: conecta cada rol con los permisos que tiene.

- **`user_profiles (perfiles de usuario)`**: información personal extendida de los usuarios.
- **`user_history (historial de usuario)`**: registra los cambios hechos a cada perfil.

- **`products (productos)`**: catálogo principal de artículos disponibles en inventario.
- **`categories (categorías)`**: organiza los productos por tipo o familia.
- **`warehouses (almacenes)`**: lugares físicos donde se almacenan los productos.
- **`stock_movements (movimientos de stock)`**: registra entradas y salidas del inventario.

- **`suppliers (proveedores)`**: almacena datos de los proveedores.
- **`purchase_orders (órdenes de compra)`**: gestiona las órdenes emitidas a proveedores.
- **`purchase_order_items (detalles de orden de compra)`**: desglosa los productos de cada orden.
- **`supplier_payments (pagos a proveedores)`**: lleva el registro de pagos realizados.

- **`clients (clientes)`**: información de los compradores.
- **`sales (ventas)`**: registra las transacciones de venta.
- **`sale_items (detalles de venta)`**: detalla los productos vendidos en cada factura.
- **`invoices (facturas)`**: genera los comprobantes fiscales.
- **`client_payments (pagos de clientes)`**: registra los cobros recibidos.

- **`accounts_receivable (cuentas por cobrar)`**: controla los pagos pendientes de clientes.
- **`accounts_payable (cuentas por pagar)`**: controla los pagos pendientes a proveedores.
- **`transactions (transacciones financieras)`**: registra todos los movimientos monetarios.
- **`balances (balances financieros)`**: calcula ingresos, gastos y utilidad neta mensual/anual.

- **`dashboard`**: módulo que reúne datos globales para mostrar KPIs y reportes.
