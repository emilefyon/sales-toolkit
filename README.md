# Rainmaker Toolbox 💰 🛠️

A collection of useful tools for sales professionals built as a single-page Vue.js application.

## Features

- **Phone Number Cleaner**: Format phone numbers in E.164 format with optional leading apostrophe for Excel
- **Last Name Cleaner**: Properly capitalize names (first letter uppercase, rest lowercase)
- **Text Lowercaser**: Convert text to lowercase

## Getting Started

### Prerequisites

- Node.js (v14.x or higher recommended)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd sales-toolkit
```

2. Install dependencies:
```bash
npm install
# or
yarn
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to http://localhost:5173/

## Building for Production

To build the application for production:

```bash
npm run build
# or
yarn build
```

The build output will be in the `dist` directory, which can be served by any static file server.

## Technologies Used

- Vue.js 3
- Vue Router
- Tailwind CSS
- libphonenumber-js for phone number formatting
- Vite for build tooling

## Adding New Tools

To add a new tool:

1. Create a new Vue component in the `src/views` directory
2. Add a route for the tool in `src/router/index.js`
3. Add the tool to the list in `src/views/Home.vue`
