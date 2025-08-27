# Real-Time Record Keeper | MERN Stack  

**Live Demo:** [Record Keeper](https://frontendsupport.in/projects/record-keeper/)  

---

## 🔹 Features  

-   **Clean Split-Screen Layout:** Form on the **left** for adding user details, and a **dynamic table** on the right that instantly reflects submitted data.  
-   **Full CRUD Functionality:**  
    -   ➕ Add new records  
    -   ✏️ Edit existing records  
    -   ❌ Delete records  
-   **Real-Time Updates:** Data changes are reflected immediately in the UI.  
-   **Robust Backend:** Powered by **Node.js** and **Express** for reliable data handling.  
-   **Secure Data Storage:** Records are stored in **MongoDB Atlas**.  
-   **Responsive Design:** Works smoothly across desktops, tablets, and mobiles.  

---

## ⚙️ Local Setup  

To run this project locally, you will need to configure the backend environment.  

1.  Navigate to the `backend` directory.  
2.  Create a `.env` file.  
3.  Add the following environment variables, replacing `<username>` and `<password>` with your MongoDB Atlas credentials:  

    ```bash
    PORT=5000
    MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/record_keeper
    ```

4.  Run backend and frontend:  

    ```bash
    # Backend
    cd backend
    npm install
    npm run dev

    # Frontend
    cd ../frontend
    npm install
    npm start
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
7.  Once deployed, copy the backend URL (e.g., `https://your-backend.onrender.com`) and paste it into the API endpoint configuration in your frontend code - **.env.production**.  

### 2. Deploy the Frontend (React)  

1.  Open your terminal and navigate to the `frontend` directory.  
2.  Build the production-ready static files:  
    ```bash
    npm install && npm run build
    ```  
3.  Deploy the contents of the `dist` (or `build`) folder to your preferred web hosting provider.  

---

## 📜 License  

This project is open-source and available under the [MIT License](LICENSE).  

---

## 👨‍💻 Author  

**Supratik Deshmukh**  

-   **GitHub:** [@supratikdeshmukh](https://github.com/supratikdeshmukh)  
-   **Website:** [frontendsupport.in](https://frontendsupport.in)  
