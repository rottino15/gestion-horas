# Gestión de Horas

Este proyecto implementa un sistema básico para registrar horas de trabajo.

- **Backend:** Node.js con Express y una base de datos SQLite.
- **Frontend:** React usando Vite.

## Instalación

1. Instalar las dependencias del backend y del frontend (requiere acceso a internet):

```bash
npm install
cd frontend && npm install
```

2. Para desarrollar el frontend:

```bash
npm run dev
```

3. En otra terminal iniciar el servidor backend:

```bash
npm start
```

El backend escuchará en el puerto `3001` y el frontend en el `5173` por defecto.

## Estructura

```
backend/    Código del servidor Express y la base de datos
frontend/   Aplicación React (Vite)
```
<<<<<<< HEAD
=======

## Uso

Al abrir la aplicación se muestra un selector de fecha desde el cual se puede
elegir el día que se quiere gestionar. Para cada día se pueden añadir varias
entradas indicando la hora de inicio y de fin. La aplicación también calcula y
muestra el total de horas trabajadas en el mes seleccionado.
>>>>>>> 27qwgj-codex/crear-sistema-de-registro-de-horas
