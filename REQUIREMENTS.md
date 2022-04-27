# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index: '/products' [GET]
- Show: '/products/:id' [GET]
- Create [token required]: '/products' [POST]
- [ADDITIONAL] Update [token required]: '/products/:id' [PUT]
- [ADDITIONAL] Delete [token required]: '/products/:id' [DELETE]
- [OPTIONAL] Top 5 most popular products 
- [OPTIONAL] Products by category (args: product category)

#### Users
- Index [token required]: '/users' [GET]
- Show: '/login' [POST]
- Create: '/signup' [POST]
- [ADDITIONAL] Update [token required]: '/users/:id' [PUT]
- [ADDITIONAL] Delete [token required]: '/users/:id' [DELETE]

#### Orders
- Current Order by user (args: user id)[token required]: '/:userId/orders' [GET]
- [ADDITIONAL] Create [token required]: '/:userId/orders' [POST]
- [ADDITIONAL] Update [token required]: '/:userId/orders/orderId' [PUT]
- [ADDITIONAL] Delete [token required]: '/:userId/orders/:orderId' [DELETE]
- [OPTIONAL] Completed Orders by user (args: user id)[token required]

## Data Shapes
#### Product
-  id: number
- name: string
- price: number
- [OPTIONAL] category: string

#### User
- id: number
- firstName: string
- lastName: string
- password: string

#### Orders
- id: number
- id of each product in the order: number[]
- quantity of each product in the order: number[]
- user_id: number
- status of order (active or complete): "active" | "complete"

## Database schema
#### Users Table

|   Column  |           Type           |
|:---------:|:------------------------:|
| id        | integer                  |
| username  | character variable (100) |
| firstname | character variable (100) |
| lastname  | character variable (100) |
| password  | character variable (255) |

#### Products Table

|  Column  |           Type           |
|:--------:|:------------------------:|
| id       | integer                  |
| name     | character variable (255) |
| price    | integer                  |
| category | character variable (100) |

#### Orders Table

|  Column  |           Type           |
|:--------:|:------------------------:|
| id       | integer                  |
| status   | character variable (10)  |
| user_id  | bigint                   |

#### Order_Products Table

|   Column   |   Type  |
|:----------:|:-------:|
| id         | integer |
| order_id   | bigint  |
| product_id | bigint  |
| quantity   | integer |
