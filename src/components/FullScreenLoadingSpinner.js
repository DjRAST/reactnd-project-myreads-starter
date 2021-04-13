import React from 'react';

const FullScreenLoadingSpinner = () => {
  return (
    <div className="fullscreenContainer">
      <img src="loading.gif" className="fullscreenLoader" alt="loading spinner"/>
    </div>
  );
};

export default FullScreenLoadingSpinner;