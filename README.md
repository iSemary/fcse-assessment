# FCSE Assessment

A modern web application built with Next.js, Typescript, GraphQL, and Tailwind.

## Table of Contents

- [Technologies Used](#technologies-used)
- [Installation & Development](#installation--development)
- [Run with Docker](#run-with-docker)
- [Building for Production](#building-for-production)
- [Testing](#testing)
- [Features](#features)
- [Configuration](#configuration)
- [Screenshots](#screenshots)

## Technologies Used

- **Framework**: Next.js
- **Runtime**: React 19 with TypeScript
- **Styling**: Tailwind CSS 4 for responsive design
- **Internationalization**: next-intl for multi-language support
- **Data Management**: Apollo Client with GraphQL
- **Testing**: Jest with Testing Library
- **UI Components**: SweetAlert2 for user notifications

## Installation & Development

1. **Clone the repository**

   ```bash
   git clone https://github.com/iSemary/fcse-assessment
   cd fcse-assessment
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

   The application will be available at `http://localhost:3000`

## Run with docker

1. **Build the Docker image**

   ```bash
   docker build -t fcse-assessment .
   ```

2. **Run the app**
   ```bash
   docker run -p 3000:3000 fcse-assessment
   ```

## Building for Production

1. **Build the application**

   ```bash
   npm run build
   # or
   yarn build
   ```

2. **Start the production server**
   ```bash
   npm start
   # or
   yarn start
   ```

## Testing

Tests Path:

```
src/__tests__/
```

Run the test suite:

```bash
npm test
# or
yarn test
```

## Features

- **Multi-language Support**: Built-in internationalization with next-intl
- **Modern UI**: Responsive design with Tailwind CSS and gradient backgrounds
- **GraphQL Ready**: Apollo Client integration for efficient data fetching
- **Type Safety**: Full TypeScript support for better development experience
- **Testing**: Comprehensive testing setup with Jest and Testing Library

The application features:

- Responsive header and footer components
- Gradient background design (blue to indigo)
- Internationalized content throughout

## Configuration

The application supports various environment variables:

- `NEXT_PUBLIC_APP_NAME` - Application name displayed on the homepage
- `NEXT_PUBLIC_GRAPHQL_ENDPOINT` - GraphQL Endpoint for the authentication

## Screenshots

View the full design on figma (English, German, and Arabic [RTL])
https://www.figma.com/design/sSdnO2Im7oc83FfSq8sA82/FCSE-Design?node-id=0-1&t=M2SpSw8LkbhFLL6f-1

![alt text](https://i.ibb.co/ZRq9Psxj/Screenshot-from-2025-06-12-21-30-33.png)
![alt text](https://i.ibb.co/3m28nmv0/Screenshot-from-2025-06-12-21-31-28.png)
![alt text](https://i.ibb.co/zWy8nq4j/Screenshot-from-2025-06-12-21-34-07.png)
