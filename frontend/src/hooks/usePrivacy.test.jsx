import React from "react";
import { fireEvent, render, screen } from '@testing-library/react'
import usePrivacy from "./usePrivacy";

function TestComponent() {
    const { handlePrivacy } = usePrivacy();

    const handleClick = (e) => {
        e.preventDefault();
        const id = e.currentTarget.id;
        handlePrivacy(e, `api/collection/${id}`);
    }

    return (
        <>
            <i data-testid={"intialLock"} className="bi bi-lock h1" id={1} onClick={handleClick}></i>
            <i data-testid={"intialUnlock"} className="bi bi-unlock h1" id={2} onClick={handleClick}></i>
        </>
    );
}

const mockHandleRequest = jest.fn();
jest.mock('./useCreateRequest', () => {
    return {
        __esModule: true,
        default: jest.fn(() => ({handleRequest: mockHandleRequest}))
    }
});

beforeEach(() => {
    render(<TestComponent />);
});

afterEach(() => {
    jest.clearAllMocks();
});

describe("usePrivacy", () => {
    it('Should call handleRequest with "false" when locked icon is clicked', () => {
        fireEvent.click(screen.getByTestId("intialLock"));

        expect(mockHandleRequest).toHaveBeenCalledWith({privacy: false}, "api/collection/1", "PUT");
    });

    it('Should change locked icon to unlocked icon', () => {
        fireEvent.click(screen.getByTestId("intialLock"));

        expect(screen.getByTestId("intialLock").className).toBe("bi bi-unlock h1");
    });

    it('Should call handleRequest with "true" when unlocked icon is clicked', () => {
        fireEvent.click(screen.getByTestId("intialUnlock"));

        expect(mockHandleRequest).toHaveBeenCalledWith({privacy: true}, "api/collection/2", "PUT");
    });

    it('Should  change unlocked icon to locked icon', () => {
        fireEvent.click(screen.getByTestId("intialUnlock"));

        expect(screen.getByTestId("intialUnlock").className).toBe("bi bi-lock h1");
    });
})
