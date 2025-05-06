import { fireEvent, render, screen } from '@testing-library/react';
import { within } from "@testing-library/dom"
import UserCollections from './UserCollections';
import useFetch from '../../../hooks/useFetch';
import * as useSortHook from '../../../hooks/useSort';
import { AuthContext } from '../../../context/AuthProvider';
import { DataContext } from '../../../context/DataProvider';

const mockAuthContext = {
    token: "token"
}

const mockDataContext = {
    refresh: true
}

const mockHandleLoad = jest.fn();
jest.mock('../../../hooks/useLoadPage', () => {
    return {
        __esModule: true,
        default: jest.fn(() => ({ handleLoad: mockHandleLoad }))
    }
});

jest.mock('../../../hooks/useFetch');

jest.mock('../../../hooks/useSort');

afterEach(() => {
    jest.clearAllMocks();
});

describe("UserCollections", () => {
    const data = [
        {
            "id": 1,
            "name": "Favorites",
            "description": "My favorite books",
            "favorite": true,
            "privacy": false,
            "username": "admin",
            "isAdmin": null
        },
        {
            "id": 2,
            "name": "To Read",
            "description": "Books I want to read",
            "favorite": false,
            "privacy": true,
            "username": "admin",
            "isAdmin": null
        },
        {
            "id": 3,
            "name": "Study",
            "description": "Books to read for school",
            "favorite": false,
            "privacy": false,
            "username": "admin",
            "isAdmin": null
        }
    ]
    const sortedData = [
        {
            "id": 1,
            "name": "Favorites",
            "description": "My favorite books",
            "favorite": true,
            "privacy": false,
            "username": "admin",
            "isAdmin": null
        },
        {
            "id": 2,
            "name": "To Read",
            "description": "Books I want to read",
            "favorite": false,
            "privacy": true,
            "username": "admin",
            "isAdmin": null
        },
        {
            "id": 3,
            "name": "Study",
            "description": "Books to read for school",
            "favorite": false,
            "privacy": false,
            "username": "admin",
            "isAdmin": null
        }
    ]

    it('Should render loading message', () => {
        useFetch.mockImplementation(() => ({ data: [], loading: true, error: null }));
        useSortHook.default.mockImplementation(() => ({ sortedData: [] }));

        render(
            <AuthContext.Provider value={mockAuthContext}>
                <DataContext.Provider value={mockDataContext}>
                    <UserCollections />
                </DataContext.Provider>
            </AuthContext.Provider>
        );

        expect(screen.getByText("Loading collections...")).toBeInTheDocument();
        expect(screen.queryByText("Error: Failed to load collections.")).not.toBeInTheDocument();
    });

    it('Should render error message', () => {
        useFetch.mockImplementation(() => ({ data: [], loading: false, error: "Error" }));
        useSortHook.default.mockImplementation(() => ({ sortedData: [] }));

        render(
            <AuthContext.Provider value={mockAuthContext}>
                <DataContext.Provider value={mockDataContext}>
                    <UserCollections />
                </DataContext.Provider>
            </AuthContext.Provider>
        );

        expect(screen.queryByText("Loading collections...")).not.toBeInTheDocument();
        expect(screen.getByText("Error: Failed to load collections.")).toBeInTheDocument();
    });

    it('Should render "No collections to display." message', () => {
        useFetch.mockImplementation(() => ({ data: [], loading: false, error: null }));
        useSortHook.default.mockImplementation(() => ({ sortedData: [] }));

        render(
            <AuthContext.Provider value={mockAuthContext}>
                <DataContext.Provider value={mockDataContext}>
                    <UserCollections />
                </DataContext.Provider>
            </AuthContext.Provider>
        );

        expect(screen.getByText("No collections to display.")).toBeInTheDocument();
        expect(screen.queryByText("Loading collections...")).not.toBeInTheDocument();
        expect(screen.queryByText("Error: Failed to load collections.")).not.toBeInTheDocument();
        expect(screen.queryByRole('table')).not.toBeInTheDocument();
    });

    it('Should only render cards', () => {

        useFetch.mockImplementation(() => ({ data: data, loading: false, error: null }));
        useSortHook.default.mockImplementation(() => ({ sortedData: sortedData }));

        render(
            <AuthContext.Provider value={mockAuthContext}>
                <DataContext.Provider value={mockDataContext}>
                    <UserCollections />
                </DataContext.Provider>
            </AuthContext.Provider>
        );

        expect(screen.queryByText("No collections to display.")).not.toBeInTheDocument();
        expect(screen.queryByText("Loading collections...")).not.toBeInTheDocument();
        expect(screen.queryByText("Error: Failed to load collections.")).not.toBeInTheDocument();
        const cards = screen.getAllByTestId('card');
        for (let card of cards) {
            expect(card).toBeInTheDocument();
        }
        expect(cards.length).toBe(data.length);
    });

    it('Should call handleLoad when card is clicked', () => {
        useFetch.mockImplementation(() => ({ data: data, loading: false, error: null }));
        useSortHook.default.mockImplementation(() => ({ sortedData: sortedData }));

        render(
            <AuthContext.Provider value={mockAuthContext}>
                <DataContext.Provider value={mockDataContext}>
                    <UserCollections />
                </DataContext.Provider>
            </AuthContext.Provider>
        );

        const cards = screen.getAllByTestId('card');
        for (let card of cards) {
            const headers = within(card).getAllByRole('heading');
            for (let header of headers) {
                fireEvent.click(header);
                expect(mockHandleLoad).toHaveBeenCalled();
            }
        }
        expect(mockHandleLoad).toHaveBeenCalledTimes(cards.length);
    });

    it('Should call useSort when Alphabetical Ascending is clicked', () => {
        useFetch.mockImplementation(() => ({ data: data, loading: false, error: null }));
        const useSort = jest.spyOn(useSortHook, 'default').mockImplementation(() => ({ sortedData: sortedData }));

        render(
            <AuthContext.Provider value={mockAuthContext}>
                <DataContext.Provider value={mockDataContext}>
                    <UserCollections />
                </DataContext.Provider>
            </AuthContext.Provider>
        );

        fireEvent.click(screen.getByTestId("Alphabetical Ascending"));
        expect(useSort).toHaveBeenCalled();
    });

    it('Should call useSort when Alphabetical Descending is clicked', () => {
        useFetch.mockImplementation(() => ({ data: data, loading: false, error: null }));
        const useSort = jest.spyOn(useSortHook, 'default').mockImplementation(() => ({ sortedData: sortedData }));

        render(
            <AuthContext.Provider value={mockAuthContext}>
                <DataContext.Provider value={mockDataContext}>
                    <UserCollections />
                </DataContext.Provider>
            </AuthContext.Provider>
        );

        fireEvent.click(screen.getByTestId("Alphabetical Descending"));
        expect(useSort).toHaveBeenCalled();
    });
})