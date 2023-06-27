# General Information

It's a simple SPA react application for display users as a table. All data comes from `https://jsonplaceholder.typicode.com/users`.

Project generated using `Vite`.

According of requirements for the table I've decided to pick a `DataTable` library, because it contains almost everything under the hood and also have an ability to extend basic functionality by custom implementation. The list of requirements for the table:
 * filter by `username` and `email`
 * select multiple rows
 * delete selected multiple rows
 * add new user
 * sorting by `asc` or `desc`
 * pagination
 * display custom number of rows per page
 * etc.

## Instalation

```
npm i
```

### Run

```
npm run dev
```