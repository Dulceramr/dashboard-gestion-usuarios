## 🌟 Descripción del Proyecto

Aplicación Single Page Application (SPA) desarrollada con React para la gestión de usuarios. Permite visualizar, filtrar, gestionar y comunicarse con usuarios obtenidos de la API [Random User](https://randomuser.me/).

## 🎯 Objetivo del Proyecto
Desarrollar un panel de gestión de usuarios que demuestre habilidades técnicas en React, TypeScript y arquitectura frontend, cumpliendo con todos los requerimientos específicos solicitados por el equipo de EnvioClick.

## ✨ Características Principales

- 🔐 **Autenticación de usuarios** con sistema de login protegido
- 👥 **Gestión de usuarios** con listado y detalles individuales
- 🔍 **Sistema de filtros avanzado** por género, nacionalidad y rango de edad
- 📤 **Exportación a CSV** de usuarios seleccionados
- 💬 **Sistema de mensajería** con histórico por usuario
- 📱 **Diseño responsive** (Mobile First) con paleta de colores personalizada
- ⚡ **Optimización de rendimiento** con caché local
- 🎨 **Estilos personalizados** con SCSS (sin librerías externas)

## 🎨 Paleta de Colores

La aplicación utiliza una paleta de colores moderna y accesible:

- **Principal:** `#60267a` (púrpura) para botones y encabezados
- **Acento:** `#F59E0B` (ámbar) para alertas y destacados
- **Fondos:** `#faf7fa` y `#F8FAFC` para una experiencia visual limpia
- **Texto:** `#121824` (principal), `#64748B` (secundario)
- **Estados:** Verde (`#10B981`), Rojo (`#EF4444`), Azul (`#3B82F6`)

## 🏗️ Estructura del Proyecto
src/
├── 📁 assets/ # Recursos estáticos (imágenes, iconos)
├── 📁 componentes/ # Componentes React
│ ├── 📁 filtros/ # Componentes de filtrado
│ │ └── FiltrosUsuarios.tsx
│ ├── 📁 layout/ # Componentes de layout
│ │ └── ProtectedRoute.tsx
│ ├── 📁 ui/ # Componentes de UI reutilizables
│ │ ├── MessageHistory.tsx
│ │ ├── MessageItem.tsx
│ │ ├── NotificacionExportacion.tsx
│ │ ├── SendMessageModal.tsx
│ │ └── ToastNotification.tsx
│ └── 📁 usuario/ # Componentes específicos de usuario
│ ├── ListaUsuarios.tsx
│ └── UserActions.tsx
├── 📁 context/ # Contextos React
│ ├── MessageContext.tsx
│ └── UsuariosContext.tsx
├── 📁 estilos/ # Archivos SCSS
│ ├── login.scss
│ └── users.scss
├── 📁 hooks/ # Custom Hooks
│ ├── useUsuarios.ts
│ └── useUsuariosMetrics.ts
├── 📁 paginas/ # Páginas/rutas principales
│ ├── Login.tsx
│ ├── UserDetail.tsx
│ ├── userdetail.css
│ └── Users.tsx
├── 📁 utilidades/ # Utilidades y helpers
│ └── exportCSV.ts # Utilidad para exportar a CSV
├── App.tsx # Componente principal
├── index.css # Estilos globales
├── main.scss # SCSS principal
└── main.tsx # Punto de entrada

text

## 🚀 Requisitos Previos

- Node.js (versión 18 o superior)
- npm o yarn

## ⚙️ Instalación y Configuración

### 1. Clonar el repositorio
```bash
git clone <url-del-repositorio>
cd dashboard-gestion-usuarios
2. Instalar dependencias
bash
npm install

3. Ejecutar en modo desarrollo
bash
npm run dev

La aplicación estará disponible en: http://localhost:5173

```
## 🔧 Tecnologías Utilizadas

- **React 19.2.0** - Biblioteca principal para la interfaz de usuario
- **TypeScript** - Tipado estático para mayor robustez del código
- **Vite** - Bundler y herramienta de desarrollo ultra rápida
- **React Router DOM 7.10.1** - Enrutamiento para SPA
- **SASS/SCSS** - Preprocesador CSS para estilos avanzados

## 📱 Funcionalidades Implementadas

### 🔐 Sistema de Autenticación
- Página de login con validación en tiempo real
- Rutas protegidas mediante `ProtectedRoute`
- Persistencia de sesión con sessionStorage

### 👥 Gestión de Usuarios
- Listado de usuarios (mínimo 30 usuarios obtenidos de API)
- Vista detallada de cada usuario (`/users/:id`)
- Eliminación de usuarios con confirmación modal
- Caché inteligente usando localforage para evitar peticiones redundantes

### 🔍 Filtros Avanzados
- **Filtro por género** (hombres/mujeres/todos)
- **Filtro por nacionalidad** (multi-selección)
- **Filtro por rango de edad** (slider personalizado)
- **Filtros combinados** (ej: "hombres mayores de 40 en México")
- Botones aplicar/limpiar filtros

### 📊 Exportación de Datos
- Exportación a CSV de usuarios filtrados/seleccionados
- Notificación de progreso con componente `NotificacionExportacion`
- Exportación asíncrona simulando entorno de producción
- Feedback visual durante todo el proceso

### 💬 Sistema de Mensajería
- Envío de mensajes desde el listado mediante modal
- Histórico de mensajes por usuario en vista de detalle
- Notificaciones toast para confirmaciones
- Context API para gestión global de mensajes

## 🎨 Diseño y UX

- **Metodología Mobile First** implementada completamente
- **Diseño responsive** con breakpoints adaptativos
- **Feedback visual** para todas las acciones de usuario
- **Accesibilidad** considerada en formularios y navegación

## 🔄 Flujo de la Aplicación

1. **Login** → Acceso con credenciales básicas
2. **Dashboard** → Listado principal de usuarios con estadísticas
3. **Filtrado** → Aplicar filtros según necesidades específicas
4. **Acciones** → Ver detalles, enviar mensajes, eliminar usuarios
5. **Exportación** → Exportar datos filtrados/seleccionados a CSV
6. **Logout** → Cierre de sesión seguro

## 📝 Credenciales de Acceso

Para acceder a la aplicación, utiliza las siguientes credenciales:

- **Usuario:** `admin`
- **Contraseña:** `admin123`

*Estas credenciales son para fines de demostración en la prueba técnica.*

## ⚡ Optimizaciones Implementadas

### Caché de Datos
- Uso de `localforage` para cachear respuestas de la API
- Evita peticiones redundantes a randomuser.me

### Rendimiento y Memoria
- **Custom Hooks** para lógica reutilizable (`useUsuarios`, `useUsuariosMetrics`)
- **Memoización** con `useMemo` y `useCallback` para evitar renders innecesarios

## 🗂️ Estructura de Rutas

- `/` → Redirección automática a login
- `/login` → Página de autenticación con formulario validado
- `/users` → Listado principal de usuarios con filtros
- `/users/:id` → Detalle completo de usuario específico

## 🔄 Gestión de Estado

### Context API para Estado Global
**UsuariosContext** (`src/context/usuariosContext.tsx`):
- Gestiona el estado global de usuarios obtenidos de la API
- Implementa caché inteligente con `localforage` (5 minutos de duración)
- Maneja operaciones CRUD: eliminar usuarios, recargar datos
- Proporciona funciones de filtrado por género, nacionalidad y edad
- Persistencia automática en `localStorage`

**MessagesContext** (`src/context/messageContext.tsx`):
- Gestiona el sistema de mensajería completo
- Almacena histórico de mensajes por usuario
- Implementa respuestas automáticas simuladas
- Persistencia en `localStorage` para mantener conversaciones

### Custom Hooks para Lógica Reutilizable
**`useUsuarios`** (`src/hooks/useUsuarios.ts`):
- Hook personalizado para consumir el contexto de usuarios
- Expone datos y funciones de forma simplificada
- Maneja estados de carga y error

**`useUsuariosMetrics`** (`src/hooks/useUsuariosMetrics.ts`):
- Hook especializado en cálculos y métricas
- Estadísticas de usuarios (total, hombres, mujeres, filtrados)
- Cálculos en tiempo real basados en filtros aplicados

**`useMessages`** (`src/context/messageContext.tsx`):
- Hook para interactuar con el sistema de mensajería
- Envío de mensajes y consulta de histórico por usuario

### Persistencia y Caché
- **localStorage**: Para mensajes y preferencias de usuario
- **localforage**: Para caché de datos de la API con expiración
- **sessionStorage**: Para persistencia de sesión de login
- **Estrategia de caché**: Validación por timestamp (5 minutos)

💌 Nota Personal
Apreciados Erick, Neydy e Isaac,

Ha sido un reto muy enriquecedor desarrollar esta prueba técnica. He puesto especial atención en crear no solo una aplicación funcional, sino una base sólida que pueda escalar según las necesidades de EnvioClick.

Cada decisión técnica fue tomada considerando:

Mantenibilidad a largo plazo

Rendimiento con datos reales

Experiencia de usuario intuitiva

Código limpio para el equipo

Estoy entusiasmada por la posibilidad de contribuir con mis habilidades al equipo de EnvioClick y enfrentar nuevos desafíos juntos.

Saludos cordiales,

Dulce Ramírez
Frontend Developer