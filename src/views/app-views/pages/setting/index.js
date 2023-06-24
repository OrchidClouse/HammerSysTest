import React, {useEffect} from 'react'
import { UserOutlined} from '@ant-design/icons';
import { Menu } from 'antd';
import { Link, Route, Navigate, useLocation, Routes } from 'react-router-dom';
import InnerAppLayout from 'layouts/inner-app-layout';
import EditProfile from './EditProfile';

const url = '/app/pages/setting'

const MenuItem = ({icon, path, label}) => {

  return (
    <>
      {icon}
      <span>{label}</span>
      <Link to={`${url}/${path}`} />
    </>
  )
}

const SettingOption = () => {

  const location = useLocation();

  const locationPath = location.pathname.split('/')

  const currentPath = locationPath[locationPath.length - 1]

  return (
    <Menu
      mode="inline"
      selectedKeys={[currentPath]}
      items={[
        {
          key: 'edit-profile',
          label: <MenuItem label="Edit Profile" icon={<UserOutlined />} path="edit-profile" />
        },
      ]}
    />
  );
};

const SettingContent = () => {

  return (
    <Routes>
      <Route path="edit-profile" element={<EditProfile />} />
      <Route path="*" element={<Navigate to="edit-profile" replace />} />
    </Routes>
  )
}

export const Setting = () => {
    return (
      <InnerAppLayout
        sideContentWidth={320}
        sideContent={<SettingOption />}
        mainContent={<SettingContent />}
      />
    );
}

export default Setting
