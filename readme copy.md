### Development and start up

- Run local development with hot reload: NPM run dev
- Compile/Check: Npm run build
- Start the compiled file: NPM run start

### Run docker(make it with JWT, dont need refresh token for now)

- npm run build: to compile before "sudo docker-compose up --build"
- docker-compose up: Start both the app and postgres
- docker-compose down

### Access backend

- Fetch to URL 192.168.1.123:3000

### Start the App

- NPM run build to compile Typescript to Javascript
- sudo docker compose up --build
- Go to development /3000/api-docs for the swagger docs with JsDocs
- [Online docs in swaggerhub - copy the Js Swagger docs, with example in swagger being deprecated](https://app.swaggerhub.com/apis/LETHANHDAT1993/Musicbackend/1.0.0)
