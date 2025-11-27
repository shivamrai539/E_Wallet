import { useState } from 'react';

function AddFundsModal({ onClose, onSuccess }) {
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fundAmount = parseFloat(amount);

    if (fundAmount <= 0 || !paymentMethod) {
      alert('Please enter a valid amount and payment method.');
      return;
    }

    setIsLoading(true);

    const formData = new URLSearchParams();
    formData.append('amount', fundAmount);
    formData.append('paymentMethod', paymentMethod);

    try {
      const response = await fetch('/add-funds', {
        method: 'POST',
        body: formData
      });

      const result = await response.json();

      if (response.ok && result.success) {
        alert('Funds added successfully!');
        onSuccess();
      } else {
        alert('Failed to add funds: ' + result.message);
      }
    } catch (error) {
      console.error('Add funds error:', error);
      alert('An error occurred while adding funds.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="modal active" onClick={(e) => e.target.className.includes('modal') && onClose()}>
      <div className="modal-content">
        <div className="modal-header">
          <div className="modal-title">Add Funds</div>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Payment Method</label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              required
            >
              <option value="">Select method</option>
              <option value="upi">UPI</option>
              <option value="card">Debit/Credit Card</option>
              <option value="netbanking">Net Banking</option>
            </select>
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
          <button type="submit" className="submit-btn" disabled={isLoading}>
            {isLoading ? 'Adding...' : 'Add Funds'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddFundsModal;
