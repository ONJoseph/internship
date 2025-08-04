import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import LoginForm from '../LoginForm';
import Dashboard from './Dashboard';

const Home: React.FC = () => {
  const { state } = useAuth();
  const [loggedIn, setLoggedIn] = useState(!!state.user);

  return <div>{loggedIn || state.user ? <Dashboard /> : <LoginForm onLoginSuccess={() => setLoggedIn(true)} />}</div>;
};

export default Home;
