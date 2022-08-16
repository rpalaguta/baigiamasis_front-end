This is Front end part of my project for CodeAcademy.
To get this project going in your machine you first neeto to run command 'npm install', then 'npm start'.


## Notable features
-Using redux to store user data.
-User token is stored in LocalStorage.
-On refresh function is run that checks if(!user && token) if its true it calls to back end endpoint to get user data, then stores it into redux 'dispatch(login)'.
-On user delete (softDelete), user's services and reviews are soft deleted aswell.
-

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.