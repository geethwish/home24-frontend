// frontend/test/components/LoginForm.test.tsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LoginForm from '../../src/components/AuthForm';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../../src/redux/store';
import api from '../../src/services/api';
import TestComponentWrapper from '../../src/components/TestComponentWrapper'
// Mock the useNavigate hook
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}));

// Mock the api service
jest.mock('../../src/services/api');
const mockedApi = api as jest.Mocked<typeof api>;

describe('LoginForm Component', () => {
    beforeEach(() => {
        mockNavigate.mockClear();
        mockedApi.post.mockClear();
    });

    it('renders the login form', () => {
        render(
            <TestComponentWrapper>
                <LoginForm />
            </TestComponentWrapper>
        );

        expect(screen.getByLabelText(/email/i)).toBeInTheDocument();

        expect(screen.getByLabelText('Email')).toBeInTheDocument();
        expect(screen.getByLabelText('Password')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /log in/i })).toBeInTheDocument();
    });

    it('calls onFinish with correct values when form is submitted', async () => {
        mockedApi.post.mockResolvedValue({ data: { token: 'test-token' } });

        render(
            <Provider store={store}>
                <BrowserRouter>
                    <LoginForm />
                </BrowserRouter>
            </Provider>
        );

        const emailInput = screen.getByLabelText('Email') as HTMLInputElement;
        const passwordInput = screen.getByLabelText('Password') as HTMLInputElement;
        const loginButton = screen.getByRole('button', { name: /log in/i });

        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });
        fireEvent.click(loginButton);

        await waitFor(() => {
            expect(mockedApi.post).toHaveBeenCalledWith('/auth/login', {
                email: 'test@example.com',
                password: 'password123',
            });
            expect(localStorage.getItem('authToken')).toBe('test-token');
            expect(mockNavigate).toHaveBeenCalledWith('/');
        });
    });

    it('displays an error message if login fails', async () => {
        mockedApi.post.mockRejectedValue(new Error('Invalid credentials'));

        render(
            <Provider store={store}>
                <BrowserRouter>
                    <LoginForm />
                </BrowserRouter>
            </Provider>
        );

        const emailInput = screen.getByLabelText('Email') as HTMLInputElement;
        const passwordInput = screen.getByLabelText('Password') as HTMLInputElement;
        const loginButton = screen.getByRole('button', { name: /log in/i });
        fireEvent.change(passwordInput, { target: { value: 'wrongpassword123' } });
        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });
        fireEvent.click(loginButton);

        await waitFor(() => {
            // You might need to adjust this based on how you display error messages
            // For example, if you use react-toastify, you might need to mock that as well
            // expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
        });
    });
});