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

1. Clone the repository:  
    ```bash
    git clone <your-repo-url>
    cd record-keeper-php
    ```
2. Set up a **local PHP server** (e.g., XAMPP, WAMP, MAMP) and save record-keeper-php/backend-php into www folder.  
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
5. Start your local PHP server and open the frontend in your browser, or you can directly run frontend section via VS Code from anywhere.

---

## 🚀 Deployment on Hostinger  

1. Upload the project files to your Hostinger web hosting or other service via **File Manager** or **FTP**.  
2. Create a MySQL database via **hPanel → Databases → MySQL Databases**.  
3. Import the `database.sql` file to your Hostinger MySQL database.  
4. Update the database credentials in `config/db.php` with your Hostinger/other MySQL details:  
    ```php
    $servername = "localhost";
    $username = "<your_db_username>";
    $password = "<your_db_password>";
    $dbname = "<your_db_name>";
    ```
5. Open your domain or subdomain in a browser to see the live application.  

---

## 📜 License  

This project is open-source and available under the [MIT License](LICENSE).  

---

## 👨‍💻 Author  

**Supratik Deshmukh**  

- **GitHub:** [@supratikdeshmukh](https://github.com/supratikdeshmukh)  
- **Website:** [frontendsupport.in](https://frontendsupport.in)  
