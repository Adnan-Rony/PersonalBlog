import React from 'react';
import { Outlet } from 'react-router-dom';

const DashboardLayout = () => {
    return (
        <div className='mx-auto w-11/12'>
            <Outlet></Outlet>
        </div>
    );
};

export default DashboardLayout;