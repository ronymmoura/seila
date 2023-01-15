import { Alert, Button, Input } from '@kamalion/ui';
import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { api } from '@helpers';
import { FaChevronRight } from 'react-icons/fa';
import React from 'react';

const LoginPage: NextPage = () => {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState(null);

  const handleLogin = async (e: any) => {
    e.preventDefault();
    setError(null);

    try {
      const { accessToken } = await api<any>('/api/user/login', 'POST', { email, password });

      if (accessToken) {
        localStorage.setItem('seila:token', accessToken);
        router.push('/home');
      }
    } catch (e: any) {
      setError(e.message);
    }
  };

  return (
    <>
      <div className="relative flex h-screen flex-col items-center">
        <div className="bg-card relative flex h-screen w-screen flex-col p-5 md:mt-10 md:h-fit lg:w-[400px]">
          <form onSubmit={handleLogin}>
            <Input className="input" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.value)} />
            <Input className="input" placeholder="Senha" value={password} onChange={(e) => setPassword(e.value)} type="password" />

            <Alert type="danger">{error}</Alert>

            <Button className="w-full" icon={<FaChevronRight />} submit>
              Entrar
            </Button>

            <Link href="signUp" passHref>
              <Button type="white" className="w-full">
                Criar conta
              </Button>
            </Link>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
