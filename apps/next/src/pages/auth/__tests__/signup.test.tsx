import { render, cleanup, screen, waitFor, fireEvent } from '@testing-library/react';
import { createMockEnvironment, MockPayloadGenerator } from 'relay-test-utils';
import userEvent from '@testing-library/user-event';
import mockRouter from 'next-router-mock';

import { WithProviders } from '../../../../test/Providers';
import SignUp from '../signup';

jest.mock('next/router', () => require('next-router-mock'));
jest.mock('next/dist/client/router', () => require('next-router-mock'));

describe('SignUp Page', () => {
  afterEach(cleanup);

  beforeEach(() => {
    mockRouter.setCurrentUrl('/auth/signup');
  });

  it('should navigate to /feed after signup correctly the user', async () => {
    const environment = createMockEnvironment();

    render(<WithProviders relayEnvironment={environment}>{<SignUp queryRefs={{}} />}</WithProviders>);

    const variables = {
      username: 'nogenoge',
      email: 'noge@gmail.com',
      password: 'awesomepassword',
    };

    await waitFor(() => expect(screen.getByRole('button')).toBeDisabled());

    fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: variables.username } });
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: variables.email } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: variables.password } });
    fireEvent.change(screen.getByPlaceholderText('Password Confirm'), { target: { value: variables.password } });

    await waitFor(() => expect(screen.getByRole('button')).not.toBeDisabled());

    userEvent.click(screen.getByRole('button'));

    await waitFor(() => {
      const operation = environment.mock.getMostRecentOperation();
      expect(operation.request.variables).toMatchObject({ input: variables });
      environment.mock.resolve(
        operation,
        MockPayloadGenerator.generate(operation, {
          UserRegisterPayload: () => ({
            error: null,
          }),
        }),
      );
    });

    await waitFor(() => {
      expect(mockRouter).toMatchObject({ pathname: '/' });
    });
  });
});
