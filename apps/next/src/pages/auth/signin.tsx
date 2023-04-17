import { Button, Flex } from '@violetit/ui';

import { Form, useFormik, FormikProvider, FormikHelpers } from 'formik';
import { useMutation } from 'react-relay';
import { useSnackbar } from 'notistack';
import { useContext } from 'react';
import { useRouter } from 'next/router';
import * as yup from 'yup';

import { SignInMutation, SignInMutationType } from 'src/components/Auth/mutations/SignInMutation';
import { NextPageWithLayout } from 'src/relay/ReactRelayContainer';
import { InputField } from 'src/components/Formik/InputField';

import { AuthContext } from 'src/contexts/AuthContext';
import AuthLayout from 'src/layouts/AuthLayout';

type signInValues = {
  email: string;
  password: string;
};

const SignIn: NextPageWithLayout = () => {
  const [userLogin, isPending] = useMutation<SignInMutationType>(SignInMutation);

  const { closeSnackbar, enqueueSnackbar } = useSnackbar();
  const { signin } = useContext(AuthContext);
  const { push } = useRouter();

  const onSubmit = (values: signInValues, actions: FormikHelpers<signInValues>) => {
    closeSnackbar();

    userLogin({
      variables: { input: values },
      onCompleted: ({ userLogin }) => {
        if (userLogin?.error && userLogin.error.message) {
          const inputs: Array<keyof typeof values> = ['email', 'password'];

          inputs.forEach(input => {
            actions.setFieldValue(input, '', false);
            actions.setFieldTouched(input, false);
          });

          actions.setSubmitting(false);
          enqueueSnackbar(userLogin.error.message, { variant: 'error' });
          return;
        }

        enqueueSnackbar(userLogin?.success, { variant: 'success' });

        signin(userLogin?.token, () => {
          push('/');
        });
      },
    });
  };

  const formik = useFormik<signInValues>({
    initialValues: {
      email: '',
      password: '',
    },
    validateOnMount: true,
    validationSchema: yup.object().shape({
      email: yup.string().email('Invalid email').required('Email is required'),
      password: yup.string().required('Password is required'),
    }),
    onSubmit,
  });

  const { isValid, isSubmitting } = formik;

  return (
    <FormikProvider value={formik}>
      <Form>
        <Flex direction="col" className="gap-3">
          <InputField name="email" placeholder="Email" aria-required aria-label="Email" />
          <InputField name="password" placeholder="Password" type="password" aria-required aria-label="Password" />
          <Button disabled={!isValid || isPending} type="submit" aria-label="Log in">
            {isSubmitting ? 'Wait...' : 'Log in'}
          </Button>
        </Flex>
      </Form>
    </FormikProvider>
  );
};

SignIn.getLayout = page => {
  return <AuthLayout>{page}</AuthLayout>;
};

export default SignIn;
