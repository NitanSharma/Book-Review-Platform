# Book-Review-Platform

A full-stack book review platform where users can browse books, read and write reviews, and rate books. Built with React frontend and Node.js/Express backend using MongoDB.

# 📚 Book Review API Documentation

## Base URL
```
http://localhost:5000
```

## Authentication
Most endpoints require authentication using JWT tokens. Include the token in a cookie that will be automatically sent with requests.

## API Routes

### Books

#### Get All Books
- **URL**: `/books`
- **Method**: `GET`
- **Auth**: Not required
- **Description**: Retrieve all books with pagination
- **Query Parameters**:
  - `page`: Page number (optional)
  - `limit`: Items per page (optional)

#### Get Book by ID
- **URL**: `/books/:id`
- **Method**: `GET`
- **Auth**: Not required
- **Description**: Retrieve a specific book by its ID
- **URL Parameters**:
  - `id`: Book ID

#### Add New Book
- **URL**: `/books`
- **Method**: `POST`
- **Auth**: Required (Admin only)
- **Description**: Add a new book to the platform
- **Request Body**:
  ```json
  {
    "title": "string",
    "author": "string",
    "description": "string",
    "genre": "string"
  }
  ```

### Reviews

#### Get Reviews
- **URL**: `/reviews`
- **Method**: `GET`
- **Auth**: Not required
- **Description**: Retrieve reviews for a specific book
- **Query Parameters**:
  - `bookId`: ID of the book (optional)

#### Create Review
- **URL**: `/reviews/:bookId`
- **Method**: `POST`
- **Auth**: Required
- **Description**: Submit a new review for a book
- **URL Parameters**:
  - `bookId`: Book ID
- **Request Body**:
  ```json
  {
    "rating": "number",
    "comment": "string"
  }
  ```

### Users

#### Get User Profile
- **URL**: `/users/profile`
- **Method**: `GET`
- **Auth**: Required
- **Description**: Retrieve the current user's profile

#### Update User Profile
- **URL**: `/users/:id`
- **Method**: `PUT`
- **Auth**: Required
- **Description**: Update user profile information
- **URL Parameters**:
  - `id`: User ID
- **Request Body**:
  ```json
  {
    "name": "string",
    "email": "string"
  }
  ```

#### Register User
- **URL**: `/users/register`
- **Method**: `POST`
- **Auth**: Not required
- **Description**: Register a new user
- **Request Body**:
  ```json
  {
    "name": "string",
    "email": "string",
    "password": "string"
  }
  ```

#### Login User
- **URL**: `/users/login`
- **Method**: `POST`
- **Auth**: Not required
- **Description**: Login a user
- **Request Body**:
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```

#### Logout User
- **URL**: `/users/logout`
- **Method**: `GET`
- **Auth**: Required
- **Description**: Logout the current user

