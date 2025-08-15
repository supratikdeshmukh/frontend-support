# Modern Multi-Step Form | MERN Stack

This project is a **modern, multi-step form** built with the **MERN stack** (MongoDB, Express, React, Node.js). It provides a seamless user experience for submitting personal information through a step-by-step process with robust validation. All submitted data is securely stored in a MongoDB database.

**Live Demo:** [Multi-Step Form](https://frontendsupport.in/projects/mern-multi-step-form/)

---

## 🔹 Features

-   **Intuitive Multi-Step UI:** Built with **React** for a smooth, step-by-step user experience.
-   **Comprehensive Field Validation:**
    -   **Name:** Required
    -   **Age:** Must be between 1 and 120
    -   **Gender:** Required selection
    -   **Phone:** Must be exactly 10 digits
    -   **Email:** Must be a valid format
    -   **Address:** Required
-   **Robust Backend:** Powered by **Node.js** and **Express** for reliable data handling.
-   **Secure Data Storage:** User information is saved in **MongoDB**.
-   **Responsive Design:** Fully mobile-friendly and accessible.
-   **Enhanced Accessibility:** Inputs are auto-focused on each step to improve usability.

---

## ⚙️ Local Setup

To run this project locally, you will need to configure the backend environment.

1.  Navigate to the `backend` directory.
2.  Create a `.env` file.
3.  Add the following environment variables, replacing `<username>` and `<password>` with your MongoDB Atlas credentials:

    ```bash
    PORT=5000
    MONGO_URI=mongodb+srv://<username>:<password>@cluster0.hc9lwhm.mongodb.net/multi_step_form
    ```

---

## 🚀 Deployment

Follow these steps to deploy the backend API and the frontend application.

### 1. Deploy the Backend (API) on Render

1.  Create a free account at [render.com](https://render.com).
2.  Click **New → Web Service** and connect your GitHub repository.
3.  Select your backend folder for deployment.
4.  Configure the environment settings:
    -   **Runtime:** Node
    -   **Build Command:** `npm install`
    -   **Start Command:** `node server.js`
5.  In the **Environment Variables** section, add your `MONGO_URI` connection string.
6.  Click **Create Web Service** to deploy.
7.  Once deployed, copy the backend URL (e.g., `https://your-backend.onrender.com`) and paste it into the API endpoint configuration in your frontend's `MultiStepForm.jsx` file.

### 2. Deploy the Frontend (React)

1.  Open your terminal and navigate to the `frontend` directory.
2.  Build the production-ready static files:
    ```bash
    npm install && npm run build
    ```
3.  Deploy the contents of the `dist` folder to your preferred web hosting provider.

---

## License

This project is open-source and available under the [MIT License](LICENSE).

---

## Author

**Supratik Deshmukh**

-   **GitHub:** [@supratikdeshmukh](https://github.com/supratikdeshmukh)
-   **Website:** [frontendsupport.in](https://frontendsupport.in)
