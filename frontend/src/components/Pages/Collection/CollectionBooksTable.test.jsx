import { fireEvent, render, screen } from '@testing-library/react';
import { within } from "@testing-library/dom"
import useCreateRequest from '../../../hooks/useCreateRequest';
import * as useSortHook from '../../../hooks/useSort';
import CollectionBooksTable from './CollectionBooksTable';
import { DataContext } from '../../../context/DataProvider';
import { AuthContext } from '../../../context/AuthProvider';
import useFetch from '../../../hooks/useFetch';

const setRefresh = jest.fn();
const mockDataContext = {
    setRefresh: setRefresh
}

const mockHandleLoad = jest.fn();
jest.mock('../../../hooks/useLoadPage', () => {
    return {
        __esModule: true,
        default: jest.fn(() => ({ handleLoad: mockHandleLoad }))
    }
});

const mockHandleRequest = jest.fn();
jest.mock('../../../hooks/useCreateRequest');

jest.mock('../../../hooks/useMessageTimeout');

jest.mock('../../../hooks/useFetch');

jest.mock('../../../hooks/useSort');

describe("CollectionBooksTable", () => {
    const data = [{
        "id": 1,
        "title": "Atomic Habits",
        "author": "James Clear",
        "genre": "Self Help"
    },
    {
        "id": 2,
        "title": "Pride and Prejudice",
        "author": "Jane Austen",
        "genre": "Romance"
    },
    {
        "id": 3,
        "title": "The Adventures of Sherlock Holmes",
        "author": "Sir Authur Conan Doyle",
        "genre": "Mystery"
    }]
    const sortedData = [{
        "id": 1,
        "title": "Atomic Habits",
        "author": "James Clear",
        "genre": "Self Help"
    }, {
        "id": 2,
        "title": "Pride and Prejudice",
        "author": "Jane Austen",
        "genre": "Romance"
    },
    {
        "id": 3,
        "title": "The Adventures of Sherlock Holmes",
        "author": "Sir Authur Conan Doyle",
        "genre": "Mystery"
    }]

    it("Should render loading message", () => {
        const mockAuthContext = {
            token: "token",
            username: "admin",
            role: "ADMIN"
        }

        useCreateRequest.mockImplementation(() => ({
            handleRequest: mockHandleRequest,
            data: [],
            loading: false,
            error: null
        }));
        useFetch.mockImplementation(() => ({ data: [], loading: true, error: null }));
        useSortHook.default.mockImplementation(() => ({ sortedData: [] }));

        render(
            <AuthContext.Provider value={mockAuthContext}>
                <DataContext.Provider value={mockDataContext}>
                    <CollectionBooksTable id={1} username={"admin"} />
                </DataContext.Provider>
            </AuthContext.Provider>
        );

        expect(screen.getByText("Loading books...")).toBeInTheDocument();
        expect(screen.queryByText("Error: Failed to load books.")).not.toBeInTheDocument();
    });

    it("Should render error message", () => {
        const mockAuthContext = {
            token: "token",
            username: "admin",
            role: "ADMIN"
        }

        useCreateRequest.mockImplementation(() => ({
            handleRequest: mockHandleRequest,
            data: [],
            loading: false,
            error: null
        }));
        useFetch.mockImplementation(() => ({ data: [], loading: false, error: "Error" }));
        useSortHook.default.mockImplementation(() => ({ sortedData: [] }));

        render(
            <AuthContext.Provider value={mockAuthContext}>
                <DataContext.Provider value={mockDataContext}>
                    <CollectionBooksTable id={1} username={"admin"} />
                </DataContext.Provider>
            </AuthContext.Provider>
        );

        expect(screen.queryByText("Loading books...")).not.toBeInTheDocument();
        expect(screen.getByText("Error: Failed to load books.")).toBeInTheDocument();
    })

    it("Should only render 'No books to display.' message", () => {
        const mockAuthContext = {
            token: "token",
            username: "admin",
            role: "ADMIN"
        }

        useCreateRequest.mockImplementation(() => ({
            handleRequest: mockHandleRequest,
            data: [],
            loading: false,
            error: null
        }));
        useFetch.mockImplementation(() => ({ data: [], loading: false, error: null }));
        useSortHook.default.mockImplementation(() => ({ sortedData: [] }));

        render(
            <AuthContext.Provider value={mockAuthContext}>
                <DataContext.Provider value={mockDataContext}>
                    <CollectionBooksTable id={1} username={"admin"} />
                </DataContext.Provider>
            </AuthContext.Provider>
        );

        expect(screen.getByText("No books to display.")).toBeInTheDocument();
        expect(screen.queryByText("Loading books...")).not.toBeInTheDocument();
        expect(screen.queryByText("Error: Failed to load books.")).not.toBeInTheDocument();
        expect(screen.queryByRole('table')).not.toBeInTheDocument();
    });

    it("Should only render a table", () => {
        const mockAuthContext = {
            token: "token",
            username: "admin",
            role: "ADMIN"
        }

        useCreateRequest.mockImplementation(() => ({
            handleRequest: mockHandleRequest,
            data: [],
            loading: false,
            error: null
        }));
        useFetch.mockImplementation(() => ({ data: data, loading: false, error: null }));
        useSortHook.default.mockImplementation(() => ({ sortedData: sortedData }));

        render(
            <AuthContext.Provider value={mockAuthContext}>
                <DataContext.Provider value={mockDataContext}>
                    <CollectionBooksTable id={1} username={"admin"} />
                </DataContext.Provider>
            </AuthContext.Provider>
        );

        expect(screen.queryByText("No books to display.")).not.toBeInTheDocument();
        expect(screen.queryByText("Loading books...")).not.toBeInTheDocument();
        expect(screen.queryByText("Error: Failed to load books.")).not.toBeInTheDocument();
        expect(screen.getByRole('table')).toBeInTheDocument();
        const rows = screen.getAllByTestId("bookRow");
        expect(rows.length).toBe(data.length);
    });

    it("Should call setSort when a header is clicked", () => {
        const mockAuthContext = {
            token: "token",
            username: "admin",
            role: "ADMIN"
        }

        useCreateRequest.mockImplementation(() => ({
            handleRequest: mockHandleRequest,
            data: [],
            loading: false,
            error: null
        }));
        useFetch.mockImplementation(() => ({ data: data, loading: false, error: null }));
        const useSort = jest.spyOn(useSortHook, 'default').mockImplementation(() => ({ sortedData: sortedData }));

        render(
            <AuthContext.Provider value={mockAuthContext}>
                <DataContext.Provider value={mockDataContext}>
                    <CollectionBooksTable id={1} username={"admin"} />
                </DataContext.Provider>
            </AuthContext.Provider>
        );

        const headers = screen.getAllByTestId("headers")
        for (let header of headers) {
            fireEvent.click(header)
            expect(useSort).toHaveBeenCalled();
        }
    });

    it("Should call handleLoad when the Title, Author, or Genre of a row is clicked", () => {
        const mockAuthContext = {
            token: "token",
            username: "admin",
            role: "ADMIN"
        }

        useCreateRequest.mockImplementation(() => ({
            handleRequest: mockHandleRequest,
            data: [],
            loading: false,
            error: null
        }));
        useFetch.mockImplementation(() => ({ data: data, loading: false, error: null }));
        useSortHook.default.mockImplementation(() => ({ sortedData: sortedData }));

        render(
            <AuthContext.Provider value={mockAuthContext}>
                <DataContext.Provider value={mockDataContext}>
                    <CollectionBooksTable id={1} username={"admin"} />
                </DataContext.Provider>
            </AuthContext.Provider>
        );

        const rows = screen.getAllByTestId("bookRow");
        for (let row of rows) {
            const cells = within(row).getAllByRole('cell');
            for (let cell of cells) {
                if (cell.className === "text-capitalize") {
                    fireEvent.click(cell);
                    expect(mockHandleLoad).toHaveBeenCalled();
                }
            }
        }
    });

    it("Should render trash icon for each row when Username matches Collection Username", () => {
        const mockAuthContext = {
            token: "token",
            username: "user",
            role: "USER"
        }

        useCreateRequest.mockImplementation(() => ({
            handleRequest: mockHandleRequest,
            data: [],
            loading: false,
            error: null
        }));
        useFetch.mockImplementation(() => ({ data: data, loading: false, error: null }));
        useSortHook.default.mockImplementation(() => ({ sortedData: sortedData }));

        render(
            <AuthContext.Provider value={mockAuthContext}>
                <DataContext.Provider value={mockDataContext}>
                    <CollectionBooksTable id={1} username={"user"} />
                </DataContext.Provider>
            </AuthContext.Provider>
        );

        const rows = screen.getAllByTestId("bookRow");
        for (let row of rows) {
            expect(row).toContainElement(within(row).getByTestId("deleteIcon"));
        }
    });

    it("Should not render trash icon for each row when Username does not match Collection Username", () => {
        const mockAuthContext = {
            token: "token",
            username: "user",
            role: "USER"
        }

        useCreateRequest.mockImplementation(() => ({
            handleRequest: mockHandleRequest,
            data: [],
            loading: false,
            error: null
        }));
        useFetch.mockImplementation(() => ({ data: data, loading: false, error: null }));
        useSortHook.default.mockImplementation(() => ({ sortedData: sortedData }));

        render(
            <AuthContext.Provider value={mockAuthContext}>
                <DataContext.Provider value={mockDataContext}>
                    <CollectionBooksTable id={1} username={"admin"} />
                </DataContext.Provider>
            </AuthContext.Provider>
        );

        const rows = screen.getAllByTestId("bookRow");
        for (let row of rows) {
            expect(row).not.toContainElement(within(row).queryByTestId("deleteIcon"));
        }
    });

    it("Should render trash icon for each row when Role is Admin", () => {
        const mockAuthContext = {
            token: "token",
            username: "admin",
            role: "ADMIN"
        }

        useCreateRequest.mockImplementation(() => ({
            handleRequest: mockHandleRequest,
            data: [],
            loading: false,
            error: null
        }));
        useFetch.mockImplementation(() => ({ data: data, loading: false, error: null }));
        useSortHook.default.mockImplementation(() => ({ sortedData: sortedData }));

        render(
            <AuthContext.Provider value={mockAuthContext}>
                <DataContext.Provider value={mockDataContext}>
                    <CollectionBooksTable id={1} username={"user"} />
                </DataContext.Provider>
            </AuthContext.Provider>
        );

        const rows = screen.getAllByTestId("bookRow");
        for (let row of rows) {
            expect(row).toContainElement(within(row).getByTestId("deleteIcon"));
        }
    });

    it("Should call handleRequest when trash icon is clicked", () => {
        const mockAuthContext = {
            token: "token",
            username: "admin",
            role: "ADMIN"
        }

        useCreateRequest.mockImplementation(() => ({
            handleRequest: mockHandleRequest,
            data: [],
            loading: false,
            error: null
        }));
        useFetch.mockImplementation(() => ({ data: data, loading: false, error: null }));
        useSortHook.default.mockImplementation(() => ({ sortedData: sortedData }));

        render(
            <AuthContext.Provider value={mockAuthContext}>
                <DataContext.Provider value={mockDataContext}>
                    <CollectionBooksTable id={1} username={"admin"} />
                </DataContext.Provider>
            </AuthContext.Provider>
        );

        const rows = screen.getAllByTestId("bookRow");
        for (let row of rows) {
            fireEvent.click(within(row).getByTestId("deleteIcon"));
            expect(mockHandleRequest).toHaveBeenCalled();
        }

        expect(mockHandleRequest).toHaveBeenCalledTimes(rows.length);
    });

    it("Should render removing book loading message", () => {
        const mockAuthContext = {
            token: "token",
            username: "admin",
            role: "ADMIN"
        }

        useCreateRequest.mockImplementation(() => ({
            handleRequest: mockHandleRequest,
            data: [],
            loading: true,
            error: null
        }));
        useFetch.mockImplementation(() => ({ data: [], loading: false, error: null }));
        useSortHook.default.mockImplementation(() => ({ sortedData: [] }));

        render(
            <AuthContext.Provider value={mockAuthContext}>
                <DataContext.Provider value={mockDataContext}>
                    <CollectionBooksTable id={1} username={"admin"} />
                </DataContext.Provider>
            </AuthContext.Provider>
        );

        expect(screen.getByText("Removing book from collection...")).toBeInTheDocument();
        expect(screen.queryByText("Error: Failed to remove book.")).not.toBeInTheDocument();
    });

    it("Should render error removing book message", () => {
        const mockAuthContext = {
            token: "token",
            username: "admin",
            role: "ADMIN"
        }

        useCreateRequest.mockImplementation(() => ({
            handleRequest: mockHandleRequest,
            data: [],
            loading: false,
            error: "Error"
        }));
        useFetch.mockImplementation(() => ({ data: [], loading: false, error: null }));
        useSortHook.default.mockImplementation(() => ({ sortedData: [] }));

        render(
            <AuthContext.Provider value={mockAuthContext}>
                <DataContext.Provider value={mockDataContext}>
                    <CollectionBooksTable id={1} username={"admin"} />
                </DataContext.Provider>
            </AuthContext.Provider>
        );

        expect(screen.queryByText("Removing book from collection...")).not.toBeInTheDocument();
        expect(screen.getByText("Error: Failed to remove book.")).toBeInTheDocument();
    });

    it("Should call setRefresh", () => {
        const mockAuthContext = {
            token: "token",
            username: "admin",
            role: "ADMIN"
        }

        useCreateRequest.mockImplementation(() => ({
            handleRequest: mockHandleRequest,
            data: "Book deleted.",
            loading: false,
            error: null
        }));
        useFetch.mockImplementation(() => ({ data: [], loading: false, error: null }));
        useSortHook.default.mockImplementation(() => ({ sortedData: [] }));

        render(
            <AuthContext.Provider value={mockAuthContext}>
                <DataContext.Provider value={mockDataContext}>
                    <CollectionBooksTable id={1} username={"admin"} />
                </DataContext.Provider>
            </AuthContext.Provider>
        );

        expect(setRefresh).toHaveBeenCalled();
    });
})