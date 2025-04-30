import React from "react";
import { render, screen } from '@testing-library/react'
import Navbar from "./Navbar";
import AuthProvider from "../context/AuthProvider";

describe('NavBar', () => {
    test('renders a navbar', () => {
        render(
            <AuthProvider>
                <Navbar />
            </AuthProvider>
        )

        const navbar = screen.getByRole('navigation')
        expect(navbar).toBeInTheDocument()
    })
})
