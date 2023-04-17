import '@testing-library/jest-dom/extend-expect';

import { jest } from '@jest/globals';

global.jest = jest;

jest.mock('../src/relay/RelayEnvironment.ts', () => {
  const { createMockEnvironment } = require('relay-test-utils');
  return createMockEnvironment();
});

jest.mock('notistack', () => ({
  ...jest.requireActual('notistack'),
  useSnackbar: () => {
    return {
      enqueueSnackbar: jest.fn(),
      closeSnackbar: jest.fn(),
    };
  },
}));
