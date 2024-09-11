import React from 'react';
import { useHistory } from 'react-router-dom';

const WithdrawApplicationButton = ({ applicationId }) => {
  const history = useHistory();

  const handleWithdraw = async () => {
    try {
      const response = await fetch(`/api/applications/${applicationId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        // Redirect to application tracking route after successful withdrawal
        history.push('/applications/tracking');
      } else {
        // Handle error response
        alert('Failed to withdraw the application. Please try again.');
      }
    } catch (error) {
      console.error('Error withdrawing application:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  const confirmWithdrawal = () => {
    if (window.confirm('Are you sure you want to withdraw your application?')) {
      handleWithdraw();
    }
  };

  return (
    <button
      onClick={confirmWithdrawal}
      className="bg-[#1e1236] text-white font-bold rounded px-4 py-3 transition duration-300 ease-in-out hover:bg-[#150b1f] w-full sm:w-4/5 text-sm sm:text-base md:w-auto"
      aria-label="Withdraw your application"
    >
      Withdraw Application
    </button>
  );
};

export default WithdrawApplicationButton;