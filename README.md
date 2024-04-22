# Payment Service Provider Simplified API

## Configuration, Install dependencies and Database

- Install Node.js v20.11.1;  
- Run the following commands:  
- `cp .env.example .env`  
- `mkdir data`  
- `sudo chmod -R 777 data`  
- `yarn install`  
- `docker-compose -f docker-compose.yml down`  
- `docker-compose -f docker-compose.yml up -d`  
- `yarn dev`  


### Postman Collections

You can import this file `psp-simplified-api.postman_collection.json` in your Postman or Insomnia to test all avaible endpoints.


### Database migrations?

- Create a new migration: `npx typeorm migration:create -n AlterTableNameColumnDescription`
- Add the new migration created in this file `src/core/db/migrations/index.ts`.


## Commit Guidelines

Before every commit you need to run the following command: `yarn lint:fix`. Just after fix the files with Lint, then commit and push.


## Folders Structure

The folder structure must follow the pattern:  
```
--- src
------ modules
--------- transation // DTOs, Use Cases and Controller from Transaction
--------- index.ts // The main controller. We need to import all controllers here
```

## About the Challenge

A PSP basically consists of two essential functions:

- Allow our customers to process transactions ("cash-in");  
- Transfer receivables to our customers ("cash-out");  

The operations basically consist of: allowing our customers to receive payment for the products or services provided and allowing them to receive the amount after a certain time, which changes according to the payment method.

Considering the information above, we have two entities that represent them:
- `transactions`: purchase information, buyer data, payment method, value, etc.  
- `payables`: receivables that will be paid to the customer.

For this challenge we will focus especially on the first specified function, "cash-in", at this time we will not consider the possibility of multiple clients, which would bring greater complexity to this challenge, which is not our objective.


## Next features

- Authentication and authorization, with JWT or Keycloak. The Keycloak options its better if you need to integrate SSO.  
- A new Entity call Clients, to manage clients and dont save this informations in Transaction.  
- Remove fees values from env variables, create a entity for this feature.  
- Unit tests.