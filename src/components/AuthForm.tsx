
import { Button, Form, Input } from 'antd';
import { FC } from 'react';

type LoginFieldType = {
    fullname?: string;
    email: string;
    password: string;
};

interface AuthFormProps {
    onFinish?: (values: LoginFieldType) => void;
    onFinishFailed?: (errorInfo: unknown) => void;
    type?: 'login' | 'register';
}

const AuthForm: FC<AuthFormProps> = ({ onFinish, onFinishFailed, type }) => {

    return (
        <Form
            name="authForm"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            requiredMark={false}
        >
            {
                type === 'register' && <Form.Item<LoginFieldType>
                    label="Name"
                    name="fullname"
                    rules={[{ required: true, message: 'Please input your name' }]}
                >
                    <Input size='large' placeholder='John Smith' />
                </Form.Item>
            }

            <Form.Item<LoginFieldType>
                label="Email"
                name="email"
                rules={[{ required: true, message: 'Please input your email!' }]}
            >
                <Input size='large' placeholder='johnsmith@example.com' />
            </Form.Item>

            <Form.Item<LoginFieldType>
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input.Password size='large' placeholder='*******' />
            </Form.Item>

            <Form.Item label={null} className='mt-1 no-margin'>
                <Button type="primary" htmlType="submit" className='w-full' size='large'>
                    Sign in
                </Button>
            </Form.Item>


            {
                type === "login" && <p className='mb-1 mt-1'>
                    You don't have an account?  <Button color="blue" variant="link" className='no-padding'>
                        Sign up
                    </Button>
                </p>
            }

            {
                type === "register" && <p className='mb-1 mt-1'>
                    Already have an account <Button color="blue" variant="link" className='no-padding'>
                        Sign in
                    </Button>
                </p>
            }

        </Form>
    )
}

export default AuthForm