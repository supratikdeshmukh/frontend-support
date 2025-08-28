# Record Keeper | React + PHP + MySQL

**Live Demo:** [Record Keeper PHP](https://frontendsupport.in/projects/record-keeper-php/)

---

## 🔹 Features  

- **Clean Split-Screen Layout:** Form on the **left** for adding user details, and a **dynamic table** on the right that instantly reflects submitted data.  
- **Full CRUD Functionality:**  
    - ➕ Add new records  
    - ✏️ Edit existing records  
    - ❌ Delete records  
- **Real-Time Updates:** Data changes are reflected immediately in the UI.  
- **Robust Backend:** Powered by **PHP** for reliable server-side processing.  
- **Secure Data Storage:** Records are stored in **MySQL** database hosted on Hostinger/Your Choice.  
- **Responsive Design:** Works smoothly across desktops, tablets, and mobiles.  

---

## ⚙️ Local Setup  

To run this project locally, follow these steps:

### 1. Backend Setup (PHP + MySQL)
1. Clone the repository:  
    ```bash
    git clone https://github.com/supratikdeshmukh/frontend-support.git
    cd record-keeper-php
    ```
2. Set up a **local PHP server** (e.g., XAMPP, WAMP, MAMP) and save `record-keeper-php/backend-php` section into the server's `www` or `htdocs` folder.  
3. Import the provided MySQL database (`backend-php/database.sql`) into your MySQL server.  
4. Configure the database connection in `config/db.php` (or similar file):  
    ```php
    <?php
    $servername = "localhost";
    $username = "root";       // Your MySQL username
    $password = "";           // Your MySQL password
    $dbname = "record_keeper"; // Your database name

    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    ?>
    ```
5. Start your local PHP server and verify the backend is running.

### 2. Frontend Setup (React)
1. Navigate to the frontend folder:  
    ```bash
    cd frontend
    ```
2. Install dependencies:  
    ```bash
    npm install
    ```
3. Configure `.env.production` with your backend URL:  
    ```
    VITE_API_URL=https://frontendsupport.in/projects/record-keeper-php/backend-php/api/records.php
    ```
4. Start the development server:  
    ```bash
    npm run dev
    ```
5. Open your browser at `http://localhost:5173` (or the port your React app runs on) to view the frontend.

---

## 🚀 Deployment on Hostinger  

1. Upload the project files to your Hostinger web hosting via **File Manager** or **FTP**.  
2. Create a MySQL database via **hPanel → Databases → MySQL Databases**.  
3. Import the `database.sql` file to your Hostinger MySQL database.  
4. Update the database credentials in `config/db.php` with your Hostinger MySQL details:  
    ```php
    $servername = "localhost";
    $username = "<your_db_username>";
    $password = "<your_db_password>";
    $dbname = "<your_db_name>";
    ```
5. Configure your frontend `.env.production` to point to the live backend URL:  
    ```
    VITE_API_URL=https://frontendsupport.in/projects/record-keeper-php/backend-php/api/records.php
    ```
6. Build the React frontend for production:  
    ```bash
    npm run build
    ```
7. Upload the `build` folder contents to your Hostinger public directory (`public_html` or subfolder).  
8. Open your domain or subdomain in a browser to see the live application.

---

## 📜 License  

This project is open-source and available under the [MIT License](LICENSE).  

---

## 👨‍💻 Author  

**Supratik Deshmukh**  

- **GitHub:** [@supratikdeshmukh](https://github.com/supratikdeshmukh)  
- **Website:** [frontendsupport.in](https://frontendsupport.in)  
