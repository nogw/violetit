import React from 'react';

import { Loading } from '@violetit/ui';
import { Providers } from 'src/Providers';
import { Routes } from 'src/Routes';
import './styles/index.css';

const App = () => (
  <Providers>
    <React.Suspense fallback={<Loading />}>
      <Routes />
    </React.Suspense>
  </Providers>
);

export default App;
