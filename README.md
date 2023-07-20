## Live Link: https://cow-hut-auth-hossain101199.vercel.app/

# **AUTH**

## Endpoint: POST https://cow-hut-auth-hossain101199.vercel.app/api/v1/auth/signup

**Description:** This endpoint is used to sign up and create a new user.

**Request Body:**

```json
{
  "password": "secure123",
  "role": "seller",
  "name": {
    "firstName": "David",
    "lastName": "Anderson"
  },
  "phoneNumber": "7776665555",
  "address": "456 Walnut St"
}
```

```json
{
  "password": "passpass",
  "role": "buyer",
  "name": {
    "firstName": "Jessica",
    "lastName": "Taylor"
  },
  "phoneNumber": "2223334444",
  "address": "789 Birch Rd",
  "budget": 5500
}
```

## Endpoint: POST https://cow-hut-auth-hossain101199.vercel.app/api/v1/auth/login

**Description:** This endpoint is used to sign in user.

**Request Body:**

```json
{
  "phoneNumber": "7776665555",
  "password": "secure123"
}
```

```json
{
  "phoneNumber": "2223334444",
  "password": "passpass"
}
```

**Response:** When the user logs in, they will receive an access token in the response, and a refresh token will be securely stored as a cookie.

```json
{
  "statusCode": 200,
  "success": true,
  "message": "User logging successfully!",
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YTI1ZGVkMzlmOWI4MjQ2Y2IzZmE0NyIsInJvbGUiOiJzZWxsZXIiLCJpYXQiOjE2ODgzNjI5ODUsImV4cCI6MTY4ODQ0OTM4NX0.4WvM045zmKC91nqmp0CgqwU9DBq88IgLGXtWzpXIEw4"
  }
}
```

## Endpoint: POST https://cow-hut-auth-hossain101199.vercel.app/api/v1/auth/refresh-token

**Description:** This endpoint is used to get a new access token.

# **ADMINS**

## Endpoint: POST https://cow-hut-auth-hossain101199.vercel.app/api/v1/admins/create-admin

**Description:** This endpoint is used to sign up and create a new admin.

**Request Body:**

```json
{
  "password": "G3c7b1s9A4j2P",
  "role": "admin",
  "name": {
    "firstName": "Emma",
    "lastName": "Jackson"
  },
  "phoneNumber": "0987654321",
  "address": "987 Elm St"
}
```

## Endpoint: POST https://cow-hut-auth-hossain101199.vercel.app/api/v1/admins/login

**Description:** This endpoint is used to sign in admin.

**Request Body:**

```json
{
  "phoneNumber": "0987654321",
  "password": "G3c7b1s9A4j2P"
}
```

**Response:** When the admin logs in, they will receive an access token in the response, and a refresh token will be securely stored as a cookie.

## Endpoint: GET https://cow-hut-auth-hossain101199.vercel.app/api/v1/admins/my-profile

**Description:** This endpoint allows the admin to fetch their own profile information.

**Headers:** `Authorization` : [access_token]

## Endpoint: PATCH https://cow-hut-auth-hossain101199.vercel.app/api/v1/admins/my-profile

**Description:** This endpoint allows the admin to modify their own profile information.

**Headers:** `Authorization` : [access_token]

**Request Body:**

```json
{
  "name": {
    "firstName": "modified David"
  }
}
```

# **USERS**

## Endpoint: GET https://cow-hut-auth-hossain101199.vercel.app/api/v1/users/my-profile

**Description:** This endpoint allows the user to fetch their own profile information.

**Headers:** `Authorization` : [access_token]

## Endpoint: PATCH https://cow-hut-auth-hossain101199.vercel.app/api/v1/users/my-profile

**Description:** This endpoint allows the user to modify their own profile information.

**Headers:** `Authorization` : [access_token]

**Request Body:**

```json
{
  "name": {
    "firstName": "Jackson",
    "lastName": "Emma"
  }
}
```

## Endpoint: GET https://cow-hut-auth-hossain101199.vercel.app/api/v1/users

**Description:** This endpoint is used to retrieve a list of users.

**Access:** This endpoint is restricted to administrators only.

**Headers:** `Authorization` : [access_token]

**Query Parameters:**

- `searchTerm` : A search term to filter users based on certain fields.
- `role` : Filter users by role.
- `name.firstName` : Filter users by first name.
- `name.lastName` : Filter users by last name.
- `phoneNumber` : Filter users by phone number.
- `address` : Filter users by address.
- `page` : The page number for pagination. Default is 1.
- `limit` : The number of users to return per page. Default is 10.
- `sortBy` : The field to sort the users by.
- `sortOrder` : The sort order for the users. Valid values are "asc" for ascending and "desc" for descending.

**Example Request:**

- Endpoint: GET https://cow-hut-auth-hossain101199.vercel.app/api/v1/users?role=seller
- Endpoint: GET https://cow-hut-auth-hossain101199.vercel.app/api/v1//users?searchTerm=john
- Endpoint: GET https://cow-hut-auth-hossain101199.vercel.app/api/v1/users?page=1&limit=9&sortBy=name.firstName&sortOrder=asc
- Endpoint: GET https://cow-hut-auth-hossain101199.vercel.app/api/v1/users?role=buyer&limit=20&page=2&sortBy=name.firstName&sortOrder=asc

## Endpoint: GET https://cow-hut-auth-hossain101199.vercel.app/api/v1/users/:id

**Description:** This endpoint is used to retrieve a single user by their ID.

**Access:** This endpoint is restricted to administrators only.

**Headers:** `Authorization` : [access_token]

**Example Request:**

- Endpoint: GET https://cow-hut-auth-hossain101199.vercel.app/api/v1/users/64a2d72b97e4125207801e05
- Endpoint: GET https://cow-hut-auth-hossain101199.vercel.app/api/v1//users/64a2d74097e4125207801e07

## Endpoint: PATCH https://cow-hut-auth-hossain101199.vercel.app/api/v1/users/:id

**Description:** This endpoint is used to update a user by their ID.

**Access:** This endpoint is restricted to administrators only.

**Headers:** `Authorization` : [access_token]

**Example Request:**

- Endpoint: GET https://cow-hut-auth-hossain101199.vercel.app/api/v1/users/64a2d74097e4125207801e07
- Endpoint: GET https://cow-hut-auth-hossain101199.vercel.app/api/v1//users/64a2d72b97e4125207801e05

**Request Body:**

```json
{
  "budget": 5000
}
```

## Endpoint: DELETE https://cow-hut-auth-hossain101199.vercel.app/api/v1/users/:id

**Description:** This endpoint is used to delete a user by their ID.

**Access:** This endpoint is restricted to administrators only.

**Headers:** `Authorization` : [access_token]

**Example Request:**

- Endpoint: GET https://cow-hut-auth-hossain101199.vercel.app/api/v1/users/64a2d72b97e4125207801e05
- Endpoint: GET https://cow-hut-auth-hossain101199.vercel.app/api/v1//users/64a2d74097e4125207801e07

# **COWS**

## Endpoint: POST https://cow-hut-auth-hossain101199.vercel.app/api/v1/cows

**Description:** This endpoint is used to create a new cow.

**Access:** This endpoint is restricted to sellers only.

**Headers:** `Authorization` : [access_token]

**Request Body:**

```json
{
  "name": "Cow10",
  "age": 3,
  "price": 530,
  "location": "Chattogram",
  "breed": "Ayrshire",
  "weight": 500,
  "label": "sold out",
  "category": "Dairy"
}
```

## Endpoint: GET https://cow-hut-auth-hossain101199.vercel.app/api/v1/cows

**Description:** This endpoint is used to retrieve a list of cows based on specified filters and pagination options.

**Access:** This endpoint is accessible to all users, including admins, buyers, and sellers.

**Headers:** `Authorization` : [access_token]

**Query Parameters:**

- `searchTerm` : Search term to filter cows by specific fields.
- `location` : Filter cows by location.
- `minPrice` : Filter cows by minimum price.
- `maxPrice` : Filter cows by maximum price.
- `label` : Filter cows by label.
- `page` : Page number for pagination.
- `limit` : Number of results to include per page.
- `sortBy` : Field to sort the results by.
- `sortOrder` : Sort order for the results (asc for ascending, desc for descending).

**Example Request:**

- Endpoint: GET https://cow-hut-auth-hossain101199.vercel.app/api/v1/cows?location=Rangpur
- Endpoint: GET https://cow-hut-auth-hossain101199.vercel.app/api/v1//cows?searchTerm=Dairy
- Endpoint: GET https://cow-hut-auth-hossain101199.vercel.app/api/v1/cows?minPrice=1000&maxPrice=2000
- Endpoint: GET https://cow-hut-auth-hossain101199.vercel.app/api/v1/cows?page=1&limit=11&sortBy=price&sortOrder=desc

---

## Endpoint: GET https://cow-hut-auth-hossain101199.vercel.app/api/v1/cows/:id

**Description:** This endpoint is used to retrieve a single cow by their ID.

**Access:** This endpoint is accessible to all users, including admins, buyers, and sellers.

**Headers:** `Authorization` : [access_token]

**Example Request:**

- Endpoint: GET https://cow-hut-auth-hossain101199.vercel.app/api/v1/cows/64a2d81497e4125207801e11
- Endpoint: GET https://cow-hut-auth-hossain101199.vercel.app/api/v1//cows/64a2f259f49cd33c1636b8c2

## Endpoint: PATCH https://cow-hut-auth-hossain101199.vercel.app/api/v1/cows/:id

**Description:** This endpoint is used to update a cow by their ID.

**Access:** This endpoint is restricted to cow sellers only.

**Headers:** `Authorization` : [access_token]

**Example Request:**

- Endpoint: GET https://cow-hut-auth-hossain101199.vercel.app/api/v1/cows/64a2d81497e4125207801e11
- Endpoint: GET https://cow-hut-auth-hossain101199.vercel.app/api/v1//cows/64a2f259f49cd33c1636b8c2

**Request Body:**

```
{
  "price": 1800,
}
```

```
{
  "age": 20,
}
```

## Endpoint: DELETE https://cow-hut-auth-hossain101199.vercel.app/api/v1/cows/:id

**Description:** This endpoint is used to delete a cow by their ID.

**Access:** This endpoint is restricted to cow sellers only.

**Headers:** `Authorization` : [access_token]

**Example Request:**

- Endpoint: GET https://cow-hut-auth-hossain101199.vercel.app/api/v1/cows/64a2d81497e4125207801e11
- Endpoint: GET https://cow-hut-auth-hossain101199.vercel.app/api/v1//cows/64a2f259f49cd33c1636b8c2
- Endpoint: GET https://cow-hut-auth-hossain101199.vercel.app/api/v1//cows/64a2f26cf49cd33c1636b8c5

# **ORDERS**

## Endpoint: POST https://cow-hut-auth-hossain101199.vercel.app/api/v1/orders

**Description:** This endpoint is used to create an order.

**Access:** This endpoint is restricted to buyers only.

**Headers:** `Authorization` : [access_token]

**Request Body:**

```
{
    "cow": "648e2889c0c0f820ca1307c4",
}
```

- `cow` : The ID of the cow being purchased.

## Endpoint: GET https://cow-hut-auth-hossain101199.vercel.app/api/v1/orders

**Description:** This endpoint is used to retrieve a list of orders.

**Access:**

- Admin: Admin users can access this endpoint to retrieve all orders across the platform.
- Buyer: Buyers can access this endpoint to retrieve their own orders.
- Seller: Sellers can access this endpoint to retrieve orders associated with their account.

**Headers:** `Authorization` : [access_token]

**Example Request:**

- Endpoint: GET https://cow-hut-auth-hossain101199.vercel.app/api/v1/orders

## Endpoint: GET https://cow-hut-auth-hossain101199.vercel.app/api/v1/orders/:id

**Description:** This endpoint is used to retrieve a specific order based on its ID.

**Access:**

- Admin: Admin can access this endpoint to retrieve any order, regardless of the associated buyer or seller.
- Seller: Sellers can access this endpoint to retrieve orders associated with their account.
- Buyer: Buyers can access this endpoint to retrieve their own orders.

**Headers:** `Authorization` : [access_token]

**Example Request:**

- Endpoint: GET https://cow-hut-auth-hossain101199.vercel.app/api/v1/orders/64a2fb42a5b37c199c5ccfe5
