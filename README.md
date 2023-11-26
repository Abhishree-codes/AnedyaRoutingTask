# AnedyaRoutingTask

# Description

This is a react application that implements private routing and redirects user to the Login page if they are not authenticated. I've implemented it so the user is directed back to whatever page they were on before logging in (either after being redirected from a protected route, or choosing to login themselves through the navbar login button).

The implementation also ensures that clicking the back button post-login returns users to the page they were on before accessing the login route. 

In short, the login page is simply not added in the browsing stack after successful authentication, and is instead replaced by other relevant pages depending on the user's browsing history.

## It uses: 
- [React](https://react.dev/) for front end.
- [Formik](https://formik.org/) and [Yup](https://github.com/jquense/yup) for form validation.
- [Chakra UI](https://chakra-ui.com/) for styling.
- [Netlify](https://www.netlify.com/) for deploying the app.
- Local storage for storing user data 

## Protected Routes

The protected Routes I've added are: 
- About Page 
- Profile Page

## 🔗 Links

[![netflify](https://img.shields.io/badge/netflify-blue?style=for-the-badge&logo=netflify&logoColor=white)]()


## Credentials

You can login using these hardcoded credentials:
email: task@gmail.com
password: task123

You can also choose to register and then use your registered email and password to login.


## To run locally

1. clone this repo
```bash
  git clone https://github.com/Abhishree-codes/AnedyaRoutingTask.git
```
2. Open the cloned repo in vs code or open a new terminal and navigate to the repo in your system.
  
3. Navigate to my-app
```
   cd my-app
```
4. Install dependencies
```
   npm install --engine-strict
```
   
5.  Start the server
```
   npm start
```

6. Browse to http://localhost:3000
