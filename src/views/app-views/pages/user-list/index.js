import React, {useState, useEffect} from 'react'
import { Card, Table, Tag, Tooltip, message, Button } from 'antd';
import { EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import {APP_PREFIX_PATH} from "configs/AppConfig";
import AvatarStatus from 'components/shared-components/AvatarStatus';
import Loading from "components/shared-components/Loading";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {useDispatch} from "react-redux";
import {actions} from "store/slices/userSlice";


export const UserList = () => {

  const [users, setUsers] = useState([])
  const navigate = useNavigate()
  const dispatch = useDispatch()


  useEffect(() => {
    const getUsersData = async () => {
      await axios.get("/api/users").then(user => setUsers([...user.data]))
    }

    setTimeout(() => { //for loading
      getUsersData()
    }, 500)
  }, [])

  const deleteUser = userInfo => {
    const newUsers = users.filter(user => user.id !== userInfo.id)
    setUsers([...newUsers])
    message.success({ content: `Deleted user ${userInfo.name}`, duration: 2 });
  }

  const showUserProfile = userInfo => {
    dispatch(actions.addUser(userInfo))
    navigate(`${APP_PREFIX_PATH}/pages/setting`)
  };

    const tableColumns = [
      {
        title: 'User',
        dataIndex: 'name',
        render: (_, record) => (
          <div className="d-flex">
            <AvatarStatus src={record.img} name={record.name} subTitle={record.email}/>
          </div>
        ),
        sorter: {
          compare: (a, b) => {
            a = a.name.toLowerCase();
            b = b.name.toLowerCase();
            return a > b ? -1 : b > a ? 1 : 0;
          },
        },
      },
      {
        title: 'Username',
        dataIndex: 'username',
        sorter: {
          compare: (a, b) => {
            a = a.username.toLowerCase();
            b = b.username.toLowerCase();
            return a > b ? -1 : b > a ? 1 : 0;
          },
        },
      },
      {
        title: 'Website',
        dataIndex: 'website',
        sorter: {
          compare: (a, b) => {
            a = a.website.toLowerCase();
            b = b.website.toLowerCase();
            return a > b ? -1 : b > a ? 1 : 0;
          },
        },
      },
      {
        title: 'Status',
        dataIndex: 'status',
        render: status => (
          <Tag className ="text-capitalize" color={status === 'active'? 'cyan' : 'red'}>{status}</Tag>
        ),
      },
      {
        title: '',
        dataIndex: 'actions',
        render: (_, elm) => (
          <div className="text-right d-flex justify-content-end">
            <Tooltip title="View">
             <Button type="primary" className="mr-2" icon={<EyeOutlined />} onClick={() => {showUserProfile(elm)}} size="small"/>
            </Tooltip>
            <Tooltip title="Delete">
              <Button danger icon={<DeleteOutlined />} onClick={()=> {deleteUser(elm)}} size="small"/>
            </Tooltip>
          </div>
        )
      }
    ];
    return (
      <>
        {(!users.length) ? (
          <Loading cover="content" />
        ) : (
          <Card bodyStyle={{'padding': '0px'}}>
            <div className="table-responsive">
              <Table columns={tableColumns} dataSource={users} rowKey='id' />
            </div>
          </Card>
        )}
      </>
    )
}

export default UserList

