import React from 'react';

const StepCircle = ({ number }) => (
  <div className="w-20 h-20 md:w-24 md:h-24 flex items-center justify-center 
                 bg-purple-500/20 border-2 border-purple-500 rounded-full 
                 text-2xl md:text-3xl font-bold mb-4 shrink-0">
    {number}
  </div>
);

export default StepCircle;