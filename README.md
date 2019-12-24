# node-metrics

///tags

Web API project to work on metrics

## Features

  * Authentication
  * CRUD users
  * CRUD metrics

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

To build and run this app locally you will need Node.js

### Quick start

Clone the repository
```bash
git clone https://github.com/adritoo/node-metrics.git
cd node-metrics
```

Install dependencies
```bash
npm install
```

Populate database
```bash
npm run pop
```

Build and run the project
```bash
npm run build
npm start
```

Finally, navigate to `http://localhost:8081` and you should see the project being served and rendered locally.

### Run in Docker

This app can also be launched in a Docker container. Go to the directory that has your Dockerfile and run the following command to build the Docker image.
```bash
docker build -t node-metrics .
```

Running your image with -d runs the container in detached mode, leaving the container running in the background. The -p flag redirects a public port to a private port inside the container. Run the image you previously built:
```bash
docker run -p 8080:8080 -d node-metrics
```

Now open `http://localhost:8081` and you should see the app running locally.


## Built With

* [Express](https://expressjs.com/) - Fast, unopinionated, minimalist web framework for Node.js
* [EJS](https://ejs.co/) - Embedded JavaScript templating
* [Level](https://github.com/Level/level) - Fast & simple storage

## Authors

* [**Camille MARINI**](https://github.com/CarmeloMarini)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## Routes


| Method | Route | Description |
| - | - | - |
| GET | / | Website's main page |
| GET | /user.json | Display users in JSON format |
| GET | /home | Account's homepage |
| POST | /metrics | Save a Metric |
| GET | /metrics | Gets All metrics by users |
| GET | /metrics/:tag | Target a single metric with its tag |
| DELETE | /metrics/delete/:username/:tag | delete a metric |
| GET | /metrics.json | Gets All metrics by users - JSON format |
| GET | /login | Renders the login page |
| POST | /login | Sends Autentification |
| GET | /signup | Updates an existing metric |
| POST | /signup | Sends the form to save new user |
| GET | /logout | Logout - Back to the mainpage |
