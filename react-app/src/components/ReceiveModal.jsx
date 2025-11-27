import { useState } from 'react';

function ReceiveModal({ onClose }) {
  const [fromWalletId, setFromWalletId] = useState('');
  const [amount, setAmount] = useState('');
  const [reason, setReason] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Money request sent successfully! (Frontend Only)');
    onClose();
  };

  return (
    <div className="modal active" onClick={(e) => e.target.className.includes('modal') && onClose()}>
      <div className="modal-content">
        <div className="modal-header">
          <div className="modal-title">Request Money</div>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>From Wallet ID</label>
            <input
              type="text"
              placeholder="Enter wallet ID"
              value={fromWalletId}
              onChange={(e) => setFromWalletId(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Amount (₹)</label>
            <input
              type="number"
              placeholder="0.00"
              step="0.01"
              min="1"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Reason</label>
            <input
              type="text"
              placeholder="Reason for request"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="submit-btn">Send Request</button>
        </form>
      </div>
    </div>
  );
}

export default ReceiveModal;
