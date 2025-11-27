# 💸 E-Wallet

A powerful **E-Wallet** system built using **Java Servlets**, **MySQL**, and **React**.
It allows users to create wallets, make virtual fund transfers, and view transaction histories — all in a modern, responsive React interface.

---

## 🚀 Tech Stack
**Frontend:** React 18 | React Router | Vite
**Backend:** Java Servlets | JDBC
**Database:** MySQL
**Server:** Apache Tomcat 11

---

## 🌟 Features
✅ Modern React-based UI with component architecture
✅ User authentication (Login/Signup)
✅ Wallet creation & management
✅ Virtual fund transfers between wallets
✅ Add funds functionality
✅ Transaction history tracking
✅ User profile management
✅ Responsive design
✅ Session-based authentication

---

## 📁 Project Structure

```
E-wallet/
├── react-app/              # React frontend application
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── App.jsx         # Main app component
│   │   └── ...
│   ├── package.json
│   └── vite.config.js      # Vite configuration with proxy
├── src/                    # Java backend source
│   └── com/payflow/
│       ├── db/             # Database connection
│       └── servlets/       # Servlet controllers
├── webcontent/             # Legacy HTML/CSS (optional)
│   ├── WEB-INF/
│   │   ├── web.xml         # Servlet mappings
│   │   └── lib/            # JAR dependencies
│   └── ...
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- JDK 23
- Apache Tomcat 11
- Node.js (v14+)
- MySQL Database

### Database Setup

1. Create the database and tables:

```sql
CREATE DATABASE IF NOT EXISTS e_wallet_db;
USE e_wallet_db;

CREATE TABLE IF NOT EXISTS users (
    user_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    mobile VARCHAR(15),
    address VARCHAR(255),
    password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS accounts (
    account_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    wallet_id VARCHAR(50) NOT NULL UNIQUE,
    balance DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE IF NOT EXISTS transactions (
    transaction_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    sender_account_id INT,
    receiver_account_id INT,
    amount DECIMAL(10,2) NOT NULL,
    transaction_type ENUM('transfer', 'add_funds', 'request') NOT NULL,
    note VARCHAR(255) DEFAULT NULL,
    transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (sender_account_id) REFERENCES accounts(account_id),
    FOREIGN KEY (receiver_account_id) REFERENCES accounts(account_id)
);
```

2. Update database credentials in `src/com/payflow/db/DatabaseConnection.java`

### Backend Setup

1. Configure Tomcat in your IDE
2. Deploy the project to Tomcat
3. Server will run on `http://localhost:8686`

### Frontend Setup

1. Navigate to the React app:
```bash
cd react-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Access the app at `http://localhost:3000`

---

## 🔗 API Endpoints

The frontend communicates with these servlet endpoints:

- `POST /login` - User login
- `POST /register` - User registration
- `GET /dashboard-data` - Get dashboard data
- `POST /transfer` - Transfer money
- `POST /add-funds` - Add funds to wallet
- `GET /profile` - Get user profile
- `POST /profile` - Update user profile
- `GET /logout` - Logout user

---

## 📋 Completed Features

### Backend (Java Servlets + MySQL)
✅ User authentication system
✅ Wallet creation & user registration
✅ Fund transfer logic with transaction safety
✅ Transaction history storage & retrieval
✅ Input validation
✅ Exception handling for failed transactions
✅ Session management

### Frontend (React)
✅ Modern React UI with routing
✅ Login and Signup pages
✅ Wallet dashboard
✅ Transaction history display
✅ Responsive layout
✅ Form validation
✅ Reusable components
✅ Profile management  

---

## 💡 Description 
💬This E-Wallet System allows users to manage digital money conveniently.
Users can create wallets, transfer funds, view history, and maintain secure transactions — all powered by Java and MySQL.


---

## 👩‍💻 Contributors
Rishika Goyal (3J-52)  
Jiya Jeswani (3J-25)  
Shivam Rai (3J-61)  
**Shreya Shrivastava (3J-64)**  
Anshika Sahu (3J-08)  


---

## ❤️ Motivation
> “Code it, Build it, Learn from it — every project makes you stronger!”  

---

## 🧠 Author
**👩‍💻 Shreya Shrivastava**  
*B.Tech CSE | Passionate Developer | Learner of React & Java*

---

⭐ *If you like this project, give it a star and stay tuned for future updates!* 🌈
