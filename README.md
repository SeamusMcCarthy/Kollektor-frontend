# Final Year Project - Kollektor MERN web app.

## Overview.

This is the front-end repo for the Kollektor MERN web-app and contains the React code for the project. 

Kollektor is a web app that allows users to create and maintain catalogues of their musical equipment. The project also includes a suite of automated tests. Site features include
 
 + Login/Signup
 + View entries by category
 + View users & user entries
 + Search entries
 + Add new entries (only available when logged in)
 + Edit/delete entries (only available to entry creator)
 + Image upload to Cloudinary
 + Comment/Reply on entries (only available when logged in)
 + Edit profile details (only available when logged in)
 + Geo-coded addressing for displaying purchase locations on a map
 + Social media sharing
 + Full set of automated Cypress tests (found in /cypress folder)
 + Subset of tests in Playwright (found in /tests folder)

## Setup requirements.

Once cloned, the following variables should be defined in .env
+ REACT_APP_API_KEY - Google API key for maps and geo-coding
+ REACT_APP_BACKEND_URL - URL for [backend](https://github.com/SeamusMcCarthy/kollektor-backend) 

Once these are defined and the backend is available, the app can be started via 'npm start' and will run on http://localhost:3000
