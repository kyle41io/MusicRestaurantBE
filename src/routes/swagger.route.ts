import swaggerUI from 'swagger-ui-express'
import swaggerJSDoc from "swagger-jsdoc";
import express, {Request, Response} from "express";
import fs from 'fs';
import path from 'path'

export const SwaggerRoute = express();

const options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "Music backend",
			version: "1.0.0",
			description: "A simple Express Music backend Typescript",
		},
	},
	apis: [path.join(__dirname,"../../paths.yml"),path.join(__dirname,"../../components.yml")],
	// apis: ["./src/config/swagger/*/index.ts"],
};
const specs = swaggerJSDoc(options);

// SwaggerRoute.get("/docs/",swaggerUI.serve,swaggerUI.setup(specs))
SwaggerRoute.use('/api-docs', (req : Request, res : Response, next : any) => {
    if (req.originalUrl == "/api-docs") return res.redirect('api-docs/')
    next()
}, swaggerUI.serve, swaggerUI.setup(specs));
