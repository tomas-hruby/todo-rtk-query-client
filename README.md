# Todo App - React + Redux Toolkit Query

A modern, responsive Todo application built with React, TypeScript, Redux Toolkit Query, and Tailwind CSS. This application provides a clean, intuitive interface for managing tasks with real-time updates and optimistic UI updates.

![Todo App Screenshot](https://i.ibb.co/wN6khHZC/todo.png)

## ✨ Features

### Core Functionality
- ✅ **Create, Read, Update, Delete (CRUD) operations** for tasks
- ✏️ **Inline task editing** - click Edit to modify task text directly
- 🔄 **Real-time task management** with optimistic updates
- � **Task timestamps** - tracks creation and completion dates
- 🎯 **Task filtering** - view all tasks or completed tasks only
- ⚡ **Bulk operations** - complete/incomplete all tasks, delete completed tasks

### User Experience
- 📱 **Responsive design** - works seamlessly on desktop, tablet, and mobile
- 🎨 **Modern UI** with Tailwind CSS and custom dark theme design system
- 🌙 **Theme toggle** - switch between light and dark modes
- ♿ **Accessibility features** - ARIA labels, keyboard navigation, screen reader support
- 🔧 **Form validation** - prevents empty tasks, trims whitespace
- 📊 **Task statistics** - real-time counts of total, completed, and remaining tasks
- 🚫 **Comprehensive error handling** - user-friendly error messages
- 🔄 **Optimistic UI updates** - instant feedback with automatic rollback on errors

### Developer Experience
- 🔧 **TypeScript** - full type safety and better development experience
- 🧪 **Testing setup** - Jest and React Testing Library configured
- 📦 **Component-based architecture** - modular, reusable components
- 🎭 **Memoized components** - optimized performance with React.memo

### Technical Features
- 🗃️ **Advanced state management** with Redux Toolkit and RTK Query
- 🔄 **Automatic caching** and background data synchronization
- 🎛️ **Custom hooks** for type-safe Redux operations
- 🧮 **Computed selectors** for derived state calculations
- 🏗️ **Clean architecture** with separation of concerns

## 🛠️ Tech Stack

### Frontend
- **React 19.2.0** - Modern React with hooks and functional components
- **TypeScript 4.9.5** - Type-safe JavaScript with strict mode enabled
- **Redux Toolkit 2.9.2** - State management with modern Redux patterns
- **RTK Query** - Powerful data fetching, caching, and synchronization
- **Tailwind CSS 3.4.18** - Utility-first CSS framework with custom theme
- **React Testing Library 16.3.0** - Component testing utilities

### State Management Architecture
- **Redux Store** - Centralized application state
- **RTK Query API Slices** - Automated API state management
- **Custom Selectors** - Memoized computed state derivation
- **Typed Hooks** - Type-safe Redux hooks (useAppSelector, useAppDispatch)
- **Optimistic Updates** - Immediate UI feedback with automatic rollback

### Development Tools
- **Create React App** - Zero-configuration build setup
- **TypeScript Compiler** - Static type checking and compilation
- **ESLint** - Code linting and formatting rules
- **Prettier 3.6.2** - Automatic code formatting

## 🚀 Getting Started

### Prerequisites

- **Node.js** (version 16 or higher)
- **npm** or **yarn** package manager
- **Backend API** running on `http://localhost:8080`

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/tomas-hruby/todo-rtk-query-client.git
   cd todo-rtk-query-client/client
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Backend Requirements

This application requires a backend API that provides the following endpoints:
- `GET /tasks` - Fetch all tasks
- `GET /tasks/completed` - Fetch completed tasks only
- `POST /tasks` - Create a new task
- `POST /tasks/{id}` - Update task text
- `POST /tasks/{id}/complete` - Mark task as completed
- `POST /tasks/{id}/incomplete` - Mark task as incomplete
- `DELETE /tasks/{id}` - Delete a task

Backend implementation is available on [GitHub](https://github.com/morosystems/todo-be)