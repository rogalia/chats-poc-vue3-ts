# REST/WebSocket Chat Demo App
Demo application comparing REST and WebSocket real-time chat implementations using Vue 3 Composition API.

The project is designed as a technical showcase, focusing on frontend architecture, composables-based logic separation, and state management patterns rather than UI polish.


## Project Goals
This project was built to demonstrate:
- Transport layer abstraction (REST and WebSocket implementations)
- Composition API architecture patterns
- Separation of concerns between UI, business logic, and data layer
- Typed frontend architecture using TypeScript
- Scalable project structure suitable for real-world applications


## Core Concepts Demonstrated

The application supports two independent communication strategies:
- REST-based message exchange
- WebSocket real-time messaging

Both implementations share the same UI and store layer and are interchangeable at runtime.

This demonstrates:
- Decoupling UI logic from transport layer
- Interface-based service design
- Replaceable communication strategies


## Key Engineering Concepts

### Composition API as Business Logic Layer

Reusable logic is implemented via composables:
- useRest
- useWebsocket

They act as orchestration layer between:
- Services
- Global state
- UI components

Benefits:
- Isolated async logic
- Reusable side-effect handling
- Easier unit testing
- Cleaner components

### Service Layer

Transport-specific logic is encapsulated inside service modules:
- REST service
- WebSocket service

Responsibilities:
- API communication
- Connection lifecycle handling
- Message normalization

### Centralized State Management

State is handled via Pinia store:
- message history
- active transport mode
- chat state synchronization

This approach mirrors production-scale SPA patterns.

## Architecture Overview

High-level structure:
```
src/
 ├ services        # Transport layer (REST / WebSocket implementations)
 ├ composables     # Reusable logic abstraction
 ├ stores          # Global application state (Pinia)
 ├ views           # Page-level UI components
 ├ router          # Routing configuration
 ├ types           # Shared TypeScript models
```

Architectural Principles
- Clear separation of concerns
- Replaceable infrastructure layer
- Composition over inheritance
- UI as a thin rendering layer

## Functional Overview

The application simulates a chat environment in order to demonstrate transport behavior and frontend data flow patterns.

Current Functionality
- Two independent chat instances (REST and WebSocket modes)
- User message input with automatic server-side response simulation
- Independent message history per transport mode
- Local persistence of chat history using browser storage
- Runtime transport switching without page reload
- Real-time message delivery in WebSocket mode

Simulation Details

Server responses are intentionally simplified and generated automatically.
The focus is placed on message flow, transport abstraction, and frontend architecture, not on content generation.


## Technology Stack
- Vue 3 (Composition API)
- TypeScript
- Pinia
- Vite
- WebSocket API
- REST API


## Non-Goals
This project intentionally does NOT focus on:
- UI/UX polish
- authentication
- persistence
- backend complexity

The focus is strictly on frontend architecture and communication patterns.

## Setup
Install dependencies:
```
npm install
```

Run development server:
```
npm run dev:all
```

Application will be available at:
```
http://localhost:5173
```

## Author
Valentine Orlovskiy

Frontend Developer

LinkedIn: https://www.linkedin.com/in/valentine-orlovskiy-82320518b/