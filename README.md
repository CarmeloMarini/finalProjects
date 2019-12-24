# node-metrics
Web API project to work on metrics
# badges
[![Build Status](https://travis-ci.com/CarmeloMarini/finalProjects.svg?branch=master)](https://travis-ci.com/CarmeloMarini/finalProjects) 
[![HitCount](http://hits.dwyl.io/CarmeloMarini/finalProjects.svg)](http://hits.dwyl.io/CarmeloMarini/finalProjects)

# Important remark
- Being a beginner in these languages, I chose to do the project alone for a better learn of JavaScript : that's why the code is not optimized or why some features are missing. 
- I was also penalized by a great lack of documentation about level.db on the web.
- On the other hand, the work was done without any external help. Therefore I appeal to your indulgence for the correction.
- the tests commented runs with "npm run test" if uncommented, but not with travis...

# DevOps features 
- Tags 
- Mocha+Chai Testing 
- Travis hypervisor
- Branches : Dev & master , checkout can also check the versions 

## Features 

  * Authentication
  * CRUD users
  * CRUD metrics

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

To build and run this app locally you will need Node.js (eventually docker)

### Quick start

Clone the repository
```console
git clone https://github.com/CarmeloMarini/finalProjects.git
```

Install dependencies
```console
npm install
```

Populate database
```console
npm run populate
```

You will have the following values in your database  :

- for the users :

| username | email | password |
| - | - | - |
| Alfred | Alfred@gmail.com | Apwd |
| Ming | Ming@gmail.com | Mpwd |
| Jhon | Jhon@gmail.com | Jpwd |
| Edgar | Edgar@gmail.com | Epwd |


- for the metrics :

| username | tag | value |
| - | - | - |
| Alfred | testAlfred1 | 1 |
| Alfred | testAlfred2 | 2 |
| Ming | testMing1 | 1 |
| Ming | testMing2 | 2 |
| Jhon | testJhon1 | 1 |
| Jhon | testJhon2 | 2 |
| Edgar | testEdgar1 | 1 |
| Edgar | testEdgar2 | 2 |

Build and run the project
```console
npm run build
npm start
```

You can also use dev mode :
```console
npm run dev
```

Finally, navigate On `http://localhost:8081` 

## Routes

| Method | Route | Description |
| - | - | - |
| GET | / | Website's main page |
| GET | /home | Account's homepage |
| GET | /signup | Renders the register form |
| POST | /signup | Sends the form to save new user |
| GET | /login | Renders the login page |
| POST | /login | Sends Autentification |
| GET | /logout | Logout - Back to the mainpage |
| POST | /metrics | Save a Metric |
| GET | /metrics | Gets All metrics by users |
| GET | /metrics/:tag | Target a single metric with its tag (only on postman/hand-written URL !) |
| DELETE | /metrics/delete/:username/:tag | delete a metric (only on postman !)|
| GET | /user.json | Display users in JSON format |
| GET | /metrics.json | Gets All metrics by users - JSON format |




### Run in Docker

To build the Docker image :
```console
docker build -t node-metrics .
```

Run the image you previously built:
```console
docker run -p 8081:8081 -d node-metrics
```

Open `http://localhost:8081` 





## Built With

* [Express](https://expressjs.com/) - Fast, unopinionated, minimalist web framework for Node.js
* [EJS](https://ejs.co/) - Embedded JavaScript templating
* [Level](https://github.com/Level/level) - Fast & simple storage

## Authors

* [**Camille MARINI**](https://github.com/CarmeloMarini)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details


