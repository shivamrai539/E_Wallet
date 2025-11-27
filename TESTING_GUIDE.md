# Testing Guide - PayFlow React App

## Pre-Testing Checklist

Before testing the React application, ensure:

1. MySQL database is running with tables created
2. Tomcat server is running on port 8686
3. Backend servlets are deployed and accessible
4. React dev server is running on port 3000

## Starting the Application

### Terminal 1: Backend (if not already running)
```bash
# Start Tomcat from your IDE or:
# Navigate to Tomcat's bin directory and run:
./catalina.sh run
```

### Terminal 2: Frontend
```bash
cd react-app
npm install  # First time only
npm run dev
```

### Access the App
Open browser to: `http://localhost:3000`

## Test Scenarios

### 1. User Registration Flow

**Steps:**
1. Navigate to `http://localhost:3000/signup`
2. Fill in the form:
   - Full Name: Test User
   - Email: test@example.com
   - Password: password123
3. Click "Create Account"
4. Should show success alert and redirect to login

**Expected Result:**
- New user created in database
- Wallet ID generated automatically
- Account with 0.00 balance created

### 2. User Login Flow

**Steps:**
1. Navigate to `http://localhost:3000/login`
2. Enter credentials:
   - Email: test@example.com
   - Password: password123
3. Click "Login"
4. Should redirect to dashboard

**Expected Result:**
- Session created
- User data loaded
- Dashboard displays with correct user name

### 3. Dashboard Display

**Steps:**
1. After successful login, check dashboard shows:
   - User name in header
   - Wallet balance (₹0.00 for new user)
   - Wallet ID
   - Four action buttons
   - Transaction list (empty for new user)

**Expected Result:**
- All data displays correctly
- UI is responsive
- No console errors

### 4. Add Funds

**Steps:**
1. Click "Add Funds" button
2. Select payment method (e.g., UPI)
3. Enter amount: 1000
4. Click "Add Funds"

**Expected Result:**
- Success alert shown
- Balance updates to ₹1000.00
- Transaction appears in history
- Transaction type: "received"
- Note: "Added via UPI"

### 5. Money Transfer

**Setup:** Create a second user account to transfer money to.

**Steps:**
1. Note the second user's Wallet ID
2. Login with first user
3. Click "Send Money"
4. Enter:
   - Recipient Wallet ID: [second user's wallet ID]
   - Amount: 100
   - Note: Test transfer
5. Click "Send Money"

**Expected Result:**
- Success alert
- First user balance: ₹900.00
- Second user balance: ₹100.00
- Transaction appears in both users' history
- Transaction shows as "sent" for sender, "received" for recipient

### 6. Profile Management

**Steps:**
1. Click profile icon in header
2. Sidebar opens
3. Click "Edit Profile"
4. Update:
   - Mobile: 1234567890
   - Address: Test City, Test State
5. Click "Save Changes"

**Expected Result:**
- Success alert
- Sidebar updates with new info
- Data persists after page refresh

### 7. Transaction History

**Steps:**
1. Perform multiple transactions
2. Check that all appear in "Recent Transactions"
3. Click "View All" to see full history

**Expected Result:**
- Transactions sorted by date (newest first)
- Correct icons for sent/received
- Amounts show with proper +/- signs
- Notes displayed correctly
- Date formatting (Today, Yesterday, or date)

### 8. Session Management

**Steps:**
1. Login successfully
2. Close browser tab
3. Open new tab to `http://localhost:3000`

**Expected Result:**
- Should automatically go to dashboard (session active)

**Steps:**
1. Click profile icon
2. Click "Logout"

**Expected Result:**
- Redirected to login page
- Session cleared
- Cannot access dashboard without login

### 9. Error Handling

**Test Insufficient Balance:**
1. Login with user having ₹100 balance
2. Try to transfer ₹200
3. Should show "Insufficient balance!" error

**Test Invalid Wallet ID:**
1. Try to transfer to non-existent wallet ID
2. Should show "Recipient wallet ID not found"

**Test Self-Transfer:**
1. Try to transfer to own wallet ID
2. Should show "You cannot send money to yourself"

### 10. Responsive Design

**Steps:**
1. Resize browser window
2. Test on different screen sizes:
   - Desktop (1920x1080)
   - Tablet (768x1024)
   - Mobile (375x667)

**Expected Result:**
- Layout adjusts appropriately
- All elements remain accessible
- No horizontal scrolling
- Quick actions grid adjusts (4 cols → 2 cols on mobile)

## Common Issues and Solutions

### Issue: "Failed to load data"
**Solution:**
- Check Tomcat is running on port 8686
- Verify backend servlet is deployed
- Check browser console for detailed error
- Check Tomcat logs

### Issue: Login successful but dashboard shows empty
**Solution:**
- Check DashboardServlet is returning correct JSON
- Verify database connection
- Check browser Network tab for response

### Issue: Modals not closing
**Solution:**
- Click outside modal or on X button
- Check browser console for errors
- Refresh page if stuck

### Issue: CORS errors
**Solution:**
- Ensure vite.config.js proxy is configured
- Restart React dev server
- Clear browser cache

## Database Verification Queries

After testing, verify data in MySQL:

```sql
-- Check users
SELECT * FROM users;

-- Check accounts and balances
SELECT u.name, a.wallet_id, a.balance
FROM users u
JOIN accounts a ON u.user_id = a.user_id;

-- Check transactions
SELECT
  t.*,
  u1.name as sender_name,
  u2.name as receiver_name
FROM transactions t
LEFT JOIN accounts a1 ON t.sender_account_id = a1.account_id
LEFT JOIN users u1 ON a1.user_id = u1.user_id
LEFT JOIN accounts a2 ON t.receiver_account_id = a2.account_id
LEFT JOIN users u2 ON a2.user_id = u2.user_id
ORDER BY t.transaction_date DESC;
```

## Performance Testing

1. Create multiple users (10+)
2. Perform multiple transactions (50+)
3. Check dashboard load time
4. Verify transaction list scrolls smoothly
5. Test with slow network (throttle in DevTools)

## Security Testing

1. Try accessing dashboard without login → Should redirect to login
2. Try accessing API endpoints directly → Should return 401
3. Check that passwords are not visible in Network tab
4. Verify session expires after logout
5. Test SQL injection in input fields (should be handled by backend)

## Browser Compatibility

Test on:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Reporting Issues

When reporting bugs, include:
1. Steps to reproduce
2. Expected vs actual behavior
3. Browser console errors
4. Network tab screenshot
5. Tomcat logs if backend error
