import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate, useLocation } from 'react-router-dom';
// import LoginCover from './component/loginCover';
import Dashboard from './pages/dashboard';
import LoginForm from './pages/loginForm';
import ProtectedRoute from './component/protectedroute';
import Data_Table from './component/admin/setting/dataTable';

import { A_Setting } from './component/admin/setting/setting';
import { S_Setting } from './component/staff/Settingforms/setting';
import { useOnlineUsers } from './component/hooks/useOnlineuser';
// import { useSocketListeners } from './component/hooks/usesocketListenerhook';
import Admin_Report from './component/admin/report/report';
import { SalesPipeline } from './component/staff/salespipeline/sales';
import { RecruitmentTable } from './component/admin/admin_hr/admin_hR_/recruTable';
import Admin_Hr_Page from './component/admin/hrPage';
import Staff_hr_pages from './component/staff/Staff_hr_pages';
import { Admin_task_page } from './component/admin/task/admin_task_page';
import MyCalendar from './component/calendara';
import { Staff_task_page } from './component/staff/task/staff_task_page';
import { Admin_sales } from './component/admin/sales/Admin_sales';
import { DprForm } from './component/staff/task/dprFrom';
import { I_Icon } from './component/i_icon';
import { Noti } from './component/staff/notification/notification';
import { Folder_ } from './component/staff/dms/folder';
import { S_A_Setting } from './component/super/setting/setting';
import { useAuth } from './component/hooks/useAuth';
import { MainLoader } from './component/loader';
import Chat from './component/admin/inbox/chat';
import { Su_Folder_ } from './component/super/dms/folder_';
// import { Folder } from 'lucide-react';

function App() {
  const { userQuery } = useAuth();
  const { isLoading } = userQuery?.isLoading || {};

  return (
    <>
      <I_Icon />
      {
        isLoading && <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
          <MainLoader />
        </div>
      }
      <Routes>
        <Route path='/' element={<LoginForm />} />
        <>
          <Route element={<ProtectedRoute roles={["super_admin"]} />}>
            <Route path="/super_admin" element={<Dashboard />}>
              <Route index element="" />
              <Route path="report" element={<Admin_Report />} />
              {/* <Route path="hr" element={<Admin_Hr_Page />} />
          <Route path="tasks" element={<Admin_task_page />} />
          <Route path="sales" element={<SalesPipeline/>}  />
          {/* <Route path="settings" element="hi" /> */}
              {/* <Route path="users" element={<Data_Table />} />  */}
              <Route path="dms" element={<Su_Folder_/>} />
              <Route path="settings" element={<S_A_Setting />} />
            </Route>
          </Route>

          <Route element={<ProtectedRoute roles={["admin"]} />}>
            <Route path="/admin" element={<Dashboard />}>
              <Route index element="" />
              <Route path="report" element={<Admin_Report />} />
              <Route path="hr" element={<Admin_Hr_Page />} />
              <Route path="tasks" element={<Admin_task_page />} />
              <Route path="settings" element={<A_Setting />} />
              <Route path="inbox" element={<Chat />} />
              <Route path="sales" element={<Admin_sales />} />
              <Route path="dms" element={<Folder_ />} />
              {/* <Route path="settings" element="hi" /> */}
              <Route path="users" element={<Data_Table />} />
            </Route>
          </Route>


          <Route element={<ProtectedRoute roles={["staff"]} />}>
            <Route path="/staff" element={<Dashboard />}>
              <Route index path="report" element={<Admin_Report />} />
              <Route path="hr" element={<Staff_hr_pages />} />
              <Route path="tasks" element={<Staff_task_page />} />
              <Route path="sales" element={<SalesPipeline />} />
              <Route path="users" element={<Data_Table />} />
              <Route path="settings" element={<S_Setting />} />
            </Route>
          </Route>
          <Route element={<ProtectedRoute roles={["client"]} />}>
            <Route path="/client" element={<Dashboard />}>
              <Route index path="report" element={<Admin_Report />} />
              {/* <Route path="hr" element={<Client_Hr_Page />} /> */}
              <Route path="users" element={<Data_Table />} />
              <Route path="settings" element={<S_Setting />} />
            </Route>
          </Route>

        </>

        <Route path='/date' element={<MyCalendar />} />
        <Route path='/task' element={<Admin_task_page />} />
        <Route path='/dpr' element={<DprForm />} />
        <Route path='/notification' element={<Noti />} />
        <Route path='/*' element={<Navigate to="/admin" replace />} />

      </Routes>
    </>

  );
}

export default App;
