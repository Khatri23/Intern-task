# Task-1: Koa + TypeORM + PostgreSQL API

A simple backend API built using **Koa**, **Koa Router**, **TypeORM**, and **PostgreSQL**.

The purpose of this task is to initialize a Koa-based project, connect it to a local PostgreSQL database through TypeORM, define related entities, implement product GET APIs, and provide centralized error handling.

## Requirements

The following environment and tools should already be installed:

* Node.js
* PostgreSQL
* npm

## Technologies

* **Koa** — HTTP server framework
* **Koa Router** — Route management
* **dotenv** — Environment variable management
* **TypeORM** — Object-relational mapping
* **PostgreSQL** — Relational database
* **pg** — PostgreSQL driver for Node.js

## Installation

Initialize the project and install the required dependencies:

```bash
npm install koa
npm install koa-router
npm install dotenv
npm install typeorm
npm install pg
```

## Project Structure

```text
project/
│
├── .env
├── app.js
├── server.js
│
├── Entity/
│   ├── Products.js
│   └── Categories.js
│
├── Controller/
│   ├── get_product.js
|   └── error.js
│
└── routes/
    └── product-get.js
```

## Environment Configuration

Database configuration is stored in the `.env` file rather than being hardcoded into the application.
The database connection is configured in `server.js` using these environment variables.

## Database

PostgreSQL is used as the application's relational database.

TypeORM's `DataSource` is responsible for establishing the connection between the application and PostgreSQL.

The database configuration is loaded from the `.env` file.

Conceptually:

```text
Koa Application
       │
       ▼
   TypeORM
       │
       ▼
 PostgreSQL
```

## Entities

Entity schemas are defined inside the `Entity` directory.

### Product

The `Products.js` entity represents a product and contains:

| Field         | Description         |
| ------------- | ------------------- |
| `name`        | Product name        |
| `description` | Product description |
| `price`       | Product price       |
| `stock`       | Available stock     |
| `imageUrl`    | Product image URL   |

### Category

The `Categories.js` entity represents a product category.

| Field  | Description   |
| ------ | ------------- |
| `name` | Category name |

### Relationship

A **many-to-one** relationship exists between Product and Category.

```text
Category
   │
   │ 1
   │
   │
   │ *
Product
```

In other words:

> One category can contain many products, while each product belongs to one category.

The relationship is represented through TypeORM's `EntitySchema`.

### Users

The `Users.js` entity defines the users as

| Field         | Description         |
| ------------- | ------------------- |
| `email`       | User email id       |
| `password`    | bcrypt of user's password |
| `name`        | User's name         |
| `role`        | customer | admin    |

## Controllers

The `Controller` directory contains the application's business/route logic.

The product controller handles the logic required by the product GET endpoints.

It is responsible for interacting with the TypeORM repository and returning the appropriate response.

## Services

The `Services` directory contains the database logic.

The product services handles the database query for products.

The user services handles the database query for the Users.

## Routes

The `routes` directory contains the API route declarations.

The `product-get.js` file defines the following endpoints:

### Get all products

```http
GET /products
```

Returns the available products.

### Get a product by ID

```http
GET /products/:id
```

Returns a specific product based on its ID.

The users.js file defines the endpoints:

```http
POST /api/auth/register

GET /api/users/all

POST /api/auth/login

GET /api/users/me

PUT /api/users/me
```

## Error Handling

The application uses **centralized error-handling middleware**.

Instead of handling errors independently inside every route, errors are passed to the centralized middleware, which produces a consistent JSON response.

This keeps the API response format predictable.

Example response shape:

```json
{
    "status": status_code ,
    "message": "Product not found",
    "details": []
}
```

Successful responses follow the same general principle of maintaining a consistent JSON structure.

## Application Startup

`app.js` acts as the entry point of the application.

It is responsible for:

* Creating the Koa application
* Registering middleware
* Registering routes
* Registering centralized error handling
* Starting the HTTP server

`server.js` handles the database connection and initializes the TypeORM `DataSource`.

The overall application flow is:

```text
                app.js
                  │
                  ▼
             Koa Application
                  │
          ┌───────┴────────┐
          ▼                ▼
       Middleware        Routes
                            │
                            ▼
                       Controller
                            │
                            ▼
                         Services
                            │
                            ▼
                          TypeORM
                            │
                            ▼
                       PostgreSQL
```

## Summary

This task demonstrates a basic backend architecture using Koa and TypeORM.

The application provides:

* Koa HTTP server
* Koa Router
* Environment-based configuration using dotenv
* PostgreSQL database connection
* TypeORM `DataSource`
* Product and Category entities
* Product → Category many-to-one relationship
* `GET /products`
* `GET /products/:id`
* Users -> registration, login and update
* Centralized error handling
* Consistent JSON API responses