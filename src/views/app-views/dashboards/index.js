import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import Loading from "components/shared-components/Loading";

import { Form, Avatar, Button, Input, Row, Col, Upload } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { ROW_GUTTER } from "constants/ThemeConstant";
import Flex from "components/shared-components/Flex";

const EditProfile = () => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);
  const params = useParams();

  const getUser = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!response.ok) {
      throw new Error("failed to fetch");
    }
    const data = await response.json();
    const user = data.filter((u) => u.id == params.id);
    setUser(...user);
    setLoading(false);
    return data;
  };

  const submitHandler = () => {

  }

  return (
    <>
      {loading && !user ? (
        <Loading cover="content" />
      ) : (
        <>
          <Flex
            alignItems="center"
            mobileFlex={false}
            className="text-center text-md-left"
          >
            <Avatar size={90} src={""} icon={<UserOutlined />} />
            <div className="ml-md-3 mt-md-0 mt-3">
              <Upload showUploadList={false}>
                <Button type="primary" disabled>
                  Change Avatar
                </Button>
              </Upload>
              <Button className="ml-2" disabled>
                Remove
              </Button>
            </div>
          </Flex>
          <div className="mt-4">
            <Form
              name="basicInformation"
              layout="vertical"
              initialValues={{
                name: user.name,
                email: user.email,
                username: user.username,
                phoneNumber: user.phone,
                website: user.website,
                company: user.company.name,
                city: user.address.city,
                postcode: user.address.zipcode,
              }}
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
                      <Form.Item label="Company" name="company">
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={12}>
                      <Form.Item label="Phone Number" name="phoneNumber">
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={12}>
                      <Form.Item label="Website" name="website">
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={12}>
                      <Form.Item label="City" name="city">
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={12}>
                      <Form.Item label="Post code" name="postcode">
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
  )
};

export default EditProfile;