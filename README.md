# VESS-CLIENT 🎨

[![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)](https://reactjs.org)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)](https://vitejs.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![MUI](https://img.shields.io/badge/MUI-007FFF?style=flat&logo=mui&logoColor=white)](https://mui.com)

## 📖 About

**VESS-CLIENT** is the front-end application built with **React** and **Vite**, using **MUI (Material UI)** as the component library.  
It is part of the **VESS** project for the **Advanced Web Programming** course at UTFPR.

This client provides a modern and responsive interface to interact with the **VESS-SERVER** API, allowing users to register/login, and create, view, and manage evaluations based on the **VESS method**.

---

## ✨ Tech stack

- **Framework:** React 19 + Vite 6
- **Language:** TypeScript
- **UI Components:** MUI (Material UI)
- **Authentication:** JWT + Google OAuth2 (handled by the backend)
- **State management:** React Context + Hooks
- **Additional tools:**
  - React Router DOM
  - Axios (HTTP requests)

---

## 🚧 Features

- User authentication (login and registration)
- Full CRUD for VESS method evaluations
- File upload support (images) via the backend
- Real-time UI feedback and notifications
- Protected navigation using private routes

---


_Developed by Diego Chruscinski de Souza for the Advanced Web Programming course at UTFPR._

---

## Local setup

Run the [VESS API](https://github.com/chruscinskiDiego/vess-server) first, then:

```bash
npm ci
cp .env.example .env
# Set the API URL and your Google OAuth client ID.
npm run dev
```

The backend currently permits the frontend origin http://localhost:5173. Keep client and server URLs aligned when changing ports. Variables prefixed with VITE_ are bundled into the browser application; do not place server secrets in them.

## Project structure

- `src/pages/`: evaluation, history, configuration and authentication screens.
- `src/components/`: shared interface components.
- `src/contexts/`: current user state.
- `src/lib/axios.ts`: API address, token handling and unauthorized responses.

## Available checks

```bash
npm run build
npm run lint
```

The current dependency manifest does not include React Hook Form; form handling should be checked in each screen. There is no LICENSE file in the repository.
