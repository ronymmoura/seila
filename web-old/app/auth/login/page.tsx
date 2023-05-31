'use client';

import { Alert, Button, Input } from '@kamalion/ui';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { signIn, SignInResponse } from 'next-auth/react';
import { api } from '@helpers';
import { FaChevronRight } from 'react-icons/fa';

export default function LoginPage({ searchParams }) {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');

  const handleLogin = async (e: any) => {
    e.preventDefault();
    setError(null);

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false
      });

      if (result) {
        if (result.ok) {
          router.push('/');
          return;
        }

        setError(result.error!.toString());
      }
    } catch (e: any) {
      console.log(e);
      setError(e.message);
    }
  };
  return (
    <>
      <div className="relative flex h-screen flex-col items-center">
        <div className="bg-card relative flex h-screen w-screen flex-col p-5 md:mt-10 md:h-fit lg:w-[400px]">
          <form onSubmit={handleLogin}>
            <Input placeholder="E-mail" value={email} onChange={(e) => setEmail(e.value)} />
            <Input placeholder="Senha" value={password} onChange={(e) => setPassword(e.value)} type="password" />

            <Alert type="danger">{error}</Alert>

            <Button className="w-full" icon={<FaChevronRight />} submit usesLoader>
              Entrar
            </Button>

            <Link href="auth/signUp" passHref>
              <Button type="white" className="w-full">
                Criar conta
              </Button>
            </Link>
          </form>
        </div>
      </div>
    </>
  );
}
