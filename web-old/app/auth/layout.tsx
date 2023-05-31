import Head from 'next/head';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br">
      <Head>
        <meta charSet="utf-8" />
      </Head>
      <body>{children}</body>
    </html>
  );
}
