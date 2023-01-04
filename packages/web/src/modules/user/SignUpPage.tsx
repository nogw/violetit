import { Form, useFormik, FormikProvider } from 'formik';
import { useState } from 'react';
import * as yup from 'yup';

import { ErrorText, Button } from '@violetit/ui';
import { Input } from '@/components/InputField';

type signUpValues = {
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

const LoginPage = () => {
  const [error, setError] = useState({
    status: false,
    message: '',
  });

  const onSubmit = (values: signUpValues) => {
    const config = {
      username: values.username,
      email: values.email,
      password: values.password,
      passwordConfirm: values.passwordConfirm,
    };

    console.log(config);
    setError({ status: true, message: 'TODO' });
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
          <Input name="username" placeholder="Username" />
          <Input name="email" placeholder="Email" />
          <Input name="password" type="password" placeholder="Password" />
          <Input
            name="passwordConfirm"
            type="password"
            placeholder="Password Confirm"
          />
          <Button type="submit" disabled={!isValid}>
            {isSubmitting ? 'Wait...' : 'Create Account'}
          </Button>
        </div>
        {error.status && <ErrorText>{error.message}</ErrorText>}
      </Form>
    </FormikProvider>
  );
};

export default LoginPage;
