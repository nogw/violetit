import { Button, Flex } from '@violetit/ui';

import { Form, useFormik, FormikProvider, FormikHelpers } from 'formik';
import { useRouter } from 'next/router';
import { useMutation } from 'react-relay';
import { useSnackbar } from 'notistack';
import { useContext } from 'react';
import * as yup from 'yup';

import { SignUpMutation, SignUpMutationType } from 'src/components/Auth/mutations/SignUpMutation';
import { NextPageWithLayout } from 'src/relay/ReactRelayContainer';
import { InputField } from 'src/components/Formik/InputField';

import { AuthContext } from 'src/contexts/AuthContext';
import AuthLayout from 'src/layouts/AuthLayout';

type signUpValues = {
  email: string;
  username: string;
  password: string;
  passwordConfirm: string;
};

const SignUp: NextPageWithLayout = () => {
  const [userRegister, isPending] = useMutation<SignUpMutationType>(SignUpMutation);

  const { closeSnackbar, enqueueSnackbar } = useSnackbar();
  const { signin } = useContext(AuthContext);
  const { push } = useRouter();

  const onSubmit = (values: signUpValues, actions: FormikHelpers<signUpValues>) => {
    closeSnackbar();

    userRegister({
      variables: {
        input: {
          email: values.email,
          username: values.username,
          password: values.password,
        },
      },
      onCompleted: ({ userRegister }) => {
        if (userRegister?.error && userRegister.error.message) {
          const inputs: Array<keyof typeof values> = ['email', 'password', 'username', 'passwordConfirm'];

          inputs.forEach(input => {
            actions.setFieldValue(input, '', false);
            actions.setFieldTouched(input, false);
          });

          actions.setSubmitting(false);
          enqueueSnackbar(userRegister.error.message, { variant: 'error' });
          return;
        }

        enqueueSnackbar(userRegister?.success, { variant: 'success' });

        signin(userRegister?.token, () => {
          push('/');
        });
      },
    });
  };

  const formik = useFormik<signUpValues>({
    initialValues: {
      username: '',
      email: '',
      password: '',
      passwordConfirm: '',
    },
    validateOnMount: true,
    validationSchema: yup.object().shape({
      username: yup.string().min(4).max(24).required('Email is required'),
      email: yup.string().email('Invalid email').required('Email is required'),
      password: yup.string().required('Password is required'),
      passwordConfirm: yup
        .string()
        .min(8)
        .oneOf([yup.ref('password')], 'Passwords must match')
        .required('Password is required'),
    }),
    onSubmit,
  });

  const { isValid, isSubmitting } = formik;

  return (
    <FormikProvider value={formik}>
      <Form>
        <Flex direction="col" className="gap-3">
          <InputField name="username" placeholder="Username" aria-required aria-label="Username" />
          <InputField name="email" placeholder="Email" aria-required aria-label="Email" />
          <InputField name="password" placeholder="Password" type="password" aria-required aria-label="Password" />
          <InputField
            name="passwordConfirm"
            placeholder="Password Confirm"
            type="password"
            aria-required
            aria-label="Password Confirm"
          />
          <Button disabled={!isValid || isPending} type="submit" variant="primary" aria-label="Create Account">
            {isSubmitting ? 'Wait...' : 'Create Account'}
          </Button>
        </Flex>
      </Form>
    </FormikProvider>
  );
};

SignUp.getLayout = page => {
  return <AuthLayout>{page}</AuthLayout>;
};

export default SignUp;
