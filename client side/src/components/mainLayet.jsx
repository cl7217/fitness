// components/MainLayout.js
import ResponsiveAppBar from './Nav';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <>
      <ResponsiveAppBar />
      <div style={{ paddingTop: '70px', minHeight: 'calc(100vh - 70px)' }}>
        <Outlet />
      </div>
    </>
  );
};

export default MainLayout;