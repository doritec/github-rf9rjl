import React from 'react';

export function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center">
      <div className="animate-spin rounded-full h-6 w-6 border-2 border-t-transparent border-white"></div>
    </div>
  );
}