# React Forms Project

An educational project built as part of **RS School React course**.  
The main goal is to demonstrate working with **forms, validation, modals, state management with Redux Toolkit, and testing**.

---

<div align="left">
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/React-20232a?style=for-the-badge&logo=react&logoColor=61dafb" />
  <img src="https://img.shields.io/badge/Redux_Toolkit-764abc?style=for-the-badge&logo=redux&logoColor=white" />
  <img src="https://img.shields.io/badge/React_Hook_Form-ec5990?style=for-the-badge&logo=reacthookform&logoColor=white" />
  <img src="https://img.shields.io/badge/Yup-2c3e50?style=for-the-badge&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38b2ac?style=for-the-badge&logo=tailwind-css&logoColor=white" />
  <img src="https://img.shields.io/badge/Vitest-6E9F18?style=for-the-badge&logo=vitest&logoColor=white" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
</div>

## 🚀 Features

- **Modals (React Portals)**  
  Two different forms inside shared modal components:
  - Uncontrolled components form
  - React Hook Form implementation

- **State Management (Redux Toolkit)**  
  Stores all submitted form data and renders it on the main page.

- **Form Functionality**  
  Collects user input with validation for:
  - Name (first letter capitalized)
  - Age (positive number)
  - Email
  - Passwords (match check + strength rules: number, uppercase, lowercase, special character)
  - Gender (radio/select)
  - Terms & Conditions agreement
  - Picture upload (PNG/JPEG, validated by size & format, stored in Redux as base64)
  - Country autocomplete (data stored in Redux store)

- **Validation (Yup)**
  - React Hook Form: live validation, submit disabled until all fields are valid
  - Uncontrolled form: validation only on submit

- **UX Details**
  - Focus management inside modals
  - Close on ESC key or outside click
  - Highlight newly added entries on the main page

- **Testing (React Testing Library + Vitest)**
  - Form rendering and validation
  - Password strength logic
  - Modal accessibility and portal behavior
  - Redux store (actions, reducers, selectors)
  - Utility functions (image conversion, country filtering)

---

## 🛠️ Tech Stack

- **React 19**
- **TypeScript**
- **Redux Toolkit**
- **React Hook Form**
- **Yup**
- **Tailwind CSS**
- **Vite**
- **React Testing Library + Vitest**

---

## ⚡ Getting Started

```bash
# Install dependencies
npm install

# Format code
npm run format:fix

# Linting
npm run lint

# Run tests
npm run test
npm run test:coverage

# Run development server
npm run dev

```
