import React from 'react';
import { Form, Input, Button } from 'antd';
import './login.css'; 

function Login() {

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

  return (
    <div className="loginPage">
      <Form id="loginForm" name="login" onFinish={onFinish}>
        <div id="itemsContainer">
            <Form.Item  name="username" rules={[{ required: true, message: 'Veuillez insérer votre nom d\'utilisateur' }]}>
                <Input placeholder="Nom d'utilisateur" className="loginInput" />
            </Form.Item>
            <Form.Item name="password" rules={[{ required: true, message: 'Veuillez insérer votre mot de passe' }]}>
                <Input.Password placeholder="Mot de passe" className="loginInput" />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" className="loginButton">
                    Se connecter
                </Button>
            </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default Login;
