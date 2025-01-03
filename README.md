# NOVELLY  📚
NOVELLY is your ultimate library management system, designed to streamline tracking library resources with features like book browsing, borrowing and returning, and adding personalized notes to your wishlist favorites.  

NOVELLY was built using ReactJS, Express.js, and Pico CSS (a minimal CSS framework for semantic HTML). NOVELLY also utilises the [Google Books API](https://developers.google.com/books/docs/overview) to fetch all the books for its catalogue.

Click [here](https://rayray39.github.io/novelly/) to view the **User Guide**.  
Click [here]() to view the **Developer Guide**. *There isn't a Developer Guide yet, it will be completed soon!

## Motivation  
NOVELLY began as a side project to explore ReactJS, evolving into a dynamic blend of ReactJS and Express.js as new features and data-handling requirements shaped its development.

## Learning Outcomes  
1. Frontend Development
   - Building interactive UIs using React, including managing state and various hooks (eg. useEffect, useNavigate, useRef etc.).
   - Leveraged React Router DOM to implement client-side routing for seamless navigation between pages.
   - Passing and destructuring props for cleaner component design.
   - Handling conditional rendering and dynamic updates in the DOM.
   - Creating controlled components for various forms (eg. create account form, sign in form).
   - Using Pico CSS, a minimal CSS framework, for styling components.

2. Backend Development
   - Creating RESTful APIs with Express.js to handle user authentication, resource management, and CRUD operations.
   - Implementing robust server-side validation and error handling.
   - Managing data persistence with JSON files for simulating a database.
   - Designing features for user creation, login, and logout with role-based access control.
   - Working with dynamic data updates, such as adding new properties to objects and updating placeholders in forms.

3. Integration
   - Connecting the frontend and backend seamlessly with fetch requests and proper API endpoints.
   - Integrated and utilized the Google Books API to fetch and display book data dynamically.
   - Implementing features like borrowing/returning books, updating user details, and rendering data dynamically across the app.

4. Documentation and Github
   - Writing compelling guides to showcase the project’s purpose, features, and technical journey.

## Getting Started  
1. API key setup
   - to fetch data from the Google Books API, an API key is required. Visit the official [site](https://developers.google.com/books/docs/v1/using) to see how you can acquire an API key.
   - in `src/Catalogue.js`, store your API key in the variable `myApiKey`.

2. Install dependencies
   - open up a terminal in the project directory.
   - run `npm install` to install all required project dependencies.

3. Start the backend
   - run `npm install` (if not already done) to install all backend dependencies.
   - run `node src/server.js` to start the Express server, the API will run at `http://localhost:5000`.

4. Start the frontend
   - open another terminal in the project directory.
   - run `npm start` to start the developer server, the application will run at `http://localhost:3000`.

### Prerequisites  
Ensure you have the following installed:
- **Node.js**: `>= 16.x`
- **npm**: `>= 7.x`
- **React**: `^18.0.0`
- **Express**: `^4.21.2`
