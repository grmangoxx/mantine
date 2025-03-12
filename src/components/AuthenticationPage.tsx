import React, { useState } from 'react';
import {
  Anchor,
  Button,
  Checkbox,
  Container,
  Group,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
  Alert,
} from '@mantine/core';
import classes from './AuthenticationPage.module.css';
import { ForgotPassword } from './ForgotPassword';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const AuthenticationPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const auth = getAuth();
  const navigate = useNavigate();

  const handleAuth = async () => {
    try {
      setMessage(''); 
      setMessageType(''); 
      if (isRegister) {
        await createUserWithEmailAndPassword(auth, email, password);
        setMessage('Account created successfully!'); 
        setMessageType('success'); 
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        setMessage('Signed in successfully!'); 
        setMessageType('success'); 
      }
    } catch (error) {
      console.error('Authentication error:', error);
      setMessage('Login failed. Please try again.'); 
      setMessageType('error'); 
    }
  };

  return (
    <Container size={420} my={40}>
      <Title ta="center" className={classes.title}>
        Welcome back!
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        {isRegister ? 'Already have an account? ' : 'Do not have an account yet? '}
        <Anchor size="sm" component="button" onClick={() => setIsRegister(!isRegister)}>
          {isRegister ? 'Sign in' : 'Create account'}
        </Anchor>
      </Text>

      {message && (
        <Alert title={messageType === 'error' ? 'Error' : 'Success'} color={messageType === 'error' ? 'red' : 'green'} mt="md">
          {message}
        </Alert>
      )}
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <TextInput
          label="Email"
          placeholder="you@yourdomain.tlds"
          required
          value={email}
          onChange={(event) => setEmail(event.currentTarget.value)}
        />
        <PasswordInput
          label="Password"
          placeholder="Your password"
          required
          mt="md"
          value={password}
          onChange={(event) => setPassword(event.currentTarget.value)}
        />
        <Group justify="space-between" mt="lg">
          <Checkbox label="Remember me" />
          <Anchor component="button" size="sm" onClick={() => navigate('/forgot')}>
            Forgot password?
          </Anchor>
        </Group>
        <Button fullWidth mt="xl" onClick={handleAuth}>
          {isRegister ? 'Create account' : 'Sign in'}
        </Button>
      </Paper>
    </Container>
  );
};

export default AuthenticationPage;
