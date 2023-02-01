import { Form, useFormik, FormikProvider, FormikHelpers } from 'formik';
import { useState } from 'react';
import * as yup from 'yup';

import { ErrorText, Button } from '@violetit/ui';
import { InputField } from '@/shared-components/InputField';
import { useAuth } from '../auth/useAuth';
import { useNavigate } from 'react-router-dom';
import { UserLoginMutation } from './__generated__/UserLoginMutation.graphql';
import { UserLogin } from './mutations/UserLoginMutation';
import { useMutation } from 'react-relay';

type loginValues = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const { signin } = useAuth();
  const navigate = useNavigate();

  const [error, setError] = useState({
    status: false,
    message: '',
  });

  const [userLogin, isPending] = useMutation<UserLoginMutation>(UserLogin);

  const onSubmit = (
    values: loginValues,
    actions: FormikHelpers<loginValues>,
  ) => {
    userLogin({
      variables: values,
      onCompleted: ({ userLoginMutation }, error) => {
        if (error && error.length > 0) {
          const inputs: Array<keyof typeof values> = ['email', 'password'];

          inputs.forEach(input => {
            actions.setFieldValue(input, '', false);
            actions.setFieldTouched(input, false);
          });

          actions.setSubmitting(false);

          setError({ status: true, message: error[0].message });
          return;
        }

        signin(userLoginMutation?.token, () => {
          navigate('/feed', { replace: true });
        });
      },
    });
  };

  const formik = useFormik<loginValues>({
    initialValues: {
      email: '',
      password: '',
    },
    validateOnMount: true,
    validationSchema: yup.object().shape({
      email: yup.string().email().required('Email is required'),
      password: yup.string().required('Password is required'),
    }),
    onSubmit,
  });

  const { isValid, isSubmitting } = formik;

  return (
    <FormikProvider value={formik}>
      <Form>
        <div className="flex flex-col gap-2">
          <InputField name="email" placeholder="Email" />
          <InputField name="password" type="password" placeholder="Password" />
          <Button
            className="flex-auto"
            type="submit"
            disabled={!isValid || isPending}
          >
            {isSubmitting ? 'Wait...' : 'Log in'}
          </Button>
        </div>
        {error.status && <ErrorText>{error.message}</ErrorText>}
      </Form>
    </FormikProvider>
  );
};

export default LoginPage;
