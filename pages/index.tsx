import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { api } from '@helpers';
import { PredictionsList, Page } from '@components';
import { useRouter } from 'next/router';

const Index: NextPage<any> = () => {
  const router = useRouter();

  useEffect(() => {
    (async () => {
      await loadPredictions();
    })();
  }, []);

  const loadPredictions = async () => {
    await api<any>('/api/user/prediction', 'GET');
    router.push('/home');
  };

  return <></>;
};

export default Index;
