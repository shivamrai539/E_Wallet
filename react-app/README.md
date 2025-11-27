# PayFlow React Frontend

This is the React-based frontend for the PayFlow E-Wallet application.

## Features

- Modern React UI with component-based architecture
- React Router for navigation
- State management using React hooks
- Responsive design
- Integration with existing Java servlet backend

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Tomcat server running on port 8686 with the backend servlets

## Installation

```bash
npm install
```

## Development

To run the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:3000`

## Backend Integration

The frontend communicates with the Java servlet backend running on Tomcat (port 8686). The Vite dev server is configured to proxy API requests:

- `/login` - Login endpoint
- `/register` - Registration endpoint
- `/dashboard-data` - Dashboard data
- `/transfer` - Money transfer
- `/add-funds` - Add funds
- `/logout` - Logout
- `/profile` - User profile

Make sure your Tomcat server is running before starting the React app.

## Build for Production

```bash
npm run build
```

The build output will be in the `dist` directory.

## Project Structure

```
react-app/
├── src/
│   ├── components/
│   │   ├── Login.jsx
│   │   ├── Signup.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Header.jsx
│   │   ├── BalanceCard.jsx
│   │   ├── QuickActions.jsx
│   │   ├── TransactionList.jsx
│   │   ├── TransferModal.jsx
│   │   ├── AddFundsModal.jsx
│   │   ├── ReceiveModal.jsx
│   │   ├── ProfileModal.jsx
│   │   ├── ProfileSidebar.jsx
│   │   ├── Auth.css
│   │   └── Dashboard.css
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── index.css
├── package.json
└── vite.config.js
```

## Technologies Used

- React 18
- React Router DOM
- Vite (build tool)
- CSS3 for styling
