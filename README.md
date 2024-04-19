# Payment Service Provider Simplified API

#### Configuration, Install dependencies and Database

- Install Node.js v20.11.1;  
- Run the following commands:  
- `cp .env.example .env`  
- `mkdir data`  
- `sudo chmod -R 777 data`  
- `yarn install`  
- `docker-compose -f docker-compose.yml down`  
- `docker-compose -f docker-compose.yml up -d`  
- `yarn dev`  


#### Database migrations?

- Create a new migration: `npx typeorm migration:create -n AlterTableNameColumnDescription`
- Add the new migration created in this file `src/core/db/migrations/index.ts`.


### Commit Guidelines

Before every commit you need to run the following command: `yarn lint:fix`. Just after fix the files with Lint, then commit and push.


### Folders Structure

The folder structure must follow the pattern:  
```
--- src
------ modules
--------- user // DTOs, Use Cases and Controller from User
--------- index.ts // The main controller. We need to import all controllers here
```


### notes

- anotar sobre arquitetura
- fazer mer no draw.io e colar aqui
- explicar stack
- explicar problema e solução
- apresentar pontos de melhoria na arquitetura
- apresentar propostas de novas features ou tech 
  - keycloak como exemplo
- tests com jest

- exportar collection e env no postman e explicar aqui