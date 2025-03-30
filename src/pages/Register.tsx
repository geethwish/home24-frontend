import AuthForm from '../components/AuthForm'
import logo from '../assets/images/logo.png'
import { UserRegisterForm } from '../types';
import { toast } from 'react-toastify';
import { loginFailure, loginSuccess } from '../redux/slices/user.slice';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { responseErrorHandler } from '../utils/errorHandler';
import api from '../services/api';

const Register = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleFormSubmit = async (values: UserRegisterForm) => {
        console.log(values, 'values');

        try {
            const response = await api.post('/auth/signup', values);
            // Save token on local storage
            localStorage.setItem('authToken', response.data.token);
            dispatch(loginSuccess(response.data));
            toast.success('Registration successful');
            navigate('/');
        } catch (error) {
            console.error('Registration failed:', error);
        }
    }

    const handleFormSubmitFailed = (errorInfo: unknown) => {
        dispatch(loginFailure(responseErrorHandler(errorInfo)));

    }

    return (
        <div className='login-container'>
            <div className='flex flex-col justify-center items-center gap-12'>
                <div className='flex items-center'>
                    <img
                        src={logo}
                        alt={"Home24 BXP Logo"}
                        loading="lazy"
                        className="w-16 h-16"
                    />
                    <h1 className='text-primary font-bold text-4xl'>
                        Home24 BXP
                    </h1>
                </div>

                <div className="card">
                    <div className='flex justify-center mb-4 text-primary'>
                        <h3>
                            Sign up
                        </h3>
                    </div>
                    <AuthForm type='register' onFinish={handleFormSubmit} onFinishFailed={handleFormSubmitFailed} />

                </div>
            </div>

        </div>
    )
}

export default Register