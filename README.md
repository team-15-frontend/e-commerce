# 🛒 E-Commerce Monorepo

A modern **React-based e-commerce frontend** built with **Turborepo** and **npm Workspaces**, featuring a customer storefront and an admin dashboard that share reusable UI components, API utilities, and development tooling.

Designed to demonstrate scalable frontend architecture, code sharing, and modern React development practices.

---

## 📸 Preview

### 🎥 Demo Video

<video src="https://raw.githubusercontent.com/team-9-frontend/e-commerce/refs/heads/main/docs/videos/e-commerce-compressed.mp4?raw=true" controls width="100%"></video>

---

## ✨ Features

### Storefront

- 🛍 Browse products
- 🔍 Search and filter products
- 🛒 Shopping cart
- 💳 Stripe checkout integration
- 👤 User authentication
- ❤️ Wishlist
- 📱 Responsive design

### Admin Dashboard

- 📦 Product management
- 📝 Category management
- 📊 Dashboard analytics
- 📦 Order management
- 👥 User management

### Shared Packages

- Reusable UI component library
- Shared API client
- Shared utility functions
- Shared Tailwind configuration

---

## 🛠 Tech Stack

### Frontend

- React 19
- Vite
- React Router
- Tailwind CSS v4

### State & Data Fetching

- TanStack Query
- Axios

### Forms & UI

- React Hook Form
- Headless UI
- React Icons
- React Toastify
- Recharts
- Swiper

### Payments

- Stripe

### Tooling

- Turborepo
- npm Workspaces
- Oxlint
- Prettier
- Vitest

---

## 📁 Project Structure

```text
.
├── apps
│   ├── store
│   │   ├── src
│   │   └── package.json
│   │
│   └── dashboard
│       ├── src
│       └── package.json
│
├── packages
│   ├── api
│   ├── ui
│   ├── utils
│   └── tailwind-config
│
├── package.json
├── turbo.json
└── README.md
```

---

## 📦 Workspace Packages

| Package                      | Description                                               |
| ---------------------------- | --------------------------------------------------------- |
| **packages/ui**              | Shared React UI components used by both applications.     |
| **packages/api**             | Axios client, API helpers, and React Query configuration. |
| **packages/utils**           | Shared utility functions and helpers.                     |
| **packages/tailwind-config** | Shared Tailwind CSS configuration and theme.              |

---

## 🏗 Architecture

```text
                    Monorepo
                       │
        ┌──────────────┴──────────────┐
        │                             │
   apps/store                 apps/dashboard
        │                             │
        └──────────────┬──────────────┘
                       │
        ┌──────────────┼──────────────┐
        │              │              │
       ui             api           utils
                       │
               tailwind-config
```

---

# 🚀 Getting Started

## Prerequisites

- Node.js 18+
- npm

---

## Clone the repository

```bash
git clone https://github.com/your-username/e-commerce-monorepo.git

cd e-commerce-monorepo
```

---

## Install dependencies

```bash
npm install
```

---

## Configure environment variables

Copy the example environment files.

```bash
cp apps/store/.env.example apps/store/.env

cp apps/dashboard/.env.example apps/dashboard/.env
```

Fill in the required values such as:

- API URL
- Stripe Publishable Key
- Any authentication credentials

---

## Start development

Run every application simultaneously.

```bash
npm run dev
```

Or run a single workspace.

```bash
npm run dev --workspace=store

npm run dev --workspace=dashboard
```

---

## Build

```bash
npm run build
```

---

## Preview

```bash
npm run preview --workspace=store

npm run preview --workspace=dashboard
```

---

# 📜 Available Scripts

| Command          | Description                                |
| ---------------- | ------------------------------------------ |
| `npm run dev`    | Start all applications in development mode |
| `npm run build`  | Build every workspace                      |
| `npm run lint`   | Run Oxlint across the monorepo             |
| `npm run format` | Format the repository with Prettier        |

---

# 📦 Installing Dependencies

Install a dependency into a specific workspace.

```bash
npm install axios --workspace=store
```

Example imports.

```js
import { Button } from '@repo/ui'
```

```js
import { apiClient } from '@repo/api'

apiClient.get('/products')
```

---

# 💳 Stripe

The storefront integrates with Stripe for payment processing.

To test payments locally, configure your environment variables with your Stripe publishable key and backend API endpoints.

---

# 🤝 Contributing

Contributions are welcome!

If you'd like to contribute:

1. Fork the repository
2. Create a feature branch

```bash
git checkout -b feature/amazing-feature
```

3. Commit your changes

```bash
git commit -m "Add amazing feature"
```

4. Push to your branch

```bash
git push origin feature/amazing-feature
```

5. Open a Pull Request

Please ensure the project builds successfully and passes linting before submitting a PR.

---

# 📄 License

This project is licensed under the MIT License.

See the LICENSE file for more information.

---

## ⭐ Support

If you found this project useful, consider giving it a ⭐ on GitHub.
