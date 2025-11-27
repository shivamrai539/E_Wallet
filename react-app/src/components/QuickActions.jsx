function QuickActions({ onActionClick }) {
  return (
    <div className="quick-actions">
      <button className="action-btn" onClick={() => onActionClick('transfer')}>
        <div className="action-icon">💸</div>
        <div className="action-label">Send Money</div>
      </button>
      <button className="action-btn" onClick={() => onActionClick('receive')}>
        <div className="action-icon">💰</div>
        <div className="action-label">Request Money</div>
      </button>
      <button className="action-btn" onClick={() => onActionClick('addFunds')}>
        <div className="action-icon">➕</div>
        <div className="action-label">Add Funds</div>
      </button>
      <button className="action-btn" onClick={() => onActionClick('history')}>
        <div className="action-icon">📊</div>
        <div className="action-label">History</div>
      </button>
    </div>
  );
}

export default QuickActions;
