# 🎨 Frontend para la App IMPACT

![React](https://img.shields.io/badge/React-17.0.2-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-4.5.2-blue) ![Vite](https://img.shields.io/badge/Vite-2.7.2-blue)

## Descripción General

El **Frontend para la App IMPACT** está diseñado para proporcionar una interfaz de usuario intuitiva y eficiente para la gestión de activos e inventario. La aplicación está desarrollada utilizando **React** junto con **TypeScript** para garantizar un desarrollo seguro y escalable. Además, se utiliza **Vite** como herramienta de construcción para ofrecer un entorno de desarrollo rápido y eficiente, incluyendo características como el Hot Module Replacement (HMR).

## 🚀 Objetivos del Proyecto

1. **Interfaz de Usuario Intuitiva**: 
   - Diseño limpio y moderno para facilitar la gestión de activos e inventario.

2. **Rendimiento Optimizado**: 
   - Uso de Vite para un desarrollo rápido y una compilación optimizada.

3. **Seguridad y Escalabilidad**: 
   - Implementación de TypeScript para una mejor gestión de tipos y escalabilidad del código.

4. **Experiencia de Usuario Mejorada**: 
   - Incorporación de prácticas modernas de desarrollo frontend para una experiencia de usuario fluida.

## 🛠️ Tecnologías Utilizadas

- **React + TypeScript**: Desarrollo de componentes reutilizables y tipados.
- **Vite**: Herramienta de construcción moderna con HMR y optimización de la compilación.
- **ESLint**: Configuración personalizada para mantener la calidad del código.
- **Babel o SWC**: Utilizados para Fast Refresh a través de plugins oficiales.

## 🔧 Configuración de ESLint

Para aplicaciones de producción, se recomienda una configuración de ESLint más rigurosa, incluyendo reglas de comprobación de tipos y estilo:

1. **Configuración de `parserOptions`:**
   ```javascript
   export default {
     // otras reglas...
     parserOptions: {
       ecmaVersion: 'latest',
       sourceType: 'module',
       project: ['./tsconfig.json', './tsconfig.node.json', './tsconfig.app.json'],
       tsconfigRootDir: __dirname,
     },
   }
## 📞 Contacto

Para más información, preguntas o contribuciones relacionadas con este proyecto, no dudes en ponerte en contacto con:

- **Desarrollador:** Isaac Felipe Brenes Calderon
- **Correo Electrónico:** [isaacfelibrenes1904@gmail.com](mailto:isaacfelibrenes1904@gmail.com)
- **GitHub:** [felipe-del](https://github.com/felipe-del)

Estamos abiertos a colaboraciones, sugerencias y mejoras. Si encuentras algún problema o tienes ideas para nuevas funcionalidades, ¡tu feedback es muy valioso!

## 📜 Licencia

Este proyecto está licenciado bajo la Licencia MIT, lo que permite a cualquier persona usar, copiar, modificar y distribuir el software con pocas restricciones. Para más detalles sobre los términos y condiciones de esta licencia, por favor consulta el archivo `LICENSE` en el repositorio.

### Sobre la Licencia MIT

La Licencia MIT es una licencia permisiva de software que se considera amigable con el software de código abierto. Permite a los usuarios hacer prácticamente cualquier cosa con el software, siempre y cuando se incluya el aviso de copyright y la declaración de licencia en todas las copias o partes sustanciales del software. Esta licencia es ampliamente utilizada y aceptada en la comunidad de software libre y de código abierto.

