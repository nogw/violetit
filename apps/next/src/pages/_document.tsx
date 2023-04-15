import { Html, Head, Main, NextScript } from 'next/document';
import clsx from 'clsx';

export default function Document() {
  return (
    <Html lang="en" className="dark">
      <Head />
      <body className={clsx('bg-slate-300', 'dark:bg-black')}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
