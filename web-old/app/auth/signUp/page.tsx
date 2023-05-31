'use client';

import { Alert, Button, Input } from '@kamalion/ui';
import Link from 'next/link';
import { useState } from 'react';
import { FaChevronRight } from 'react-icons/fa';
import { api } from '@helpers';

export default function SignUpPage() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const [error, setError] = useState('');

  const handleLogin = async (e: any) => {
    try {
      e.preventDefault();

      if (password !== passwordConfirm) {
        setError('As senhas devem coincindir');
        return;
      }

      //await api('/api/user', 'POST', { email, name, password });
    } catch (e: any) {
      setError(e.message);
    }
  };

  return (
    <>
      <div className="relative flex h-screen flex-col items-center">
        <div className="bg-card relative flex h-screen w-full flex-col p-5 md:mt-10 md:h-fit md:w-[400px]">
          <form onSubmit={handleLogin}>
            <Input placeholder="Nome" value={name} onChange={(e) => setName(e.value)} />
            <Input placeholder="E-mail" value={email} onChange={(e) => setEmail(e.value)} />
            <Input placeholder="Senha" value={password} onChange={(e) => setPassword(e.value)} type="password" />
            <Input placeholder="Confirme a Senha" value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.value)} type="password" />

            <Alert type="danger">{error}</Alert>

            <Button className="w-full" icon={<FaChevronRight />}>
              Enviar
            </Button>

            <Link href="auth/login">
              <Button type="white" className="w-full">
                Voltar
              </Button>
            </Link>
          </form>
        </div>
      </div>
    </>
  );
}
