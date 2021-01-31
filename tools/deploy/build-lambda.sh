#!/bin/bash

npm run nx run api:build-lambda --prod
rm -rf node_modules/*
npm install -only=production
zip -rq lambda.zip ./dist ./node_modules package.json
npm ci
