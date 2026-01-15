🛒 My Shop – Next.js 

A modern full-stack e-commerce starter built with:

Next.js 16.1 (App Router)

React 19.2

TypeScript 5.9

Tailwind CSS 4.1

MongoDB

JWT Authentication (no sessions)

CSS Grid & Flexbox

This project demonstrates a clean, production-style architecture with products, cart, orders, and user authentication.

✨ Features

Product listing & product detail pages

User registration & login (JWT)

Protected cart & order APIs

MongoDB persistence

App Router for UI, Pages Router for APIs

Clean separation: components, services, types, lib

In-memory auth replaced with JWT

Simple, readable code (no over-engineering)

📁 Project Structure
src/
├─ app/                # App Router pages (UI)
├─ components/         # Reusable UI components
├─ lib/                # MongoDB, JWT, auth utilities
├─ services/           # Frontend API wrappers
├─ types/              # TypeScript domain types
├─ data/               # Seed data
├─ styles/             # Global styles
pages/
└─ api/                # API routes (Node runtime)

⚙️ Requirements

Node.js 18+

MongoDB (local or Atlas)

npm or pnpm

🚀 Getting Started
1️⃣ Clone & install
git clone <repo-url>
cd my-shop
npm install

2️⃣ Environment variables

Create .env.local in the root:

MONGODB_URI=mongodb://localhost:27017/shop
JWT_SECRET=your_super_secret_key

3️⃣ Seed the database
npm run seed


This inserts sample products into MongoDB.

4️⃣ Run the app
npm run dev


Open:

http://localhost:3000

🔐 Authentication (JWT)

Users register & login via API

JWT is returned and stored in localStorage

JWT is sent via Authorization: Bearer <token>

Cart & Orders APIs require a valid token

Token payload example:
{
  "id": "userId",
  "email": "user@example.com"
}

🔌 API Endpoints
Auth
Method	Endpoint	Description
POST	/api/auth/register	Register user
POST	/api/auth/login	Login user (returns JWT)
Products
Method	Endpoint	Description
GET	/api/products	Get all products
GET	/api/products/:id	Get product by ID
Cart (JWT protected)
Method	Endpoint	Description
POST	/api/cart	Add item to cart
Orders (JWT protected)
Method	Endpoint	Description
POST	/api/orders	Create order from cart
🧩 Frontend Architecture
types/

Defines data shapes:

Product

Cart

Order

User

services/

Handles API calls:

auth.service.ts

product.service.ts

cart.service.ts

order.service.ts

Components never call fetch directly.

🎨 Styling

Tailwind CSS 4.1

CSS Grid → product layouts

Flexbox → navigation, cards, cart rows

Mobile-first responsive design

🛡 Security Notes

Passwords are hashed with bcrypt

JWT expiration: 1 hour

No cookies or sessions

No sensitive data returned to frontend

⚠️ For production, add:

HTTPS

Refresh tokens

Rate limiting

Input validation (Zod)

CSRF protection (if cookies are used)

🧪 Scripts
npm run dev       # Development
npm run build     # Production build
npm run start     # Start production server
npm run seed      # Seed MongoDB

📌 Roadmap / Improvements

Cart page UI

Checkout page UI

Admin dashboard

Middleware route protection

Refresh tokens

Zod validation

Payment gateway integration

📄 License

MIT

🙌 Author

Built as a clean reference implementation for modern Next.js + MongoDB + JWT applications.