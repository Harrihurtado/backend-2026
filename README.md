#  backend-2026

RESTful API built with **NestJS**, **TypeORM**, and **MySQL** featuring 5 resource modules with full CRUD operations, Swagger documentation, and SOLID architecture principles.

---

##  Stack

| Technology | Purpose |
|---|---|
| **NestJS 11** | Framework |
| **TypeORM** + **MySQL2** | ORM and database driver |
| **Swagger (OpenAPI)** | Interactive API documentation |
| **class-validator** + **class-transformer** | DTO validation |
| **@nestjs/config** | Environment variable management |

---

## Prerequisites

- Node.js >= 18
- MySQL server running
- npm or yarn

---

## 📦 Installation

```bash
npm install
```

---

## ⚙️ Environment Setup

1. Copy the example environment file:

```bash
cp .env.example .env
```

2. Edit `.env` with your database credentials:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=your_password
DB_DATABASE=nestjs_db
DB_SYNCHRONIZE=true
DB_LOGGING=false
NODE_ENV=development
PORT=3000
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=1d
```

3. Create the database in MySQL:

```sql
CREATE DATABASE nestjs_db;
```

---

## ▶️ Running the Application

```bash
# Development mode (with hot reload)
npm run start:dev

# Production mode
npm run build
npm run start:prod
```

---

## 🐳 Docker

```bash
# Build and run with Docker Compose
docker compose up -d
```

> Make sure to set `DB_HOST=db` in your `.env` when using Docker Compose.

---

## 📖 API Documentation (Swagger)

Once the application is running, access the interactive API docs at:

```
https://backend-2026-mg07.onrender.com/docs
```

---

## 🌐 Production

API deployed at:

```
https://backend-2026.onrender.com/api
```

---

## 📡 Available Endpoints

All endpoints are prefixed with `/api`.

| Resource | GET (list) | POST | GET (one) | PATCH | DELETE |
|---|---|---|---|---|---|
| **Users** | `/api/users` | `/api/users` | `/api/users/:id` | `/api/users/:id` | `/api/users/:id` |
| **Categories** | `/api/categories` | `/api/categories` | `/api/categories/:id` | `/api/categories/:id` | `/api/categories/:id` |
| **Products** | `/api/products` | `/api/products` | `/api/products/:id` | `/api/products/:id` | `/api/products/:id` |
| **Orders** | `/api/orders` | `/api/orders` | `/api/orders/:id` | `/api/orders/:id` | `/api/orders/:id` |
| **Order Items** | `/api/order-items` | `/api/order-items` | `/api/order-items/:id` | `/api/order-items/:id` | `/api/order-items/:id` |

---

## 🗂️ Project Structure

```
src/
├── common/
│   ├── filters/         — Global exception filter
│   ├── interceptors/    — Response transformation interceptor
│   └── interfaces/      — Base repository interface
├── modules/
│   ├── users/
│   ├── categories/
│   ├── products/
│   ├── orders/
│   └── order-items/
├── app.module.ts
└── main.ts
```

---

## 🏗️ Architecture

- **Repository Pattern** — Data access isolated in repository classes implementing `IBaseRepository`
- **Service Interfaces** — Business logic behind interfaces (e.g., `IUsersService`) for dependency inversion
- **Dependency Injection** — All dependencies injected by interface token, not concrete class
- **Global Validation** — `ValidationPipe` with `whitelist` and `forbidNonWhitelisted`
- **Standardized Responses:**
  - ✅ Success: `{ statusCode, data, timestamp }`
  - ❌ Error: `{ statusCode, message, timestamp }`

---

## 🔧 Scripts

```bash
npm run build          # Compile TypeScript
npm run start          # Start production server
npm run start:dev      # Start development server (watch mode)
npm run start:debug    # Start debug server
npm run lint           # Run ESLint
npm run format         # Run Prettier
npm run test           # Run unit tests
npm run test:e2e       # Run e2e tests
```
