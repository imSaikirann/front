import React from 'react';
import { Box, Button, Input, Center, FormControl, FormLabel, FormErrorMessage } from '@chakra-ui/react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { useLogin } from '../hooks/useLogin';

export default function Loginpage() {

    const { login } = useLogin();

    return (
        <Center h="100vh">
            <Box p={10} w="450px" h="300px" shadow="md" borderWidth="1px" borderRadius="md" bg="#1A192F" border="none" color="white">
                <Formik
                    initialValues={{
                        email: '',
                        password: ''
                    }}
                    validationSchema={Yup.object({
                        email: Yup.string().email('Invalid email').required('Required'),
                        password: Yup.string().required('Required')
                    })}
                    onSubmit={(values, actions) => {
                        login(values.email, values.password, actions);
                    }}
                >
                    <Form style={{ textAlign: 'center' }}>
                        <Field name="email">
                            {({ field, form }) => (
                                <FormControl isInvalid={form.errors.email && form.touched.email}>
                                    <FormLabel htmlFor="email">Email</FormLabel>
                                    <Input {...field} id="email" placeholder="Email" />
                                    <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                                </FormControl>
                            )}
                        </Field>
                        <Field name="password">
                            {({ field, form }) => (
                                <FormControl isInvalid={form.errors.password && form.touched.password}>
                                    <FormLabel htmlFor="password">Password</FormLabel>
                                    <Input {...field} type="password" id="password" placeholder="Password" />
                                    <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                                </FormControl>
                            )}
                        </Field>
                        <Button mt={4}  w="370px" type="submit">
                            Login
                        </Button>
                    </Form>
                </Formik>
            </Box>
        </Center>
    );
}
