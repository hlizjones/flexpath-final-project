import React from "react";
import { render, screen } from '@testing-library/react'
import Navbar from "./Navbar";
import AuthProvider from "../context/AuthProvider";
import { BrowserRouter } from "react-router-dom";

describe('NavBar', () => {
    test('renders a navbar', () => {
        render(
            <BrowserRouter>
            <AuthProvider>
                <Navbar />
            </AuthProvider>
            </BrowserRouter>
        )

        const navbar = screen.getByRole('navigation')
        expect(navbar).not.toBeNull()
    })
})
