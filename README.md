# Claros Analytics Dashboard

A modern, responsive analytics dashboard built with React, Redux, and TypeScript. This application demonstrates best practices in frontend development including state management, API integration, and comprehensive testing.

## Features

- **Dashboard Overview**: Visual analytics with stat cards, charts, and progress indicators
- **Data Management**: Browse, search, and paginate through Users, Posts, Comments, and Todos
- **Responsive Design**: Mobile-first design using TailwindCSS
- **State Management**: Centralized state with Redux Toolkit
- **Type Safety**: Full TypeScript implementation
- **Testing**: Unit tests with Vitest and E2E tests with Cypress

## Tech Stack

- **Framework**: React 19
- **Language**: TypeScript 5.9
- **State Management**: Redux Toolkit
- **Styling**: TailwindCSS 4
- **Routing**: React Router DOM 7
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Build Tool**: Vite 7
- **Testing**: Vitest, React Testing Library, Cypress

## Prerequisites

- Node.js 18+
- Yarn or npm

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/kirangautam45/Claros-Analytics-Frontend.git
cd Claros-Analytics-Frontend
```

### 2. Install dependencies

```bash
yarn install
# or
npm install
```

### 3. Set up environment variables

```bash
cp .env.example .env
```

The default API is JSONPlaceholder:
```
VITE_API_BASE_URL=https://jsonplaceholder.typicode.com
```

### 4. Start the development server

```bash
yarn dev
# or
npm run dev
```

The application will be available at `http://localhost:5173`

## Available Scripts

| Script | Description |
|--------|-------------|
| `yarn dev` | Start development server |
| `yarn build` | Build for production |
| `yarn preview` | Preview production build |
| `yarn lint` | Run ESLint |
| `yarn test` | Run unit tests in watch mode |
| `yarn test:run` | Run unit tests once |
| `yarn test:coverage` | Run tests with coverage report |
| `yarn cypress:open` | Open Cypress test runner |
| `yarn cypress:run` | Run Cypress tests headlessly |
| `yarn e2e` | Start server and run E2E tests |
| `yarn e2e:open` | Start server and open Cypress |

## Project Structure

```
src/
├── @types/           # TypeScript type definitions
├── api/              # API layer (Axios configuration, endpoints)
├── components/       # React components
│   ├── common/       # Reusable components (Modal, ErrorMessage, LoadingSpinner)
│   ├── dashboard/    # Dashboard-specific components (Charts, Tables, Cards)
│   └── forms/        # Form components
├── hooks/            # Custom React hooks
├── pages/            # Page components
├── routes/           # React Router configuration
├── store/            # Redux store and slices
└── test/             # Test setup and utilities
```

## Testing

### Unit Tests

Run unit tests with Vitest:

```bash
# Watch mode
yarn test

# Single run
yarn test:run

# With coverage
yarn test:coverage
```

### E2E Tests

Run end-to-end tests with Cypress:

```bash
# Open Cypress UI
yarn e2e:open

# Run headlessly
yarn e2e
```

## API Integration

This application uses [JSONPlaceholder](https://jsonplaceholder.typicode.com/) as the backend API. The following endpoints are consumed:

- `GET /users` - Fetch all users
- `GET /posts` - Fetch all posts
- `GET /comments` - Fetch all comments
- `GET /todos` - Fetch all todos

## Deployment

This project is configured for deployment on Vercel. The `vercel.json` file includes SPA routing configuration.

### Deploy to Vercel

1. Push your code to GitHub
2. Import the repository in [Vercel](https://vercel.com)
3. Vercel will automatically detect the Vite configuration
4. Set environment variables in Vercel dashboard
5. Deploy!

## Architecture Decisions

- **Redux Toolkit**: Chosen for predictable state management with less boilerplate
- **TailwindCSS**: Utility-first CSS for rapid UI development
- **Vite**: Fast build tool with excellent TypeScript support
- **Vitest**: Jest-compatible testing with Vite integration
- **Cypress**: Reliable E2E testing with great developer experience

## Contributing

1. Create a feature branch (`git checkout -b feature/amazing-feature`)
2. Commit your changes (`git commit -m 'Add amazing feature'`)
3. Push to the branch (`git push origin feature/amazing-feature`)
4. Open a Pull Request

## License

This project is for demonstration purposes.
