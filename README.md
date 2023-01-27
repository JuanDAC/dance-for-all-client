# Dance For Everyone - Frontend

Dance For Everyone is an interactive web application that allows users to learn and perform different dance styles using state-of-the-art machine learning models.

## Table of Contents

- Features
- Technologies
- Installation
- Usage
- Documentation
- Contribution
- License

## Features

- Real-time human pose estimation using @tensorflow-models/posenet
- Interactive dance tutorials using ml5.js
- Web-based user interface built using LitElement and Web Components
- Routing and task management using @lit-labs/router and @lit-labs/task
- Build tooling using Rollup
- Written in TypeScript

## Technologies

- LitElement - A lightweight base class for creating fast, web-components with a simple and expressive API.
- Web Components - A set of technologies that allow developers to create custom, reusable elements for building web applications.
- TypeScript - A superset of JavaScript that adds optional static typing and other features to improve the development experience.
- Rollup - A JavaScript module bundler that generates optimized, small bundles for production use.
- @tensorflow-models/posenet - A TensorFlow.js model for real-time human pose estimation.
- ml5.js - A friendly, high-level API for using machine learning models in the browser.
- @lit-labs/router - A lightweight router for web components, built with LitElement.
- @lit-labs/task - A task management library for web components, built with LitElement.

## Installation

To run the Dance For Everyone frontend, you will need to have Node.js and npm (Node Package Manager) installed on your machine. Once you have those set up, you can follow these steps to install and run the project:

- Clone or download the repository to your local machine.
- Navigate to the project's root directory in your terminal.
- Run npm install to install all the necessary dependencies.
- Run npm run dev to start the development server.

To install the dependencies and start the development server, run the following commands:

```bash
npm install
npm run dev
```

This will start a development server on http://localhost:3000.

To build the application for production, run:

```bash
npm run build
```

This will generate optimized, production-ready bundles in the build directory

## Usage

The Dance For Everyone frontend is built using web components and the lit-element library, which allows for easy creation of lightweight and fast web components. We also use Typescript for type checking and to improve developer experience.

The project uses Rollup as its building tool, which allows for efficient and optimized builds.

We use ml5 library which is friendly to both beginners and experienced machine learning developers. It provides an easy-to-use API for creating and training machine learning models.

We also use @lit-labs/router for client-side routing, @lit-labs/task for managing async tasks, and @tensorflow-models/posenet and @tensorflow/tfjs for running machine learning models to detect human poses.

## Documentation

### Customization

The application is built with web-components and Lit Element, making it easy to customize and add new features. The components are written in TypeScript, making the code easy to understand and maintain.

### Routing

Routing is handled by the @lit-labs/router library. You can add new routes by editing the router.ts file in the src directory.

### Pose Detection

The pose detection is handled by the @tensorflow-models/posenet library. You can customize the model by editing the posenet.ts file in the src directory.

### Dance Routine

The dance routine is defined in the dance-routine.ts file in the src directory. You can add new poses and transitions to the routine by editing this file.

### Structure

The project is organized into several different directories, each with its own purpose.

#### src/

This is the main directory for the source code of the application. It contains the following subdirectories:

#### app/

This directory contains the entry point and handler for the routes of the application. The main file in this directory is app.ts, which sets up the routing for the application.

#### routes/

This directory contains the different routes for the application. Each route has its own subdirectory, which contains the necessary files for that route, including .ts, .styles.ts, .template.ts, and .types.ts files.

#### share/

This directory contains classes and instances that are shared across the application. It contains the following subdirectories:

#### components/

This directory contains reusable web components that can be used throughout the application. Each component has its own subdirectory, which contains the necessary files for that component, including .ts, .styles.ts, .template.ts, and .types.ts files.

#### logic/

This directory contains classes that handle the logic of the machine learning models used in the application, such as the "Dance Replicator" model.

#### services/

This directory contains global services used throughout the application, such as the ml5 and p5 libraries.

### Technology Stack

The Dance For Everyone project is built using the following technologies:

#### Browser:

The browser was selected as the platform to host the project because it is widely available and accessible to a large audience. This allows for the project to reach a large number of users, regardless of their device or operating system.

#### LitElement:

LitElement is a lightweight and efficient library for building web components. It makes it easy to create reusable, performant, and expressive UI elements that can be easily integrated into the project.

#### TensorFlow.js:

TensorFlow.js is a powerful and flexible library for developing machine learning models in JavaScript. It allows for easy deployment of models in the browser, which is important for the "Dance Replicator" model in the project.

#### Typescript:

Typescript is a typed superset of JavaScript that provides a more robust development experience. It enforces strict type checking and improves code readability and maintainability, which is essential for a large and complex project like Dance For Everyone.

## Contributing

If you would like to contribute to the development of Dance For Everyone, please follow these guidelines:

Fork the repository.
Create a new branch for your changes.
Make your changes and test them thoroughly.
Submit a pull request to the development branch.
Please also make sure to update any documentation as necessary and follow the code style of the project.

## Licensing

The Dance For Everyone frontend is open-source and available under the MIT License.

## Conclusion

Dance For Everyone is a project that aims to make learning dance more accessible to everyone. With the help of modern web technologies, machine learning, and user-centered design, we hope to create an enjoyable and effective experience for users of all ages and backgrounds. We hope you find our project helpful and we welcome any feedback or contributions to make it better.
