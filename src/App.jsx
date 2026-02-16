import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate, useLocation } from 'react-router-dom';
// import LoginCover from './component/loginCover';
import Dashboard from './pages/dashboard';
import LoginForm from './pages/loginForm';
import ProtectedRoute from './component/protectedroute';
import Data_Table from './component/dataTable';

import { A_Setting } from './component/admin/setting/setting';
import { S_Setting } from './component/staff/Settingforms/setting';
import { useOnlineUsers } from './component/hooks/useOnlineuser';
import { useSocketListeners } from './component/hooks/usesocketListenerhook';
import Admin_Report from './component/admin/report/report';
import { SalesPipeline } from './component/staff/salespipeline/sales';
import { RecruitmentTable } from './component/admin/admin_hr/admin_hR_/recruTable';
import Admin_Hr_Page from './component/admin/hrPage';
import Staff_hr_pages from './component/staff/Staff_hr_pages';
import { Admin_task_page } from './component/admin/task/admin_task_page';
import MyCalendar from './component/calendara';
function App() {

  useSocketListeners();
  //  console.log('from usersocket====',res)
  useOnlineUsers();
  return (
    <Routes>

      <Route path='/' element={<LoginForm />} />



      <Route element={<ProtectedRoute roles={["admin"]} />}>
        <Route path="/admin" element={<Dashboard />}>
          <Route index element="" />
          <Route path="report" element={<Admin_Report />} />
          <Route path="hr" element={<Admin_Hr_Page />} />
          <Route path="tasks" element={<Admin_task_page />} />
          <Route path="settings" element={<A_Setting />} />
          <Route path="sales" element={<SalesPipeline/>}  />
          {/* <Route path="settings" element="hi" /> */}
          <Route path="users" element={<Data_Table />} />
        </Route>
      </Route>


      <Route element={<ProtectedRoute roles={["staff"]} />}>
        <Route path="/staff" element={<Dashboard />}>
          <Route index path="report" element={<Admin_Report />} />
          <Route path="hr" element={<Staff_hr_pages />} />
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
      <Route path='/date' element={<MyCalendar/>} />
      <Route path='/task' element={<Admin_task_page/>} />
      <Route path='/*' element={<Navigate to="/admin" replace />} />

    </Routes>

  );
}

export default App;
