# DocGen-UI

A modern, responsive web interface for documentation generation and management built with React, TypeScript, and Vite.

## Features

- **Dashboard**: Overview of documentation generation jobs, statistics, and recent activity
- **Endpoint Management**: Create, edit, and manage API endpoints with OpenAPI support
- **Job Management**: Monitor and control documentation generation jobs with real-time logs
- **Prompt Management**: Create and manage documentation generation prompts
- **Revision Control**: Handle documentation revisions and proposals
- **Team Collaboration**: Multi-team support with role-based access
- **Configuration**: Comprehensive settings for generators, pipelines, RAG, tracing, and more
- **Real-time Updates**: WebSocket integration for live job monitoring and logs
- **Responsive Design**: Modern UI built with Tailwind CSS and Radix UI components

## Tech Stack

### Frontend Framework

- **React 18** - Modern React with hooks and concurrent features
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and development server

### UI & Styling

- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible, unstyled UI primitives
- **Material UI Icons** - Comprehensive icon library
- **Lucide React** - Beautiful & consistent icons
- **Motion** - Animation library for React

### State Management & Data

- **TanStack Query** - Powerful data synchronization for React
- **Zustand** - Lightweight state management
- **React Hook Form** - Performant forms with easy validation

### Development Tools

- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **pnpm** - Fast, disk-efficient package manager

## Installation

### Prerequisites

- Node.js 18+
- pnpm package manager

### Setup

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd DocGen-UI
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Start the development server:

   ```bash
   pnpm dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

## Build & Deployment

### Development

```bash
pnpm dev
```

### Production Build

```bash
pnpm build
```

### Preview Production Build

```bash
pnpm preview
```

## Project Structure

```
src/
├── app/                    # Main application components
│   ├── components/         # Reusable UI components
│   │   ├── ui/            # Base UI components (buttons, inputs, etc.)
│   │   ├── dashboard/     # Dashboard-specific components
│   │   ├── endpoints/     # Endpoint management components
│   │   ├── jobs/          # Job management components
│   │   ├── layouts/       # Layout components
│   │   └── ...
│   ├── pages/             # Page components
│   ├── routes.tsx         # Application routing
│   └── App.tsx            # Main app component
├── definitions/           # Type definitions and constants
├── hooks/                 # Custom React hooks
├── lib/                   # Utility libraries and API clients
├── stores/                # Zustand state stores
├── types/                 # TypeScript type definitions
└── utils/                 # Utility functions
```

## 🔧 Configuration

The application supports various configuration options through environment variables and config files:

- **API Endpoints**: Configure backend API URLs
- **WebSocket**: Real-time communication settings
- **Authentication**: OAuth and team-based auth configuration
- **Themes**: Light/dark mode and custom theming

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Make your changes and add tests
4. Run the linter: `pnpm lint`
5. Commit your changes: `git commit -am 'Add some feature'`
6. Push to the branch: `git push origin feature/your-feature`
7. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Built with [Vite](https://vitejs.dev/)
- UI components powered by [Radix UI](https://www.radix-ui.com/)
- Icons from [Lucide](https://lucide.dev/) and [Material UI](https://mui.com/material-ui/material-icons/)
- State management with [TanStack Query](https://tanstack.com/query/latest) and [Zustand](https://zustand-demo.pmnd.rs/)</content>
  <parameter name="filePath">/home/alisa/ash/code/DocGen/DocGen-UI/README.md
