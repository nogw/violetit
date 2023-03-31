import { Button, Flex } from '@violetit/ui';

import { Form, useFormik, FormikProvider, FormikHelpers } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-relay';
import { useSnackbar } from 'notistack';
import * as yup from 'yup';

import { UserLoginMutation } from './mutations/__generated__/UserLoginMutation.graphql';
import { UserLogin } from './mutations/UserLoginMutation';
import { InputField } from 'src/common/InputField';
import { useAuth } from 'src/modules/Auth/useAuth';

type signInValues = {
  email: string;
  password: string;
};

const SignInPage = () => {
  const { signin } = useAuth();
  const navigate = useNavigate();

  const [userLogin, isPending] = useMutation<UserLoginMutation>(UserLogin);

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const onSubmit = (values: signInValues, actions: FormikHelpers<signInValues>) => {
    closeSnackbar();

    userLogin({
      variables: values,
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
          navigate('/', { replace: true });
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
      email: yup.string().email().required('Email is required'),
      password: yup.string().required('Password is required'),
    }),
    onSubmit,
  });

  const { isValid, isSubmitting } = formik;

  return (
    <FormikProvider value={formik}>
      <Form>
        <Flex className="flex-col gap-2">
          <InputField name="email" placeholder="Email" />
          <InputField name="password" placeholder="Password" type="password" />
          <Button disabled={!isValid || isPending} type="submit" aria-label="Log in">
            {isSubmitting ? 'Wait...' : 'Log in'}
          </Button>
        </Flex>
      </Form>
    </FormikProvider>
  );
};

export default SignInPage;
