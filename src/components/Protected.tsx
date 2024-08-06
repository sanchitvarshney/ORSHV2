import useToken from '@/hooks/useToken';
import { RootState } from '@/store';
import React, { useEffect, ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

interface ProtectedProps {
  children: ReactNode;
  authentication?: boolean;
}

const Protected: React.FC<ProtectedProps> = ({
  children,
  authentication = true,
}) => {
  const { token, setToken } = useToken();
  const authStatus = !!token; // Boolean check for token existence
  const navigate = useNavigate();
  const state = useSelector((state: RootState) => state);

  useEffect(() => {
    if (state.auth?.token) {
      setToken({ token: state.auth.token });
    }
  }, [state.auth?.token, setToken]);

  useEffect(() => {
    if (authentication && !authStatus) {
      navigate('/login');
    } else if (!authentication && authStatus) {
      navigate('/');
    }
  }, [authStatus, authentication, navigate]);

  return <>{children}</>;
};

export default Protected;
