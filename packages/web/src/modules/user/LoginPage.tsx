import { Form, useFormik, FormikProvider } from 'formik';
import { useState } from 'react';
import * as yup from 'yup';

import { ErrorText, Button } from '@violetit/ui';
import { Input } from '@/components/InputField';

type loginValues = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const [error, setError] = useState({
    status: false,
    message: '',
  });

  const onSubmit = (values: loginValues) => {
    const config = {
      email: values.email,
      password: values.password,
    };

    console.log(config);
    setError({ status: true, message: 'TODO' });
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
          <Input name="email" placeholder="Email" />
          <Input name="password" type="password" placeholder="Password" />
          <Button type="submit" disabled={!isValid}>
            {isSubmitting ? 'Wait...' : 'Log in'}
          </Button>
        </div>
        {error.status && <ErrorText>{error.message}</ErrorText>}
      </Form>
    </FormikProvider>
  );
};

export default LoginPage;
