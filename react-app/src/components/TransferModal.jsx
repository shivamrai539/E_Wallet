import { useState } from 'react';

function TransferModal({ onClose, onSuccess, currentBalance }) {
  const [recipientWalletId, setRecipientWalletId] = useState('');
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const transferAmount = parseFloat(amount);

    if (transferAmount > currentBalance) {
      alert('Insufficient balance!');
      return;
    }

    setIsLoading(true);

    const formData = new URLSearchParams();
    formData.append('recipientWalletId', recipientWalletId);
    formData.append('amount', transferAmount);
    formData.append('note', note || 'Transfer');

    try {
      const response = await fetch('/transfer', {
        method: 'POST',
        body: formData
      });

      const result = await response.json();

      if (response.ok && result.success) {
        alert('Money sent successfully!');
        onSuccess();
      } else {
        alert('Transfer Failed: ' + result.message);
      }
    } catch (error) {
      console.error('Transfer error:', error);
      alert('An error occurred during the transfer.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="modal active" onClick={(e) => e.target.className.includes('modal') && onClose()}>
      <div className="modal-content">
        <div className="modal-header">
          <div className="modal-title">Send Money</div>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Recipient Wallet ID</label>
            <input
              type="text"
              placeholder="Enter wallet ID"
              value={recipientWalletId}
              onChange={(e) => setRecipientWalletId(e.target.value)}
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
            <label>Note (Optional)</label>
            <input
              type="text"
              placeholder="Add a note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>
          <button type="submit" className="submit-btn" disabled={isLoading}>
            {isLoading ? 'Sending...' : 'Send Money'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default TransferModal;
