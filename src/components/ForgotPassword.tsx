import { IconArrowLeft } from '@tabler/icons-react';
import {
  Anchor,
  Box,
  Button,
  Center,
  Container,
  Group,
  Paper,
  Text,
  TextInput,
  Title,
  Alert,
} from '@mantine/core';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';    
import classes from './ForgotPassword.module.css';

export function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const navigate = useNavigate();
  const auth = getAuth();

  const handleResetPassword = async () => {
    try {
      setMessage('');
      setMessageType('');
      await sendPasswordResetEmail(auth, email);
      setMessage('Password reset email sent!');
      setMessageType('success');
    } catch (error) {
      console.error('Password reset error:', error);
      setMessage('Failed to send password reset email. Please try again.');
      setMessageType('error');
    }
  };

  return (
    <Container size={460} my={30}>
      <Title className={classes.title} ta="center">
        Forgot your password?
      </Title>
      <Text c="dimmed" fz="sm" ta="center">
        Enter your email to get a reset link
      </Text>

      {message && (
        <Alert title={messageType === 'error' ? 'Error' : 'Success'} color={messageType === 'error' ? 'red' : 'green'} mt="md">
          {message}
        </Alert>
      )}
      <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
        <TextInput
          label="Your email"
          placeholder="you@yourdomain.tlds"
          required
          value={email}
          onChange={(event) => setEmail(event.currentTarget.value)}
        />
        <Group justify="space-between" mt="lg">
          <Anchor c="dimmed" size="sm" onClick={() => navigate('/')}>
            <Center inline>
              <IconArrowLeft size={12} stroke={1.5} />
              <Box ml={5}>Back to the login page</Box>
            </Center>
          </Anchor>
          <Button onClick={handleResetPassword}>Reset password</Button>
        </Group>
      </Paper>
    </Container>
  );
}