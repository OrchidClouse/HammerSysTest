import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {Form, Avatar, Button, Input, Row, Col, message} from "antd";
import { UserOutlined } from "@ant-design/icons";
import { ROW_GUTTER } from "constants/ThemeConstant";
import Flex from "components/shared-components/Flex";
import {useSelector} from "react-redux";

const EditClient = () => {

  const {user} = useSelector(state => state)
  const [selectedUserInfo, setSelectedUserInfo] = useState({});
  const [formDisabled, setFormDisable] = useState(false)
  const navigate = useNavigate();

  const submitHandler = () => {
    setTimeout(() => {
      navigate("/app/pages/user-list");
      setFormDisable(false)
    }, 2000);
  };

  useEffect(() => {
    user.forEach(item => setSelectedUserInfo(prev => {
      const values = {
        name: item.name,
        username : item.username,
        email: item.email,
        phone: item.phone,
        website: item.website,
        company: item.company.name
      }
      return {...prev, ...values}
    }))

  }, [user]);

  const onFinish = () => {
    setSelectedUserInfo([]);
    message.loading({ content: `Updating...`, duration: 1 });
    setFormDisable(true)
  };

  return (
    <>
      {!user.length ? (
        <div>Please select user</div>
      ) : (
        <>
          <Flex
            alignItems="center"
            mobileFlex={false}
            className="text-center text-md-left"
          >
            <Avatar size={90} src={""} icon={<UserOutlined />} />
            <div className="ml-md-3 mt-md-0 mt-3">
              <Button type="primary" disabled onClick={() => {return}}>
                Change Avatar
              </Button>
              <Button className="ml-2" disabled>
                Remove
              </Button>
            </div>
          </Flex>
          <div className="mt-4">
            <Form
              name="basicInformation"
              layout="vertical"
              fields={[
                {name: ["name"],value: selectedUserInfo.name},
                {name: ["username"],value: selectedUserInfo.username},
                {name: ["email"], value: selectedUserInfo.email},
                {name: ["phoneNumber"],value: selectedUserInfo.phone},
                {name: ["company"],value: selectedUserInfo.company},
                {name: ["website"],value: selectedUserInfo.website}
              ]}
              disabled={formDisabled}
              onFinish={onFinish}
            >
              <Row>
                <Col xs={24} sm={24} md={24} lg={16}>
                  <Row gutter={ROW_GUTTER}>
                    <Col xs={24} sm={24} md={12}>
                      <Form.Item
                        label="Name"
                        name="name"
                        rules={[
                          {
                            required: true,
                            message: "Please input your name!",
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={12}>
                      <Form.Item
                        label="Username"
                        name="username"
                        rules={[
                          {
                            required: true,
                            message: "Please input your username!",
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={12}>
                      <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                          {
                            required: true,
                            type: "email",
                            message: "Please enter a valid email!",
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={12}>
                      <Form.Item label="Phone Number" name="phoneNumber">
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={12}>
                      <Form.Item label="Company" name="company">
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={12}>
                      <Form.Item label="Website" name="website">
                        <Input />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Button
                    type="primary"
                    htmlType="submit"
                    onClick={submitHandler}
                  >
                    Save Change
                  </Button>
                </Col>
              </Row>
            </Form>
          </div>
        </>
      )}
    </>
  );
};

export default EditClient

