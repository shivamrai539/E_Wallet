function TransactionList({ transactions }) {
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
    }
  };

  if (!transactions || transactions.length === 0) {
    return (
      <div className="transaction-list">
        <div className="empty-state">
          <div className="empty-state-icon">📭</div>
          <div>No transactions yet</div>
        </div>
      </div>
    );
  }

  return (
    <div className="transaction-list">
      {transactions.map((transaction) => (
        <div key={transaction.id} className="transaction-item">
          <div className={`transaction-icon ${transaction.type}`}>
            {transaction.type === 'sent' ? '↑' : '↓'}
          </div>
          <div className="transaction-details">
            <div className="transaction-name">{transaction.name}</div>
            <div className="transaction-date">
              {formatDate(transaction.date)} • {transaction.note || ''}
            </div>
          </div>
          <div className={`transaction-amount ${transaction.type}`}>
            {transaction.type === 'sent' ? '-' : '+'}₹{transaction.amount.toFixed(2)}
          </div>
        </div>
      ))}
    </div>
  );
}

export default TransactionList;
