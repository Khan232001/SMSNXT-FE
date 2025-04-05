import React, { useState } from 'react';

const Tooltip = ({ children, text }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className='relative inline-block'>
      <div
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        {children}
      </div>
      {isVisible && (
        <div className='absolute z-50 w-64 p-2 text-sm text-white bg-gray-800 rounded-lg shadow-lg -top-2 left-6 transform -translate-y-full'>
          {text}
          <div className='absolute -bottom-1 left-0 w-2 h-2 bg-gray-800 transform rotate-45'></div>
        </div>
      )}
    </div>
  );
};

export default Tooltip;
