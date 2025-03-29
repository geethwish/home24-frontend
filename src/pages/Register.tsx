import AuthForm from '../components/AuthForm'
import logo from '../assets/images/logo.png'

const Register = () => {
    const handleFormSubmit = () => {

    }
    const handleFormSubmitFailed = () => {

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