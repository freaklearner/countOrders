import { Button, Checkbox, Form, Input } from "antd";
import { useEffect } from "react";

import useLogin from "../../hooks/useLogin";
import './style.css';

const Login = () => {
    const {loginhandler} = useLogin();
  const onFinish = (values) => {
    console.log("Success:", values);
    loginhandler(values.code, values.password);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(()=>{
    // console.log("useEffect: ",login);
  })


  return (
    <div className="root">
    <Form className="formClass"
      name="basic"
      labelCol={{
        span: 4,
      }}
      wrapperCol={{
        span: 16,
      }}
      style={{
        // maxWidth: 600,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Code"
        name="code"
        rules={[
          {
            required: true,
            message: "Please input your username!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
    </div>
  );
};

export default Login;
