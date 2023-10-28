import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
    return (
        <>
            <div>
                Page not found <Link to="/">Go to Home page</Link>
            </div>
        </>
    );
};

export default ErrorPage;
