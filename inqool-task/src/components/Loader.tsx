import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="loader-container d-flex justify-content-center align-items-center position-fixed top-0 bottom-0 start-0 end-0 bg-white">
      <div className="spinner-border text-primary" role="status" style={{ width: '5rem', height: '5rem' }}>
      </div>
    </div>
  );
};

export default Loader;
