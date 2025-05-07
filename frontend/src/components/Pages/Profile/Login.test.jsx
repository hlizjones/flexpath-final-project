import { fireEvent, render, screen } from '@testing-library/react';
import Login from './Login';
import useCreateRequest from '../../../hooks/useCreateRequest';
import { AuthContext } from '../../../context/AuthProvider';

const setToken = jest.fn();

const mockHandleRequest = jest.fn();
jest.mock('../../../hooks/useCreateRequest');

jest.mock('../../../hooks/useMessageTimeout');

afterEach(() => {
    jest.clearAllMocks();
});

describe("Login", () => {
    it('Should render a form', () => {
        const mockAuthContext = {
            setToken: setToken,
            tokenExpMessage: null
        }

        useCreateRequest.mockImplementation(() => ({
            handleRequest: mockHandleRequest,
            data: [],
            error: null
        }));

        render(
            <AuthContext.Provider value={mockAuthContext}>
                <Login />
            </AuthContext.Provider>
        );

        expect(screen.getByRole('form')).toBeInTheDocument();
    });

    it('Should call handleRequest when Login button is clicked', () => {
        const mockAuthContext = {
            setToken: setToken,
            tokenExpMessage: null
        }

        useCreateRequest.mockImplementation(() => ({
            handleRequest: mockHandleRequest,
            data: [],
            error: null
        }));

        render(
            <AuthContext.Provider value={mockAuthContext}>
                <Login />
            </AuthContext.Provider>
        );

        const username = screen.getByPlaceholderText("Username");
        const password = screen.getByPlaceholderText("Password");

        fireEvent.change(username, {
            target: { value: "admin" }
        });
        fireEvent.change(password, {
            target: { value: "admin" }
        });

        fireEvent.click(screen.getByRole('button', { name: "Login" }));

        expect(mockHandleRequest).toHaveBeenCalledWith({ username: `admin`, password: `admin` }, "auth/login", "POST");

    });

    it('Should render error message', () => {
        const mockAuthContext = {
            setToken: setToken,
            tokenExpMessage: null
        }

        useCreateRequest.mockImplementation(() => ({
            handleRequest: mockHandleRequest,
            data: [],
            error: "Error"
        }));

        render(
            <AuthContext.Provider value={mockAuthContext}>
                <Login />
            </AuthContext.Provider>
        );

        expect(screen.getByText("Sign-in failed.")).toBeInTheDocument();

    });

    it('Should render token expiration message', () => {
        const mockAuthContext = {
            setToken: setToken,
            tokenExpMessage: "Sign-in expired. Please sign-in again."
        }

        useCreateRequest.mockImplementation(() => ({
            handleRequest: mockHandleRequest,
            data: [],
            error: null
        }));

        render(
            <AuthContext.Provider value={mockAuthContext}>
                <Login />
            </AuthContext.Provider>
        );

        expect(screen.getByText("Sign-in expired. Please sign-in again.")).toBeInTheDocument();
    });

    it('Should call setToken when data is returned from useCreateRequest hook', () => {
        const mockAuthContext = {
            setToken: setToken,
            tokenExpMessage: "Sign-in expired. Please sign-in again."
        }

        useCreateRequest.mockImplementation(() => ({
            handleRequest: mockHandleRequest,
            data: { accessToken: "token", refreshToken: null },
            error: null
        }));

        render(
            <AuthContext.Provider value={mockAuthContext}>
                <Login />
            </AuthContext.Provider>
        );

        expect(setToken).toHaveBeenCalled();
    });
})