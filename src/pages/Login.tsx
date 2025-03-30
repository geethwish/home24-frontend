import logo from '../assets/images/logo.png'
import AuthForm from '../components/AuthForm'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginFailure, loginStart, loginSuccess } from '../redux/slices/user.slice';
import api from '../services/api';
import { UserLoginForm } from '../types';
import { responseErrorHandler } from '../utils/errorHandler';
import { toast } from 'react-toastify';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const handleFormSubmit = async (values: UserLoginForm) => {

        dispatch(loginStart());
        try {
            const response = await api.post('/auth/login', values);
            localStorage.setItem('authToken', response.data.token);
            dispatch(loginSuccess(response.data));
            toast.success('Login successful');
            navigate('/');
        } catch (error: unknown) {
            dispatch(loginFailure(responseErrorHandler(error)));
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
                            Sign in
                        </h3>
                    </div>
                    <AuthForm type='login' onFinish={handleFormSubmit} onFinishFailed={handleFormSubmitFailed} />

                </div>
            </div>
        </div>
    )
}

export default Login