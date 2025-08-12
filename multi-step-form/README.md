# Multi-Step Form

A **responsive multi-step form** with a hamburger navbar that saves user input data to a MySQL database without page reload. This project is built with **HTML, CSS, JavaScript, AJAX, PHP, and MySQL**, offering a smooth and user-friendly experience for multi-step data submission.

---

## Live Demo

Try the live version here: [https://frontendsupport.in/projects/multi-step-form/](https://frontendsupport.in/projects/multi-step-form/)

---

## Features

- **Responsive Design:** Works seamlessly across desktop and mobile devices with a clean hamburger navigation menu.
- **Multi-Step Form:** Divides the form into multiple steps for better user experience.
- **AJAX Submission:** Data is submitted asynchronously to the backend without page refresh.
- **MySQL Integration:** Form data is saved securely in a MySQL database using PHP.
- **Responsive Navbar:** Includes a hamburger menu for smooth navigation on all screen sizes.
- **Validation:** Basic front-end validation to ensure data correctness before submission.

---

## Technologies Used

- **HTML5** and **CSS3** for structure and styling.
- **JavaScript** and **AJAX** for form interactivity and asynchronous communication.
- **PHP** for server-side processing.
- **MySQL** as the database to store form submissions.
- **Font Awesome** for icons and UI elements.

---

## Getting Started

### Prerequisites

- A web server with PHP support (e.g., Apache, Nginx).
- MySQL server.
- Basic knowledge of setting up PHP and MySQL environments.

### Installation

1. Clone this repository:
    ```bash
    git clone https://github.com/supratikdeshmukh/frontend-support.git
    ```
2. Import the database by running the following SQL script in your MySQL server:

    ```sql
    -- Create Database
    CREATE DATABASE IF NOT EXISTS form_app;
    USE form_app;

    -- Create Table
    CREATE TABLE IF NOT EXISTS users (
        id INT(11) NOT NULL AUTO_INCREMENT,
        name VARCHAR(100) NOT NULL,
        age INT(3) NOT NULL,
        gender ENUM('Male', 'Female', 'Other') NOT NULL,
        phone VARCHAR(15) NOT NULL,
        email VARCHAR(100) NOT NULL,
        address TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (id)
    );
    ```

3. Configure the database connection details in the PHP files (usually in a config or connection file).
4. Upload the files to your PHP-enabled web server.

---

## Usage

Open the form in a web browser and fill in the steps. The data will be saved to the MySQL database without refreshing the page.

---

## Contributing

Feel free to open issues or submit pull requests for improvements or bug fixes.

---

## License

This project is open-source and available under the [MIT License](LICENSE).

---

## Author

**Supratik Deshmukh**

- GitHub: [https://github.com/supratikdeshmukh](https://github.com/supratikdeshmukh)
- Website: [https://frontendsupport.in](https://frontendsupport.in)
