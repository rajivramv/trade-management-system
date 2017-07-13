# Trade management system (SaaS proof-of-concept)

### Requirements
- Multiple tenants
- Multiple users with different roles for each tenant
- Role based access control to different forms
- Javascript full stack

### Solution
- Single page applications using MEAN stack for different features _(backend mocked in the poc)_
- Best practices (client-side): Organization of files based on features, lazy loading of module components, client-side routing for bookmarking, familiar UI/UX
- Role based access control to static files resources _(provisioned, not implemented)_ and data from server

### In action
1. Visit https://tms-saas.herokuapp.com/
2. Use the following client login credentials

    - username: acme
    - password: acme
3. Use the following user login credentials

    - username: user
    - password: user
4. Select _Sales_ under **Roles** and _POS-orders_ under **Forms**    
4. Search for order numbers 0 and 1

### Deployment
1. Requisites: Node.js LTS, git
2. Clone, install and run.

- `git clone git@github.com:rajivramv/trade-management-system.git`
- `cd trade-management-system && npm install`
- `npm start`