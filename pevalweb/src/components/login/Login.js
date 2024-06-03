import { useContext } from 'react';
import { Form, Input, Button, message } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './login.css'; 
import { AuthContext } from '../common/AuthContext';

function Login() {
  const navigate = useNavigate();
  const { setAuth } = useContext(AuthContext);

  // Fonction exécutée à la soumission du formulaire
  const onFinish = (values) => {
    // Requête POST pour authentifier l'utilisateur
    axios.post(`${process.env.REACT_APP_API_HOST}/auth/login`, {
      username: values.username,
      password: values.password
    })
    .then(response => {
      // Si la connexion est réussie, enregistrer les informations dans le localStorage
      const { token, id, name } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('teacherId', id);
      localStorage.setItem('teacherName', name);
      setAuth({ token, teacherId: id, teacherName: name });
      message.success('Connecté avec succès');
      navigate('/');
    })
    .catch(error => {
      // Gérer les erreurs de connexion
      if (error.response && error.response.status === 401) {
        message.error('Nom d\'utilisateur ou mot de passe incorrects');
      } else {
        message.error('Une erreur est survenue, veuillez réessayer plus tard');
      }
    });
  };

  return (
    <div className="loginPage">
      <Form id="loginForm" name="login" onFinish={onFinish}>
        <div id="itemsContainer">
          <Form.Item name="username" rules={[{ required: true, message: 'Veuillez insérer votre nom d\'utilisateur' }]}>
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
