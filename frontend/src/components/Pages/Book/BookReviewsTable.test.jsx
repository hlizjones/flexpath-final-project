import { fireEvent, render, screen } from '@testing-library/react';
import {within} from "@testing-library/dom"
import BookReviewsTable from './BookReviewsTable';
import * as useSortHook from '../../../hooks/useSort';
import { AuthContext } from '../../../context/AuthProvider';
import { DataContext } from '../../../context/DataProvider';
import useFetch from '../../../hooks/useFetch';

const mockHandleLoad = jest.fn();
jest.mock('../../../hooks/useLoadPage', () => {
    return {
        __esModule: true,
        default: jest.fn(() => ({ handleLoad: mockHandleLoad }))
    }
});

jest.mock('../../../hooks/useFetch');

jest.mock('../../../hooks/useSort');


describe("BookReviewsTable", () => {
    const data = [
        {
            "id": 1,
            "bookId": 1,
            "rating": 4,
            "content": "Very helpful life tips!",
            "privacy": false,
            "username": "user",
            "isAdmin": null
        },
        {
            "id": 2,
            "bookId": 2,
            "rating": 5,
            "content": "Loved it!",
            "privacy": false,
            "username": "admin",
            "isAdmin": null
        }
    ]
    const sortedData = [
        {
            "id": 1,
            "bookId": 1,
            "rating": 4,
            "content": "Very helpful life tips!",
            "privacy": false,
            "username": "user",
            "isAdmin": null
        },
        {
            "id": 2,
            "bookId": 2,
            "rating": 5,
            "content": "Loved it!",
            "privacy": false,
            "username": "admin",
            "isAdmin": null
        }
    ]

    it('Should render a loading message', () => {
        const mockAuthContext = {
            token: "token",
            username: "admin",
            role: "ADMIN"
        }

        useFetch.mockImplementation(() => ({ data: [], loading: true, error: null }));
        useSortHook.default.mockImplementation(() => ({ sortedData: [] }))

        render(
            <AuthContext.Provider value={mockAuthContext}>
                <DataContext.Provider value={{refresh: true}}>
                    <BookReviewsTable url={'api/review?bookId=1'} options={{ headers: { 'Authorization': `Bearer token` } }} />
                </DataContext.Provider>
            </AuthContext.Provider>
        )

        expect(screen.getByText("Loading reviews...")).toBeInTheDocument();
        expect(screen.queryByText("Error: Failed to load reviews.")).not.toBeInTheDocument();

    })

    it('Should render an error message', () => {
        const mockAuthContext = {
            token: "token",
            username: "admin",
            role: "ADMIN"
        }

        useFetch.mockImplementation(() => ({ data: [], loading: false, error: "Error" }));
        useSortHook.default.mockImplementation(() => ({ sortedData: [] }))

        render(
            <AuthContext.Provider value={mockAuthContext}>
                <DataContext.Provider value={{refresh: true}}>
                    <BookReviewsTable url={'api/review?bookId=1'} options={{ headers: { 'Authorization': `Bearer token` } }} />
                </DataContext.Provider>
            </AuthContext.Provider>
        )

        expect(screen.queryByText("Loading reviews...")).not.toBeInTheDocument();
        expect(screen.getByText("Error: Failed to load reviews.")).toBeInTheDocument();

    })

    it('Should render only the "No reviews to display." message', () => {
        const mockAuthContext = {
            token: "token",
            username: "admin",
            role: "ADMIN"
        }

        useFetch.mockImplementation(() => ({ data: [], loading: false, error: null }));
        useSortHook.default.mockImplementation(() => ({ sortedData: [] }))

        render(
            <AuthContext.Provider value={mockAuthContext}>
                <DataContext.Provider value={{refresh: true}}>
                    <BookReviewsTable url={'api/review?bookId=1'} options={{ headers: { 'Authorization': `Bearer token` } }} />
                </DataContext.Provider>
            </AuthContext.Provider>
        )

        expect(screen.getByText("No reviews to display.")).toBeInTheDocument();
        expect(screen.queryByText("Loading reviews...")).not.toBeInTheDocument();
        expect(screen.queryByText("Error: Failed to load reviews.")).not.toBeInTheDocument();
        expect(screen.queryByRole('table')).not.toBeInTheDocument();

    })

    it('Should only render a table', () => {
        const mockAuthContext = {
            token: "token",
            username: "admin",
            role: "ADMIN"
        }

        useFetch.mockImplementation(() => ({ data: data, loading: false, error: null }));
        useSortHook.default.mockImplementation(() => ({ sortedData: sortedData }))

        render(
            <AuthContext.Provider value={mockAuthContext}>
                <DataContext.Provider value={{refresh: true}}>
                    <BookReviewsTable url={'api/review?bookId=1'} options={{ headers: { 'Authorization': `Bearer token` } }} />
                </DataContext.Provider>
            </AuthContext.Provider>
        )

        expect(screen.queryByText("No reviews to display.")).not.toBeInTheDocument();
        expect(screen.queryByText("Loading reviews...")).not.toBeInTheDocument();
        expect(screen.queryByText("Error: Failed to load reviews.")).not.toBeInTheDocument();
        expect(screen.getByRole('table')).toBeInTheDocument();
        const rows = screen.getAllByTestId("reviewRow")
        expect(rows.length).toBe(data.length)

    })

    it('Should call setSort when a header is clicked', () => {
        const mockAuthContext = {
            token: "token",
            username: "admin",
            role: "ADMIN"
        }

        useFetch.mockImplementation(() => ({ data: data, loading: false, error: null }));
        const useSort = jest.spyOn(useSortHook, 'default').mockImplementation(() => ({ sortedData: sortedData }))

        render(
            <AuthContext.Provider value={mockAuthContext}>
                <DataContext.Provider value={{refresh: true}}>
                    <BookReviewsTable url={'api/review?bookId=1'} options={{ headers: { 'Authorization': `Bearer token` } }} />
                </DataContext.Provider>
            </AuthContext.Provider>
        )

        const headers = screen.getAllByTestId("headers")
        for (let header of headers) {
            fireEvent.click(header)
            expect(useSort).toHaveBeenCalled();
        }
    })

    it('Should render pencil icon when Username matches Review Username', () => {
        const mockAuthContext = {
            token: "token",
            username: "user",
            role: "USER"
        }

        useFetch.mockImplementation(() => ({ data: data, loading: false, error: null }));
        useSortHook.default.mockImplementation(() => ({ sortedData: sortedData }))

        render(
            <AuthContext.Provider value={mockAuthContext}>
                <DataContext.Provider value={{refresh: true}}>
                    <BookReviewsTable url={'api/review?bookId=1'} options={{ headers: { 'Authorization': `Bearer token` } }} />
                </DataContext.Provider>
            </AuthContext.Provider>
        )

        const rows = screen.getAllByTestId("reviewRow")
        for (let row of rows) {
            if(row.contains(screen.getByRole('cell', {name: "user"}))) {
                expect(row).toContainElement(within(row).getByTestId("editIcon"))
            }
        }
    })

    it('Should not render pencil icon when Username does not match Review Username', () => {
        const mockAuthContext = {
            token: "token",
            username: "user",
            role: "USER"
        }

        useFetch.mockImplementation(() => ({ data: data, loading: false, error: null }));
        useSortHook.default.mockImplementation(() => ({ sortedData: sortedData }))

        render(
            <AuthContext.Provider value={mockAuthContext}>
                <DataContext.Provider value={{refresh: true}}>
                    <BookReviewsTable url={'api/review?bookId=1'} options={{ headers: { 'Authorization': `Bearer token` } }} />
                </DataContext.Provider>
            </AuthContext.Provider>
        )

        const rows = screen.getAllByTestId("reviewRow")
        for (let row of rows) {
            if(row.contains(screen.queryByRole('cell', {name: "admin"}))) {
                expect(row).not.toContainElement(within(row).queryByTestId("editIcon"))
            }
        }
    })

    it('Should render pencil icon for each row when Role is Admin', () => {
        const mockAuthContext = {
            token: "token",
            username: "admin",
            role: "ADMIN"
        }

        useFetch.mockImplementation(() => ({ data: data, loading: false, error: null }));
        useSortHook.default.mockImplementation(() => ({ sortedData: sortedData }))

        render(
            <AuthContext.Provider value={mockAuthContext}>
                <DataContext.Provider value={{refresh: true}}>
                    <BookReviewsTable url={'api/review?bookId=1'} options={{ headers: { 'Authorization': `Bearer token` } }} />
                </DataContext.Provider>
            </AuthContext.Provider>
        )

        const rows = screen.getAllByTestId("reviewRow")
        for (let row of rows) {
            expect(row).toContainElement(within(row).getByTestId("editIcon"))
        }
    })

    it('Should call handleLoad when pencil icon is clicked', () => {
        const mockAuthContext = {
            token: "token",
            username: "admin",
            role: "ADMIN"
        }

        useFetch.mockImplementation(() => ({ data: data, loading: false, error: null }));
        useSortHook.default.mockImplementation(() => ({ sortedData: sortedData }))

        render(
            <AuthContext.Provider value={mockAuthContext}>
                <DataContext.Provider value={{refresh: true}}>
                    <BookReviewsTable url={'api/review?bookId=1'} options={{ headers: { 'Authorization': `Bearer token` } }} />
                </DataContext.Provider>
            </AuthContext.Provider>
        )

        const rows = screen.getAllByTestId("reviewRow")
        for (let row of rows) {
            fireEvent.click(within(row).getByTestId("editIcon"))
            expect(mockHandleLoad).toHaveBeenCalled();
        }

        expect(mockHandleLoad).toHaveBeenCalledTimes(rows.length)
    })
})