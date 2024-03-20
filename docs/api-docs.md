#

This API provides endpoints for managing a library system, including operations related to books, borrowers, borrowing, and librarian functionalities.

## Version: 0.1.0

### Security

**apiKey**

| apiKey | _API Key_      |
| ------ | -------------- |
| Name   | authentication |
| In     | header         |

### /api/v1/books

#### GET

##### Summary:

Retrieve all books with optional pagination

##### Description:

This endpoint retrieves a list of all books available in the library system. Pagination support is provided for managing large collections of books.

##### Parameters

| Name  | Located in | Description | Required | Schema |
| ----- | ---------- | ----------- | -------- | ------ |
| limit | query      |             | No       | number |
| page  | query      |             | No       | number |

##### Responses

| Code | Description      | Schema |
| ---- | ---------------- | ------ |
| 200  | Default Response | object |
| 401  | Default Response | object |
| 500  | Default Response | object |

##### Security

| Security Schema | Scopes |
| --------------- | ------ |
| apiKey          |        |

#### POST

##### Summary:

Add a new book to the library

##### Description:

`**Only For Librarian**` This endpoint allows librarians to add a new book to the library system, providing all necessary details including title, author, ISBN, available quantity, and shelf location.

##### Parameters

| Name | Located in | Description | Required | Schema          |
| ---- | ---------- | ----------- | -------- | --------------- |
| body | body       |             | No       | [def-2](#def-2) |

##### Responses

| Code | Description      | Schema |
| ---- | ---------------- | ------ |
| 200  | Default Response | object |
| 401  | Default Response | object |
| 500  | Default Response | object |

##### Security

| Security Schema | Scopes |
| --------------- | ------ |
| apiKey          |        |

### /api/v1/books/{bookId}

#### GET

##### Summary:

Retrieve book details by ID

##### Description:

This endpoint retrieves detailed information about a specific book in the library system based on its unique identifier.

##### Parameters

| Name   | Located in | Description | Required | Schema        |
| ------ | ---------- | ----------- | -------- | ------------- |
| bookId | path       |             | Yes      | string (uuid) |

##### Responses

| Code | Description      | Schema |
| ---- | ---------------- | ------ |
| 200  | Default Response | object |
| 401  | Default Response | object |
| 500  | Default Response | object |

##### Security

| Security Schema | Scopes |
| --------------- | ------ |
| apiKey          |        |

#### PUT

##### Summary:

Update book details by ID

##### Description:

`**Only For Librarian**` This endpoint enables librarians to update the details of a book in the library system based on its unique identifier.

##### Parameters

| Name   | Located in | Description | Required | Schema          |
| ------ | ---------- | ----------- | -------- | --------------- |
| body   | body       |             | No       | [def-3](#def-3) |
| bookId | path       |             | Yes      | string (uuid)   |

##### Responses

| Code | Description      | Schema |
| ---- | ---------------- | ------ |
| 200  | Default Response | object |
| 401  | Default Response | object |
| 500  | Default Response | object |

##### Security

| Security Schema | Scopes |
| --------------- | ------ |
| apiKey          |        |

#### DELETE

##### Summary:

Delete a book by ID

##### Description:

`**Only For Librarian**` This endpoint allows librarians to permanently remove a book from the library system based on its unique identifier.

##### Parameters

| Name   | Located in | Description | Required | Schema        |
| ------ | ---------- | ----------- | -------- | ------------- |
| bookId | path       |             | Yes      | string (uuid) |

##### Responses

| Code | Description      | Schema |
| ---- | ---------------- | ------ |
| 200  | Default Response | object |
| 401  | Default Response | object |
| 500  | Default Response | object |

##### Security

| Security Schema | Scopes |
| --------------- | ------ |
| apiKey          |        |

### /api/v1/books/get-by-ISBN/{ISBN}

#### GET

##### Summary:

Retrieve book details by ISBN

##### Description:

This endpoint fetches detailed information about a book in the library system using its International Standard Book Number (ISBN).

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| ISBN | path       |             | Yes      | string |

##### Responses

| Code | Description      | Schema |
| ---- | ---------------- | ------ |
| 200  | Default Response | object |
| 401  | Default Response | object |
| 500  | Default Response | object |

##### Security

| Security Schema | Scopes |
| --------------- | ------ |
| apiKey          |        |

### /api/v1/books/get-by-title/{title}

#### GET

##### Summary:

Retrieve book details by title

##### Description:

This endpoint retrieves detailed information about books in the library system by matching or similar titles.

##### Parameters

| Name  | Located in | Description | Required | Schema |
| ----- | ---------- | ----------- | -------- | ------ |
| title | path       |             | Yes      | string |

##### Responses

| Code | Description      | Schema |
| ---- | ---------------- | ------ |
| 200  | Default Response | object |
| 401  | Default Response | object |
| 500  | Default Response | object |

##### Security

| Security Schema | Scopes |
| --------------- | ------ |
| apiKey          |        |

### /api/v1/books/get-by-author/{author}

#### GET

##### Summary:

Retrieve book details by author

##### Description:

This endpoint retrieves detailed information about books in the library system by matching or similar author names.

##### Parameters

| Name   | Located in | Description | Required | Schema |
| ------ | ---------- | ----------- | -------- | ------ |
| author | path       |             | Yes      | string |

##### Responses

| Code | Description      | Schema |
| ---- | ---------------- | ------ |
| 200  | Default Response | object |
| 401  | Default Response | object |
| 500  | Default Response | object |

##### Security

| Security Schema | Scopes |
| --------------- | ------ |
| apiKey          |        |

### /api/v1/borrowers

#### GET

##### Summary:

Retrieve all borrowers with optional pagination

##### Description:

`**Only For Librarian**` This endpoint retrieves a list of all registered borrowers in the system. Pagination support is available for managing large datasets.

##### Parameters

| Name  | Located in | Description | Required | Schema |
| ----- | ---------- | ----------- | -------- | ------ |
| limit | query      |             | No       | number |
| page  | query      |             | No       | number |

##### Responses

| Code | Description      | Schema |
| ---- | ---------------- | ------ |
| 200  | Default Response | object |
| 401  | Default Response | object |
| 500  | Default Response | object |

##### Security

| Security Schema | Scopes |
| --------------- | ------ |
| apiKey          |        |

#### POST

##### Summary:

Register a new borrower account

##### Description:

This endpoint allows a new user to register as a borrower in the system. Upon successful registration, the user gains access to the borrowing functionalities.

##### Parameters

| Name | Located in | Description | Required | Schema          |
| ---- | ---------- | ----------- | -------- | --------------- |
| body | body       |             | No       | [def-9](#def-9) |

##### Responses

| Code | Description      | Schema |
| ---- | ---------------- | ------ |
| 200  | Default Response | object |
| 401  | Default Response | object |
| 500  | Default Response | object |

##### Security

| Security Schema | Scopes |
| --------------- | ------ |
| apiKey          |        |

### /api/v1/borrowers/login

#### POST

##### Summary:

Login to access the system functionalities

##### Description:

This endpoint facilitates the login process for registered borrowers. Upon successful login, the system provides an authentication token for accessing the functionalities.

##### Parameters

| Name | Located in | Description | Required | Schema            |
| ---- | ---------- | ----------- | -------- | ----------------- |
| body | body       |             | No       | [def-10](#def-10) |

##### Responses

| Code | Description      | Schema |
| ---- | ---------------- | ------ |
| 200  | Default Response | object |
| 401  | Default Response | object |
| 500  | Default Response | object |

##### Security

| Security Schema | Scopes |
| --------------- | ------ |
| apiKey          |        |

### /api/v1/borrowers/change-email

#### PUT

##### Summary:

Change borrower email address

##### Description:

This endpoint allows a borrower to change their registered email address. The current password must be provided for authentication and security purposes.

##### Parameters

| Name | Located in | Description | Required | Schema            |
| ---- | ---------- | ----------- | -------- | ----------------- |
| body | body       |             | No       | [def-11](#def-11) |

##### Responses

| Code | Description      | Schema |
| ---- | ---------------- | ------ |
| 200  | Default Response | object |
| 401  | Default Response | object |
| 500  | Default Response | object |

##### Security

| Security Schema | Scopes |
| --------------- | ------ |
| apiKey          |        |

### /api/v1/borrowers/change-password

#### PUT

##### Summary:

Change borrower account password

##### Description:

This endpoint enables a borrower to update their account password. The current password is required for authentication, and the new password must meet the system's security criteria.

##### Parameters

| Name | Located in | Description | Required | Schema            |
| ---- | ---------- | ----------- | -------- | ----------------- |
| body | body       |             | No       | [def-12](#def-12) |

##### Responses

| Code | Description      | Schema |
| ---- | ---------------- | ------ |
| 200  | Default Response | object |
| 401  | Default Response | object |
| 500  | Default Response | object |

##### Security

| Security Schema | Scopes |
| --------------- | ------ |
| apiKey          |        |

### /api/v1/borrowers/delete-account

#### DELETE

##### Summary:

Delete borrower account

##### Description:

This endpoint permanently deletes a borrower's account from the system. To proceed, the borrower must provide their current password for authentication.

##### Parameters

| Name | Located in | Description | Required | Schema            |
| ---- | ---------- | ----------- | -------- | ----------------- |
| body | body       |             | No       | [def-13](#def-13) |

##### Responses

| Code | Description      | Schema |
| ---- | ---------------- | ------ |
| 200  | Default Response | object |
| 401  | Default Response | object |
| 500  | Default Response | object |

##### Security

| Security Schema | Scopes |
| --------------- | ------ |
| apiKey          |        |

### /api/v1/borrowings

#### GET

##### Summary:

Retrieve all borrowings with optional pagination

##### Description:

`**Only For Librarian**` This endpoint retrieves a list of all borrowings in the library system. Pagination support is provided for managing large collections of borrowings.

##### Parameters

| Name  | Located in | Description | Required | Schema |
| ----- | ---------- | ----------- | -------- | ------ |
| limit | query      |             | No       | number |
| page  | query      |             | No       | number |

##### Responses

| Code | Description      | Schema |
| ---- | ---------------- | ------ |
| 200  | Default Response | object |
| 401  | Default Response | object |
| 500  | Default Response | object |

##### Security

| Security Schema | Scopes |
| --------------- | ------ |
| apiKey          |        |

### /api/v1/borrowings/borrow-a-book

#### POST

##### Summary:

Borrow a book from the library

##### Description:

This endpoint allows users to borrow a book from the library by providing the book ID and the due date for return.

##### Parameters

| Name | Located in | Description | Required | Schema            |
| ---- | ---------- | ----------- | -------- | ----------------- |
| body | body       |             | No       | [def-15](#def-15) |

##### Responses

| Code | Description      | Schema |
| ---- | ---------------- | ------ |
| 200  | Default Response | object |
| 401  | Default Response | object |
| 500  | Default Response | object |

##### Security

| Security Schema | Scopes |
| --------------- | ------ |
| apiKey          |        |

### /api/v1/borrowings/return-book

#### POST

##### Summary:

Return a borrowed book to the library

##### Description:

This endpoint allows users to return a borrowed book to the library by providing the book ID.

##### Parameters

| Name | Located in | Description | Required | Schema            |
| ---- | ---------- | ----------- | -------- | ----------------- |
| body | body       |             | No       | [def-16](#def-16) |

##### Responses

| Code | Description      | Schema |
| ---- | ---------------- | ------ |
| 200  | Default Response | object |
| 401  | Default Response | object |
| 500  | Default Response | object |

##### Security

| Security Schema | Scopes |
| --------------- | ------ |
| apiKey          |        |

### /api/v1/borrowings/my-borrowings

#### GET

##### Summary:

Retrieve all borrowings by the authenticated user with optional pagination

##### Description:

This endpoint retrieves a list of all borrowings made by the authenticated user. Pagination support is provided for managing large collections of borrowings.

##### Parameters

| Name  | Located in | Description | Required | Schema |
| ----- | ---------- | ----------- | -------- | ------ |
| limit | query      |             | No       | number |
| page  | query      |             | No       | number |

##### Responses

| Code | Description      | Schema |
| ---- | ---------------- | ------ |
| 200  | Default Response | object |
| 401  | Default Response | object |
| 500  | Default Response | object |

##### Security

| Security Schema | Scopes |
| --------------- | ------ |
| apiKey          |        |

### /api/v1/borrowings/over-due-borrowings

#### GET

##### Summary:

Retrieve all overdue borrowings in the system with optional pagination

##### Description:

`**Only For Librarian**` This endpoint retrieves a list of all borrowings that are overdue in the library system. Pagination support is provided for managing large collections of overdue borrowings.

##### Parameters

| Name  | Located in | Description | Required | Schema |
| ----- | ---------- | ----------- | -------- | ------ |
| limit | query      |             | No       | number |
| page  | query      |             | No       | number |

##### Responses

| Code | Description      | Schema |
| ---- | ---------------- | ------ |
| 200  | Default Response | object |
| 401  | Default Response | object |
| 500  | Default Response | object |

##### Security

| Security Schema | Scopes |
| --------------- | ------ |
| apiKey          |        |

### /api/v1/borrowings/my-over-due-borrowings

#### GET

##### Summary:

Retrieve all overdue borrowings by the authenticated user with optional pagination

##### Description:

This endpoint retrieves a list of all borrowings that are overdue and made by the authenticated user. Pagination support is provided for managing large collections of overdue borrowings.

##### Parameters

| Name  | Located in | Description | Required | Schema |
| ----- | ---------- | ----------- | -------- | ------ |
| limit | query      |             | No       | number |
| page  | query      |             | No       | number |

##### Responses

| Code | Description      | Schema |
| ---- | ---------------- | ------ |
| 200  | Default Response | object |
| 401  | Default Response | object |
| 500  | Default Response | object |

##### Security

| Security Schema | Scopes |
| --------------- | ------ |
| apiKey          |        |

### /api/v1/borrowings/report-status

#### GET

##### Summary:

Export all borrowings Between Two Dates

##### Description:

`**Only For Librarian**` This endpoint exports a list of all borrowings Between Two Dates in the library system. It will return as csv string.

##### Parameters

| Name      | Located in | Description | Required | Schema   |
| --------- | ---------- | ----------- | -------- | -------- |
| startDate | query      |             | Yes      | dateTime |
| endDate   | query      |             | Yes      | dateTime |

##### Responses

| Code | Description      | Schema |
| ---- | ---------------- | ------ |
| 200  | Default Response | object |
| 401  | Default Response | object |
| 500  | Default Response | object |

##### Security

| Security Schema | Scopes |
| --------------- | ------ |
| apiKey          |        |

### /api/v1/borrowings/last-month-borrowing-processes

#### GET

##### Summary:

Export all last month borrowings

##### Description:

`**Only For Librarian**` This endpoint export a list of all borrowings happened last month in the library system. It will return as csv string.

##### Responses

| Code | Description      | Schema |
| ---- | ---------------- | ------ |
| 200  | Default Response | object |
| 401  | Default Response | object |
| 500  | Default Response | object |

##### Security

| Security Schema | Scopes |
| --------------- | ------ |
| apiKey          |        |

### /api/v1/borrowings/last-month-overdue-borrowing-processes

#### GET

##### Summary:

Export all last month overdue borrowings

##### Description:

`**Only For Librarian**` This endpoint export a list of all overdue borrowings happened last month in the library system. It will return as csv string.

##### Responses

| Code | Description      | Schema |
| ---- | ---------------- | ------ |
| 200  | Default Response | object |
| 401  | Default Response | object |
| 500  | Default Response | object |

##### Security

| Security Schema | Scopes |
| --------------- | ------ |
| apiKey          |        |

### /api/v1/librarians/login

#### POST

##### Summary:

Login to access the system functionalities

##### Description:

This endpoint facilitates the login process for registered Librarians. Upon successful login, the system provides an authentication token for accessing the functionalities.

##### Parameters

| Name | Located in | Description | Required | Schema            |
| ---- | ---------- | ----------- | -------- | ----------------- |
| body | body       |             | No       | [def-18](#def-18) |

##### Responses

| Code | Description      | Schema |
| ---- | ---------------- | ------ |
| 200  | Default Response | object |
| 401  | Default Response | object |
| 500  | Default Response | object |

##### Security

| Security Schema | Scopes |
| --------------- | ------ |
| apiKey          |        |

### /health

#### GET

##### Responses

| Code | Description      |
| ---- | ---------------- |
| 200  | Default Response |

### /{\*}

#### DELETE

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| \*   | path       |             | Yes      | string |

##### Responses

| Code | Description      |
| ---- | ---------------- |
| 200  | Default Response |

#### GET

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| \*   | path       |             | Yes      | string |

##### Responses

| Code | Description      |
| ---- | ---------------- |
| 200  | Default Response |

#### PATCH

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| \*   | path       |             | Yes      | string |

##### Responses

| Code | Description      |
| ---- | ---------------- |
| 200  | Default Response |

#### POST

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| \*   | path       |             | Yes      | string |

##### Responses

| Code | Description      |
| ---- | ---------------- |
| 200  | Default Response |

#### PUT

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| \*   | path       |             | Yes      | string |

##### Responses

| Code | Description      |
| ---- | ---------------- |
| 200  | Default Response |

#### OPTIONS

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| \*   | path       |             | Yes      | string |

##### Responses

| Code | Description      |
| ---- | ---------------- |
| 200  | Default Response |

### Models

#### def-0

| Name  | Type   | Description | Required |
| ----- | ------ | ----------- | -------- |
| limit | number |             | No       |
| page  | number |             | No       |

#### def-1

| Name              | Type          | Description | Required |
| ----------------- | ------------- | ----------- | -------- |
| id                | string (uuid) |             | No       |
| title             | string        |             | No       |
| author            | string        |             | No       |
| ISBN              | string        |             | No       |
| availableQuantity | number        |             | No       |
| shelfLocation     | string        |             | No       |

#### def-2

| Name              | Type   | Description | Required |
| ----------------- | ------ | ----------- | -------- |
| title             | string |             | Yes      |
| author            | string |             | Yes      |
| ISBN              | string |             | Yes      |
| availableQuantity | number |             | Yes      |
| shelfLocation     | string |             | Yes      |

#### def-3

| Name              | Type   | Description | Required |
| ----------------- | ------ | ----------- | -------- |
| title             | string |             | No       |
| author            | string |             | No       |
| ISBN              | string |             | No       |
| availableQuantity | number |             | No       |
| shelfLocation     | string |             | No       |

#### def-4

| Name   | Type          | Description | Required |
| ------ | ------------- | ----------- | -------- |
| bookId | string (uuid) |             | Yes      |

#### def-5

| Name | Type   | Description | Required |
| ---- | ------ | ----------- | -------- |
| ISBN | string |             | Yes      |

#### def-6

| Name  | Type   | Description | Required |
| ----- | ------ | ----------- | -------- |
| title | string |             | Yes      |

#### def-7

| Name   | Type   | Description | Required |
| ------ | ------ | ----------- | -------- |
| author | string |             | Yes      |

#### def-8

| Name             | Type           | Description | Required |
| ---------------- | -------------- | ----------- | -------- |
| id               | string (uuid)  |             | No       |
| name             | string         |             | No       |
| email            | string (email) |             | No       |
| registrationDate | dateTime       |             | No       |

#### def-9

| Name     | Type           | Description | Required |
| -------- | -------------- | ----------- | -------- |
| name     | string         |             | Yes      |
| email    | string (email) |             | Yes      |
| password | password       |             | Yes      |

#### def-10

| Name     | Type           | Description | Required |
| -------- | -------------- | ----------- | -------- |
| email    | string (email) |             | Yes      |
| password | password       |             | Yes      |

#### def-11

| Name            | Type           | Description | Required |
| --------------- | -------------- | ----------- | -------- |
| currentPassword | password       |             | Yes      |
| newEmail        | string (email) |             | Yes      |

#### def-12

| Name            | Type     | Description | Required |
| --------------- | -------- | ----------- | -------- |
| currentPassword | password |             | Yes      |
| newPassword     | password |             | Yes      |

#### def-13

| Name            | Type     | Description | Required |
| --------------- | -------- | ----------- | -------- |
| currentPassword | password |             | Yes      |

#### def-14

| Name         | Type     | Description | Required |
| ------------ | -------- | ----------- | -------- |
| checkoutDate | dateTime |             | Yes      |
| dueDate      | dateTime |             | Yes      |
| returnDate   | dateTime |             | No       |
| borrower     | object   |             | Yes      |
| book         | object   |             | Yes      |

#### def-15

| Name    | Type          | Description | Required |
| ------- | ------------- | ----------- | -------- |
| bookId  | string (uuid) |             | Yes      |
| dueDate | dateTime      |             | Yes      |

#### def-16

| Name   | Type          | Description | Required |
| ------ | ------------- | ----------- | -------- |
| bookId | string (uuid) |             | Yes      |

#### def-17

| Name         | Type     | Description | Required |
| ------------ | -------- | ----------- | -------- |
| checkoutDate | dateTime |             | Yes      |
| dueDate      | dateTime |             | Yes      |
| returnDate   | dateTime |             | No       |
| book         | object   |             | Yes      |

#### def-18

| Name     | Type           | Description | Required |
| -------- | -------------- | ----------- | -------- |
| email    | string (email) |             | Yes      |
| password | password       |             | Yes      |
