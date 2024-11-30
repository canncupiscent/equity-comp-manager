# Equity Compensation Manager

A full-stack web application for managing equity compensation, including company management, employee tracking, and grant administration.

## Features

- Company management
- Employee tracking
- Equity grant administration
- Insider trading compliance
- Tax jurisdiction handling
- Report generation

## Tech Stack

### Frontend
- React
- TypeScript
- Tailwind CSS
- shadcn/ui components

### Backend
- Node.js
- Express
- PostgreSQL
- TypeScript

## Getting Started

### Prerequisites

- Node.js 16+
- PostgreSQL 15+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/canncupiscent/equity-comp-manager.git
cd equity-comp-manager
```

2. Install dependencies:
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

3. Set up environment variables:
```bash
# In backend directory, create .env file
DB_USER=your_postgres_user
DB_HOST=localhost
DB_PASSWORD=your_postgres_password
DB_PORT=5432
PORT=3000
```

4. Start the development servers:
```bash
# Start backend server
cd backend
npm run dev

# In a new terminal, start frontend server
cd frontend
npm run dev
```

## License

MIT