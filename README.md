# Creator Dashboard Frontend :computer:

## Overview
This is the **frontend** for the *Creator Dashboard* application, built with **React** and **Bootstrap**. It provides a user-friendly interface for users to register, log in, view a social media feed, save posts, and for admins to manage users and view analytics.

> [!IMPORTANT]  
> Ensure the backend API is running or deployed before using the frontend, as it relies on API calls for data.

## Features
- **User Authentication**: Register and login pages with JWT-based authentication.
- **Social Media Feed**: Displays posts from Reddit and TechCrunch, with the ability to save posts.
- **Saved Posts**: View and share saved posts.
- **Admin Dashboard**: Admins can view analytics, manage users (adjust credits, delete users), and monitor activity.
- **Responsive Design**: Uses Bootstrap for a mobile-friendly UI.

## Project Structure
```
creator-dashboard-frontend/
├── public/            # Static assets
├── src/               # React source code
│   ├── components/    # React components
│   │   ├── AdminDashboard.js
│   │   ├── Feed.js
│   │   ├── Login.js
│   │   ├── Register.js
│   │   └── SavedPosts.js
│   ├── App.js         # Main app component
│   └── index.js       # React entry point
├── .env               # Environment variables (not tracked in Git)
└── package.json       # Dependencies and scripts
```

## Prerequisites
- **Node.js** (v22.2.0 or higher)
- Backend API deployed (or running locally)  
  - Deployed Backend: [Backend API](https://creator-dashboard-backend-muwx.onrender.com)

> [!TIP]  
> You can run the backend locally by following the setup instructions in the [Backend Repository](https://github.com/TechWithAnish/creator-dashboard-backend).

## Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/TechWithAnish/creator-dashboard-frontend.git
cd creator-dashboard-frontend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the root directory with the following content:

```
REACT_APP_API_URL=https://creator-dashboard-backend-muwx.onrender.com
```

- For local testing with a local backend, use:  
  ```
  REACT_APP_API_URL=http://localhost:5000
  ```

### 4. Run the Frontend Locally
```bash
npm start
```
The app will start on `http://localhost:3000`.

> [!WARNING]  
> If the backend API URL is incorrect, the frontend will fail to fetch data. Double-check the `REACT_APP_API_URL` in your `.env` file.

## Pages

### User Pages
- **Login**: [Login Page](#login) - Log in with email and password.
- **Register**: [Register Page](#register) - Create a new user account.
- **Feed**: [Feed Page](#feed) - View social media posts (Reddit and TechCrunch).
- **Saved Posts**: [Saved Posts Page](#saved-posts) - View and share saved posts.

### Admin Pages
- **Admin Dashboard**: [Admin Dashboard](#admin-dashboard) - Manage users and view analytics (admin only).

## Deployment
The frontend is deployed on **Netlify** :sparkles:.

### Deployed URL
- [Frontend App](https://vertx-project-anish.netlify.app)

### Deployment Steps
1. **Push the Code to GitHub**  
   - Repository: [Frontend Repository](https://github.com/TechWithAnish/creator-dashboard-frontend)
2. **Create a New Site on Netlify**  
   - Connect the GitHub repository.  
   - Set the following environment variable in Netlify:  
     ```
     REACT_APP_API_URL=https://creator-dashboard-backend-muwx.onrender.com
     ```
   - **Build Command**: `npm run build`  
   - **Publish Directory**: `build`
3. **Deploy the Site**  
   - Verify the deployed URL by visiting the login page.

## Testing

### Local Testing
- Run `npm start` and access `http://localhost:3000`.
- Test the login page with the following credentials:  
  - **Admin**: `admin@example.com` (password: `admin123`)  
  - **User**: `newuser@example.com` (create via the register page if needed)

### Deployed Testing
- Visit [Frontend App](https://vertx-project-anish.netlify.app/login).  
- Log in as `admin@example.com` (password: `admin123`) to access the Admin Dashboard.  
- Log in as a regular user to access the Feed and Saved Posts pages.

## Dependencies
- `react`: JavaScript library for building the UI.
- `react-router-dom`: Handles routing for different pages.
- `axios`: Makes HTTP requests to the backend API.
- `bootstrap`: CSS framework for styling.
- `react-bootstrap`: Bootstrap components for React.

## To-Do List
- [x] Deploy frontend on Netlify
- [ ] Add dark mode support
- [ ] Improve UI with animations

## Acknowledgments
Big thanks to @TechWithAnish for building this awesome frontend! :tada:  
For more on Markdown formatting, check out the [GitHub Docs][1] and [Wikipedia Markdown Guide][2].

## License
This project is for **educational purposes** and not licensed for commercial use.

<!-- Hidden comment: Consider adding a loading spinner for API calls -->

[1]: https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax "Basic Writing and Formatting Syntax - GitHub Docs"
[2]: https://en.wikipedia.org/wiki/Markdown "Wikipedia Markdown Guide"