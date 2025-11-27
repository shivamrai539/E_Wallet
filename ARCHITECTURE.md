# Architecture Overview

## System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                        Browser                               │
│                  http://localhost:3000                       │
└────────────────────────┬────────────────────────────────────┘
                         │
                         │ React App (Vite Dev Server)
                         │
┌────────────────────────▼────────────────────────────────────┐
│                    React Frontend                            │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  App.jsx (React Router)                              │   │
│  │  ├── /login    → Login.jsx                           │   │
│  │  ├── /signup   → Signup.jsx                          │   │
│  │  └── /dashboard → Dashboard.jsx                      │   │
│  │                   ├── Header.jsx                     │   │
│  │                   ├── BalanceCard.jsx                │   │
│  │                   ├── QuickActions.jsx               │   │
│  │                   ├── TransactionList.jsx            │   │
│  │                   ├── TransferModal.jsx              │   │
│  │                   ├── AddFundsModal.jsx              │   │
│  │                   ├── ReceiveModal.jsx               │   │
│  │                   ├── ProfileModal.jsx               │   │
│  │                   └── ProfileSidebar.jsx             │   │
│  └──────────────────────────────────────────────────────┘   │
└────────────────────────┬────────────────────────────────────┘
                         │
                         │ API Requests (Proxied by Vite)
                         │ POST /login, /register, /transfer
                         │ GET  /dashboard-data, /profile
                         │
┌────────────────────────▼────────────────────────────────────┐
│                   Tomcat Server                              │
│                 http://localhost:8686                        │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Java Servlets                                        │   │
│  │  ├── LoginServlet         (POST /login)              │   │
│  │  ├── RegisterServlet      (POST /register)           │   │
│  │  ├── DashboardServlet     (GET /dashboard-data)      │   │
│  │  ├── TransferServlet      (POST /transfer)           │   │
│  │  ├── AddFundsServlet      (POST /add-funds)          │   │
│  │  ├── ProfileServlet       (GET/POST /profile)        │   │
│  │  └── LogoutServlet        (GET /logout)              │   │
│  └──────────────────────────────────────────────────────┘   │
└────────────────────────┬────────────────────────────────────┘
                         │
                         │ JDBC Connection
                         │
┌────────────────────────▼────────────────────────────────────┐
│                    MySQL Database                            │
│                  (e_wallet_db)                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Tables:                                              │   │
│  │  ├── users         (user credentials & info)         │   │
│  │  ├── accounts      (wallet_id, balance)              │   │
│  │  └── transactions  (transfer history)                │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

## Data Flow Examples

### 1. User Login Flow

```
User enters credentials
       ↓
Login.jsx validates form
       ↓
fetch('/login', { method: 'POST', body: formData })
       ↓
Vite proxy forwards → http://localhost:8686/login
       ↓
LoginServlet processes request
       ↓
Query users table in MySQL
       ↓
If valid: Create session, return success JSON
       ↓
Login.jsx receives response
       ↓
App.jsx updates authentication state
       ↓
React Router redirects to /dashboard
```

### 2. Dashboard Load Flow

```
User navigates to /dashboard
       ↓
Dashboard.jsx mounts
       ↓
useEffect triggers loadDashboardData()
       ↓
fetch('/dashboard-data')
       ↓
Vite proxy forwards → http://localhost:8686/dashboard-data
       ↓
DashboardServlet checks session
       ↓
Queries: accounts (balance, wallet_id)
         transactions (history)
         users (name, email)
       ↓
Returns JSON with all data
       ↓
Dashboard.jsx updates state
       ↓
Child components re-render with new data:
  - BalanceCard shows balance
  - TransactionList shows history
  - Header shows user name
```

### 3. Money Transfer Flow

```
User clicks "Send Money"
       ↓
Dashboard opens TransferModal
       ↓
User enters: recipientWalletId, amount, note
       ↓
TransferModal.jsx validates and submits
       ↓
fetch('/transfer', { method: 'POST', body: formData })
       ↓
Vite proxy forwards → http://localhost:8686/transfer
       ↓
TransferServlet processes:
  1. Start database transaction
  2. Check sender's balance
  3. Validate recipient exists
  4. Deduct from sender
  5. Add to recipient
  6. Create transaction record
  7. Commit transaction
       ↓
Returns success JSON
       ↓
TransferModal calls onSuccess()
       ↓
Dashboard.jsx reloads all data
       ↓
UI updates:
  - Balance decreases
  - Transaction appears in history
```

## Component Communication

### Parent → Child (Props)

```jsx
<Dashboard>
  <BalanceCard 
    balance={1000.00}           // Pass data down
    walletId="WLT-12345678"
  />
  <TransactionList 
    transactions={[...]}         // Pass array down
  />
</Dashboard>
```

### Child → Parent (Callbacks)

```jsx
<Dashboard>
  <TransferModal
    onClose={() => setActiveModal(null)}     // Parent function
    onSuccess={() => loadDashboardData()}    // Refresh data
  />
</Dashboard>
```

### State Management

```jsx
function Dashboard() {
  // Local state in Dashboard
  const [dashboardData, setDashboardData] = useState(null);
  const [activeModal, setActiveModal] = useState(null);
  
  // Fetch data from backend
  useEffect(() => {
    loadDashboardData();
  }, []);
  
  // Share data with children via props
  return (
    <>
      <BalanceCard balance={dashboardData.balance} />
      {activeModal === 'transfer' && 
        <TransferModal onSuccess={loadDashboardData} />
      }
    </>
  );
}
```

## File Organization

### Frontend Structure
```
react-app/
├── src/
│   ├── components/
│   │   ├── Login.jsx           # Auth page
│   │   ├── Signup.jsx          # Auth page
│   │   ├── Dashboard.jsx       # Main container
│   │   ├── Header.jsx          # Layout component
│   │   ├── BalanceCard.jsx     # Display component
│   │   ├── QuickActions.jsx    # Display component
│   │   ├── TransactionList.jsx # Display component
│   │   ├── TransferModal.jsx   # Form component
│   │   ├── AddFundsModal.jsx   # Form component
│   │   ├── ReceiveModal.jsx    # Form component
│   │   ├── ProfileModal.jsx    # Form component
│   │   ├── ProfileSidebar.jsx  # Layout component
│   │   ├── Auth.css            # Styles for auth pages
│   │   └── Dashboard.css       # Styles for dashboard
│   ├── App.jsx                 # Router setup
│   ├── App.css                 # Global styles
│   └── main.jsx                # Entry point
├── vite.config.js              # Dev server & proxy
└── package.json                # Dependencies
```

### Backend Structure
```
src/
└── com/payflow/
    ├── db/
    │   └── DatabaseConnection.java    # MySQL connection
    └── servlets/
        ├── LoginServlet.java          # Handle login
        ├── RegisterServlet.java       # Handle signup
        ├── DashboardServlet.java      # Fetch dashboard data
        ├── TransferServlet.java       # Handle transfers
        ├── AddFundsServlet.java       # Handle add funds
        ├── ProfileServlet.java        # Handle profile
        └── LogoutServlet.java         # Handle logout
```

## Technology Stack

### Frontend Technologies
- **React 18** - UI library
- **React Router 6** - Client-side routing
- **Vite 5** - Build tool & dev server
- **CSS3** - Styling
- **Fetch API** - HTTP requests

### Backend Technologies
- **Java 23** - Programming language
- **Jakarta Servlets** - Web framework
- **JDBC** - Database connectivity
- **Apache Tomcat 11** - Application server
- **MySQL** - Database
- **Gson** - JSON serialization

## Development vs Production

### Development Mode
```
React Dev Server (localhost:3000)
    ↓ Proxy API requests
Tomcat Server (localhost:8686)
    ↓ JDBC
MySQL Database
```

### Production Mode (Future)
```
Build React app: npm run build
    ↓ Creates static files in dist/
Deploy dist/ folder to Tomcat's webapps/
    ↓ Serve from same server
Tomcat Server (single port)
    ↓ JDBC
MySQL Database
```

## Security Architecture

### Session Management
```
1. User logs in
2. LoginServlet creates HttpSession
3. Store: user_id, name, email, account_id
4. Session cookie sent to browser
5. Browser includes cookie in all requests
6. Servlets check session before processing
7. Logout invalidates session
```

### Authentication Flow
```
Request → Servlet
    ↓
Check: session exists?
    ↓ No → Return 401
    ↓ Yes
Check: session has user_id?
    ↓ No → Return 401
    ↓ Yes
Process request
```

### Data Validation
```
Frontend:
- HTML5 validation (required, type, min/max)
- React validation (check balance, etc.)

Backend:
- Check session
- Validate input parameters
- Database constraints (unique email, foreign keys)
- Transaction safety (BEGIN, COMMIT, ROLLBACK)
```

This architecture provides a clean separation between frontend and backend while maintaining security and data integrity throughout the application.
