import { render, screen } from '@testing-library/react'
import Navbar from "./Navbar";
import { AuthContext } from "../context/AuthProvider";
import { BrowserRouter } from "react-router-dom";

describe('NavBar', () => {
    it('Should render NavBar with Login Link', () => {
        const mockContext = {
            token: null, 
            setUser: jest.fn(), 
            setRole: jest.fn(),  
            setToken: jest.fn(), 
            role: null
        }
        render(
            <BrowserRouter>
            <AuthContext.Provider value={mockContext}>
                <Navbar />
            </AuthContext.Provider>
            </BrowserRouter>
        );

        expect(screen.getByRole('navigation')).toBeInTheDocument();
        expect(screen.getByRole("link", {name: "Login"})).toBeInTheDocument();
    })

    it('Should render NavBar with Profile, Search, and Logout Links', () => {
        const mockContext = {
            token: "token", 
            setUser: jest.fn(), 
            setRole: jest.fn(),  
            setToken: jest.fn(), 
            role: "USER"
        }
        render(
            <BrowserRouter>
            <AuthContext.Provider value={mockContext}>
                <Navbar />
            </AuthContext.Provider>
            </BrowserRouter>
        );

        expect(screen.getByRole('navigation')).toBeInTheDocument();
        expect(screen.getByRole("link", {name: "Profile"})).toBeInTheDocument();
        expect(screen.getByRole("link", {name: "Search"})).toBeInTheDocument();
        expect(screen.getByRole("link", {name: "Logout"})).toBeInTheDocument();
    })

    it('Should render NavBar with Profile, Search, Create Book, and Logout Links', () => {
        const mockContext = {
            token: "token", 
            setUser: jest.fn(), 
            setRole: jest.fn(),  
            setToken: jest.fn(), 
            role: "ADMIN"
        }
        render(
            <BrowserRouter>
            <AuthContext.Provider value={mockContext}>
                <Navbar />
            </AuthContext.Provider>
            </BrowserRouter>
        );

        expect(screen.getByRole('navigation')).toBeInTheDocument();
        expect(screen.getByRole("link", {name: "Profile"})).toBeInTheDocument();
        expect(screen.getByRole("link", {name: "Search"})).toBeInTheDocument();
        expect(screen.getByRole("link", {name: "Create Book"})).toBeInTheDocument();
        expect(screen.getByRole("link", {name: "Logout"})).toBeInTheDocument();
    })
})
