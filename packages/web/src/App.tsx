import React from 'react';

import { Providers } from './Providers';

import { Loading } from '@violetit/ui';

import './styles/index.css';

const App = () => (
  <Providers>
    <React.Suspense fallback={'Loading...'}>
      <Loading />
    </React.Suspense>
  </Providers>
);

export default App;
