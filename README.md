# Story/Ticket App using React.js

## Login Page
- Login as normal user or admin using TOGGLE BUTTON

## Dashboard Page

### Normal users
```
- Post a new ticket through a form
- New ticket will have PENDING status
- View all the tickets in a table
- Three different ways to sort the data: By ID, By TYPE, or By COMPLEXITY
```

### ADMIN dashboards
```
- Admin can post a ticket by a form
- View all tickets in a table with ACTION COLUMN
- Review system: ACCEPT -> ticket will turn GREEN
                 REJECT -> ticket will turn RED
```

## Others
```
- Front end only projects
- Have to pass data to cookies in order to persist states, can be prevent by calling directly from server
- Every axios request can be authenticated server sided using JWT and {withCredentials: true}
- Included a test story objects for testing UI & Functionalities
```