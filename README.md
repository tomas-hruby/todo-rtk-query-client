# Todo App - React + Redux Toolkit Query

A modern, responsive Todo application built with React, TypeScript, Redux Toolkit Query, and Tailwind CSS. This application provides a clean, intuitive interface for managing tasks with real-time updates and optimistic UI updates.

![Todo App Screenshot](https://i.ibb.co/V0xbvFnV/todo-app.png)

## ✨ Features

- ✅ **Create, Read, Update, Delete (CRUD) operations** for tasks
- 🔄 **Real-time task management** with optimistic updates
- 📱 **Responsive design** - works seamlessly on desktop, tablet, and mobile
- 🎯 **Filter tasks** - view all tasks or completed tasks only
- ⚡ **Bulk operations** - complete/incomplete all tasks, delete completed tasks
- 🎨 **Modern UI** with Tailwind CSS and custom design system
- 🔧 **TypeScript** for type safety and better development experience
- 📊 **Task statistics** - total, completed, and remaining task counts
- ♿ **Accessibility features** with ARIA labels and keyboard navigation
- 🚫 **Error handling** with user-friendly error messages and retry functionality

## 🛠️ Tech Stack

### Frontend
- **React 19.2.0** - Modern React with hooks and functional components
- **TypeScript 4.9.5** - Type-safe JavaScript
- **Redux Toolkit 2.9.2** - State management with modern Redux patterns
- **RTK Query** - Powerful data fetching and caching solution
- **Tailwind CSS 3.4.18** - Utility-first CSS framework
- **React Testing Library** - Component testing utilities

### Development Tools
- **Create React App** - Zero-configuration build setup
- **ESLint** - Code linting and formatting
- **PostCSS & Autoprefixer** - CSS processing and vendor prefixes

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

This application requires backend that is available on [Github](https://github.com/morosystems/todo-be)

## 🔧 State Management

The application uses **Redux Toolkit** with **RTK Query** for state management:

- **RTK Query**: Handles all API calls with automatic caching, background refetching, and optimistic updates
- **App Slice**: Manages application-level state (filters, error messages)
- **Selectors**: Compute derived state like task statistics and current task list
- **Type Safety**: Fully typed Redux setup with TypeScript

## 🚦 Error Handling

- **Network errors**: Automatic retry functionality for failed requests
- **User feedback**: Clear error messages with actionable retry buttons
- **Optimistic updates**: UI updates immediately, with rollback on failure
- **Loading states**: Visual feedback during async operations

## 🌟 Key Features Explained

### Optimistic Updates
Tasks appear immediately when created, even before server confirmation. If the server request fails, the optimistic update is rolled back and an error message is shown.

### Smart Filtering
- **All Tasks**: Shows all tasks with real-time updates
- **Completed Only**: Shows only completed tasks
- Automatic cache invalidation ensures data consistency

### Bulk Operations
- **Complete All**: Marks all incomplete tasks as completed
- **Incomplete All**: Marks all completed tasks as incomplete  
- **Clear Completed**: Removes all completed tasks

### Responsive Design
- **Mobile-first**: Optimized for mobile devices with touch-friendly interactions
- **Tablet & Desktop**: Enhanced layouts for larger screens
- **Flexible layouts**: Components adapt to different screen sizes