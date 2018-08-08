import React from 'react';
import ReactLoading from 'react-loading';

const LoadingSpinner = () => {
    return (
        <div>
            <ReactLoading type='spin' className='custom-spinner' color='blue' height='356' width='200'></ReactLoading> 
        </div>
    );
};

export default LoadingSpinner;