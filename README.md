# 🌐 IMPACT - Sistema de Gestión de Recursos para CIMPA - Frontend

![React](https://img.shields.io/badge/React-18-blue)
![Vite](https://img.shields.io/badge/Vite-4.0-purple)
![Axios](https://img.shields.io/badge/Axios-1.3-lightblue)
![License](https://img.shields.io/badge/license-MIT-blue)

## 🌟 Descripción General

El frontend de IMPACT es una aplicación web desarrollada con React que proporciona una interfaz intuitiva para la gestión de recursos materiales en el CIMPA (Centro de Investigación de Matemática Pura y Aplicada) de la Universidad de Costa Rica.

## 🎯 Objetivos del Proyecto

1. **Interfaz de Usuario Intuitiva**:
   - Visualización clara de activos, productos y espacios
   - Navegación fluida entre módulos

2. **Gestión de Solicitudes**:
   - Formularios interactivos para creación de solicitudes
   - Seguimiento del estado de solicitudes
   - Sistema de notificaciones integrado

3. **Control de Acceso**:
   - Autenticación segura con JWT
   - Vistas adaptadas a roles (Administrador, Gestor, Docente)
   - Protección de rutas privadas

## 🏗️ Arquitectura del Frontend

### Estructura Modular
```
src/
├── assets/              # Recursos estáticos
├── components/          # Componentes reutilizables
├── config/              # Configuraciones globales
├── contexts/            # Contextos de React
├── hooks/               # Custom hooks
├── layouts/             # Diseños estructurales
├── pages/               # Vistas principales
├── routes/              # Configuración de rutas
├── services/            # Conexión con API backend
├── styles/              # Estilos globales
├── utils/               # Utilidades comunes
└── App.jsx              # Componente principal
```

### Patrones Implementados
- Componentes Funcionales
- Context API para estado global
- Custom Hooks para lógica reutilizable

## 🛠️ Tecnologías Clave

- **Core**:
  - React 18
  - Vite 4
  - React Router 6
  - Axios

- **UI/UX**:
  - Material-UI (MUI)
  - Styled Components
  - React Icons

- **Gestión de Estado**:
  - Context API
  - React Hook Form
  - Yup (Validaciones)

- **Otros**:
  - Day.js (Manejo de fechas)
  - React Toastify (Notificaciones)
  - React Query (Opcional)

## 📌 Características Principales

### Módulos Implementados

1. **Autenticación**:
   - Login con validación
   - Recuperación de contraseña
   - Protección de rutas por roles

2. **Dashboard**:
   - Resumen de recursos
   - Estadísticas rápidas
   - Accesos directos

3. **Gestión de Recursos**:
   - Tablas interactivas (paginación, filtros, ordenamiento)
   - Formularios de creación/edición
   - Vista detallada de cada recurso

4. **Sistema de Solicitudes**:
   - Wizard para creación
   - Historial con filtros avanzados
   - Panel de aprobación (para gestores)

5. **Perfil de Usuario**:
   - Edición de información personal
   - Cambio de contraseña
   - Preferencias de notificación

## 🎨 Guía de Estilos

El sistema sigue los lineamientos de diseño de la Universidad de Costa Rica:

- **Paleta de Colores**:
  - Primario: Azul UCR (#0056A3)
  - Secundario: Verde UCR (#78BE20)
  - Neutrales: Escala de grises

- **Tipografía**:
  - Principal: 'Roboto' (Google Fonts)
  - Secundaria: Sistema sans-serif

## 🚀 Instalación y Configuración

1. Clonar el repositorio:
```bash
git clone https://github.com/impact-cimpa/frontend.git
```

2. Instalar dependencias:
```bash
npm install
```

3. Configurar variables de entorno:
```env
VITE_API_URL=http://localhost:8080/api
VITE_ENV=development
```

4. Iniciar servidor de desarrollo:
```bash
npm run dev
```

## 📄 Documentación

- [Guía de Componentes](docs/components.md)
- [API Documentation](docs/api.md)
- [Style Guide](docs/styleguide.md)

## 👥 Equipo de Desarrollo

| Nombre | Rol | Contacto |
|--------|-----|----------|
| Raquel Alfaro | Full Stack De | [raquealfaba@gmail.com](mailto:raquealfaba@gmail.com) |
| Joel Ramírez | Full Stack Dev | [joelramva07@gmail.com](mailto:joelramva07@gmail.com) |
| Maria González | Full Stack De | [maria.gonzalez.benavides@est.una.ac.cr](mailto:maria.gonzalez.benavides@est.una.ac.cr) |
| Isaac Brenes | Full Stack Dev | [isaacfelibrenes1904@gmail.com](mailto:isaacfelibrenes1904@gmail.com) |
| Dilan Hernández | Full Stack Dev | [dilan.hernandez.ulate@est.una.ac.cr](mailto:dilan.hernandez.ulate@est.una.ac.cr) |
| Marco Leandro | Full Stack Dev | [marcoleandro2808@gmail.com](mailto:marcoleandro2808@gmail.com) |

## 📜 Licencia

Este proyecto no cuenta con una licencia profesional específica. El uso y distribución del código están sujetos a los términos establecidos por el autor. Se recomienda revisar el código y contactar con el propietario del proyecto para obtener detalles adicionales sobre el uso permitido.

---

> **Nota**: Este sistema fue desarrollado como parte del curso de Ingeniería en Sistemas I, II y III de la Escuela de Informática de la Universidad Nacional de Costa Rica.
