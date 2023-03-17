import { useState } from 'react';
import { Form, useFormik, FormikProvider, FormikHelpers } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-relay';
import * as yup from 'yup';

import { ErrorText, Button } from '@violetit/ui';
import { InputField } from '@/common/InputField';
import { useAuth } from '../auth/useAuth';

import { UserRegisterMutation } from './mutations/__generated__/UserRegisterMutation.graphql';
import { UserRegister } from './mutations/UserRegisterMutation';

type signUpValues = {
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

const LoginPage = () => {
  const { signin } = useAuth();
  const navigate = useNavigate();

  const [error, setError] = useState({
    status: false,
    message: '',
  });

  const [userRegister, isPending] = useMutation<UserRegisterMutation>(UserRegister);

  const onSubmit = (values: signUpValues, actions: FormikHelpers<signUpValues>) => {
    userRegister({
      variables: values,
      onCompleted: ({ userRegister }, error) => {
        if (error && error.length > 0) {
          const inputs: Array<keyof typeof values> = ['email', 'password', 'username'];

          inputs.forEach(input => {
            actions.setFieldValue(input, '', false);
            actions.setFieldTouched(input, false);
          });

          actions.setSubmitting(false);

          setError({ status: true, message: error[0].message });
          return;
        }

        signin(userRegister?.token, () => {
          navigate('/feed', { replace: true });
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
      email: yup.string().email().required('Email is required'),
      password: yup.string().required('Password is required'),
      passwordConfirm: yup
        .string()
        .min(8)
        .oneOf([yup.ref('password')], 'passwords must match')
        .required('password is required'),
    }),
    onSubmit,
  });

  const { isValid, isSubmitting } = formik;

  return (
    <FormikProvider value={formik}>
      <Form>
        <div className="flex flex-col gap-2">
          <InputField name="username" placeholder="Username" />
          <InputField name="email" placeholder="Email" />
          <InputField name="password" placeholder="Password" type="password" />
          <InputField name="passwordConfirm" placeholder="Password Confirm" type="password" />
          <Button disabled={!isValid || isPending} type="submit" variant="primary">
            {isSubmitting ? 'Wait...' : 'Create Account'}
          </Button>
        </div>
        {error.status && <ErrorText>{error.message}</ErrorText>}
      </Form>
    </FormikProvider>
  );
};

export default LoginPage;
