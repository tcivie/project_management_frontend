# Frontend Project - React Website

This project is a simple frontend application built using React. The primary goal of this project is to learn how to work in Sprints and manage Continuous Integration/Continuous Deployment (CI/CD) pipeline workflows. This project serves as the frontend for a separate [Node.js (Express) backend](https://github.com/tcivie/project_management_backend).

## Getting Started

To get started with the project, you'll need to have [Node.js](https://nodejs.org/en/) and [npm](https://www.npmjs.com/get-npm) installed on your local development environment.

1. Clone the repository:
```
git clone https://github.com/tcivie/project_management_frontend.git
```

2. Change to the project directory:
```
cd <frontend-project-name>
```

3. Install the dependencies:
```
npm install
```

4. Run the development server:
```
npm start
```

The React app should now be accessible at `http://localhost:3000`. To interact with the backend, ensure that the [backend project](https://github.com/tcivie/project_management_backend) is also set up and running.

## Sprint Management

We follow an Agile development process, utilizing Sprints to divide our work into manageable iterations. Each sprint will have a set of tasks that the team will work on. The tasks will be assigned to team members based on their expertise and availability.

## Linter and Syntax

This project uses a linter with Airbnb's syntax configuration. This helps maintain a consistent coding style throughout the project. The linter will check for syntax errors and enforce best practices in the code.

To run the linter manually, execute the following command:

```
npm init @eslint/config
```

## CI/CD Pipeline

Our CI/CD pipeline is set up using CircleCI. The pipeline is triggered upon every push to the repository. It includes the following stages:

1. Install npm packages
2. Run tests
3. Run linter
4. Build the project
5. CI Deployment (To Render hosting)

The live version of the frontend project is hosted at: https://project-management-frontend.onrender.com

You can find the configuration file for the CircleCI pipeline in the \`.circleci\` folder at the root of the repository.

## Backend Project

The frontend project interacts with a separate backend project built using Node.js (Express). You can find the backend project repository and its README file here: [Node.js (Express) backend](https://github.com/tcivie/project_management_backend)

## Contributors

Special thanks to the following contributors who have made this project possible:

- [![User1](https://github.com/adir395.png?size=50)](https://github.com/adir395) [User1](https://github.com/adir395)
- [![User2](https://github.com/barmor12.png?size=50)](https://github.com/barmor12) [User2](https://github.com/barmor12)
- [![User3](https://github.com/itayassor236.png?size=50)](https://github.com/itayassor236) [User3](https://github.com/itayassor236)
- [![User4](https://github.com/OmerAvis.png?size=50)](https://github.com/OmerAvis) [User4](https://github.com/OmerAvis)
- [![User5](https://github.com/tcivie.png?size=50)](https://github.com/tcivie) [User4](https://github.com/tcivie)
usernames of the project contributors.

If you have any questions, please
