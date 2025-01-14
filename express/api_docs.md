# Ticketing System API Documentation

## Database Structure

### Users
- `id` (ObjectId)
- `name` (String, required)
- `email` (String, required, unique)
- `password` (String, required)
- Timestamps: `created_at`, `updated_at`

### Companies
- `id` (ObjectId)
- `name` (String, required)
- `description` (String, required)
- `cif` (String, required)
- `slug` (String, unique, auto-generated)
- Timestamps: `created_at`, `updated_at`

### Company Users (Junction Table)
- `company_id` (ObjectId, ref: Companies)
- `user_id` (ObjectId, ref: Users)
- Timestamps: `created_at`, `updated_at`

### Events
- `id` (ObjectId)
- `name` (String, required)
- `description` (String, required)
- `start_at` (Date, required)
- `ends_at` (Date, required)
- `company_id` (ObjectId, ref: Companies)
- `booking_available` (Boolean, default: false)
- `max_tickets_for_order` (Number, required)
- `event_type` (String, required)
- `schedule` (String, required)
- `slug` (String, unique, auto-generated)
- `address` (String, required)
- Timestamps: `created_at`, `updated_at`

### Products
- `id` (ObjectId)
- `name` (String, required)
- `description` (String, required)
- `price` (Number, required)
- `event_id` (ObjectId, ref: Events)
- `max_sales` (Number, required)
- Timestamps: `created_at`, `updated_at`

### Orders
- `id` (ObjectId)
- `event_id` (ObjectId, ref: Events)
- `total_price` (Number, required)
- `total_items` (Number, required)
- `status` (String, required)
- Timestamps: `created_at`, `updated_at`

### Order Items
- `id` (ObjectId)
- `order_id` (ObjectId, ref: Orders)
- `name` (String, required)
- `email` (String, required)
- `type` (String, required)
- `identification_number` (String, required)
- `price` (Number, required)
- `redeemed_at` (Date)
- `qr` (String)
- Timestamps: `created_at`, `updated_at`

### Company Contacts
- `id` (ObjectId)
- `company_id` (ObjectId, ref: Companies)
- `name` (String, required)
- `type` (String, required)
- `value` (String, required)
- Timestamps: `created_at`, `updated_at`

### Activity Log
- `id` (ObjectId)
- `order_id` (ObjectId, ref: Orders)
- `message` (String, required)
- `event` (String, required)
- `properties` (String, required)
- Timestamps: `created_at`

## API Endpoints

### Authentication

I'll create a comprehensive documentation file that covers the database structure and API routes:

```markdown:DOCUMENTATION.md
# Ticketing System API Documentation

## Database Structure

### Users
- `id` (ObjectId)
- `name` (String, required)
- `email` (String, required, unique)
- `password` (String, required)
- Timestamps: `created_at`, `updated_at`

### Companies
- `id` (ObjectId)
- `name` (String, required)
- `description` (String, required)
- `cif` (String, required)
- `slug` (String, unique, auto-generated)
- Timestamps: `created_at`, `updated_at`

### Company Users (Junction Table)
- `company_id` (ObjectId, ref: Companies)
- `user_id` (ObjectId, ref: Users)
- Timestamps: `created_at`, `updated_at`

### Events
- `id` (ObjectId)
- `name` (String, required)
- `description` (String, required)
- `start_at` (Date, required)
- `ends_at` (Date, required)
- `company_id` (ObjectId, ref: Companies)
- `booking_available` (Boolean, default: false)
- `max_tickets_for_order` (Number, required)
- `event_type` (String, required)
- `schedule` (String, required)
- `slug` (String, unique, auto-generated)
- `address` (String, required)
- Timestamps: `created_at`, `updated_at`

### Products
- `id` (ObjectId)
- `name` (String, required)
- `description` (String, required)
- `price` (Number, required)
- `event_id` (ObjectId, ref: Events)
- `max_sales` (Number, required)
- Timestamps: `created_at`, `updated_at`

### Orders
- `id` (ObjectId)
- `event_id` (ObjectId, ref: Events)
- `total_price` (Number, required)
- `total_items` (Number, required)
- `status` (String, required)
- Timestamps: `created_at`, `updated_at`

### Order Items
- `id` (ObjectId)
- `order_id` (ObjectId, ref: Orders)
- `name` (String, required)
- `email` (String, required)
- `type` (String, required)
- `identification_number` (String, required)
- `price` (Number, required)
- `redeemed_at` (Date)
- `qr` (String)
- Timestamps: `created_at`, `updated_at`

### Company Contacts
- `id` (ObjectId)
- `company_id` (ObjectId, ref: Companies)
- `name` (String, required)
- `type` (String, required)
- `value` (String, required)
- Timestamps: `created_at`, `updated_at`

### Activity Log
- `id` (ObjectId)
- `order_id` (ObjectId, ref: Orders)
- `message` (String, required)
- `event` (String, required)
- `properties` (String, required)
- Timestamps: `created_at`

## API Endpoints

### Authentication
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "string",
  "email": "string",
  "password": "string",
  "company": {
    "name": "string",
    "description": "string",
    "cif": "string"
  }
}

POST /api/auth/login
Content-Type: application/json

{
  "email": "string",
  "password": "string"
}
```

### Companies
```http
GET /api/companies
GET /api/companies/:id
POST /api/companies
Content-Type: application/json

{
  "name": "string",
  "description": "string",
  "cif": "string"
}

PUT /api/companies/:id
Content-Type: application/json

{
  "name": "string",
  "description": "string",
  "cif": "string"
}

DELETE /api/companies/:id
```

### Events
```http
GET /api/events
Query params:
  - booking: "open" | "closed"
  - start_at: ISO date string

GET /api/events/:id
POST /api/events
Content-Type: application/json

{
  "name": "string",
  "description": "string",
  "start_at": "ISO date",
  "ends_at": "ISO date",
  "company_id": "ObjectId",
  "booking_available": boolean,
  "max_tickets_for_order": number,
  "event_type": "string",
  "schedule": "string",
  "address": "string"
}

PUT /api/events/:id
Content-Type: application/json

{
  "name": "string",
  "description": "string",
  "start_at": "ISO date",
  "ends_at": "ISO date",
  "booking_available": boolean,
  "max_tickets_for_order": number,
  "event_type": "string",
  "schedule": "string",
  "address": "string"
}

DELETE /api/events/:id
```

### Products
```http
GET /api/products
GET /api/products/:id
POST /api/products
Content-Type: application/json

{
  "name": "string",
  "description": "string",
  "price": number,
  "event_id": "ObjectId",
  "max_sales": number
}

PUT /api/products/:id
Content-Type: application/json

{
  "name": "string",
  "description": "string",
  "price": number,
  "max_sales": number
}

DELETE /api/products/:id
```

### Orders
```http
GET /api/orders
GET /api/orders/:id
POST /api/orders
Content-Type: application/json

{
  "event_id": "ObjectId",
  "items": [
    {
      "name": "string",
      "email": "string",
      "type": "string",
      "identification_number": "string"
    }
  ]
}

PUT /api/orders/:id
Content-Type: application/json

{
  "status": "string"
}

DELETE /api/orders/:id
```

## Response Formats

### Success Responses
- GET list: `200 OK` with array of items
- GET single: `200 OK` with single item
- POST: `201 Created` with created item
- PUT: `200 OK` with updated item
- DELETE: `204 No Content`

### Error Responses
```json
{
  "message": "Error description"
}
```

- `400 Bad Request`: Invalid input
- `401 Unauthorized`: Invalid credentials
- `403 Forbidden`: Insufficient permissions
- `404 Not Found`: Resource not found
- `500 Internal Server Error`: Server error
```

Would you like me to add any additional details or sections to the documentation?
