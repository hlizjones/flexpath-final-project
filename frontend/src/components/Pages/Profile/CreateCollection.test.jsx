import { fireEvent, render, screen } from '@testing-library/react';
import CreateCollection from './CreateCollection';
import useCreateRequest from '../../../hooks/useCreateRequest';
import { DataContext } from '../../../context/DataProvider';

const setRefresh = jest.fn();
const mockDataContext = {
    setRefresh: setRefresh
}

const mockHandleRequest = jest.fn();
jest.mock('../../../hooks/useCreateRequest');

jest.mock('../../../hooks/useMessageTimeout');

afterEach(() => {
    jest.clearAllMocks();
});

describe("CreateCollection", () => {
    it('Should render a form', () => {
        useCreateRequest.mockImplementation(() => ({
            handleRequest: mockHandleRequest,
            data: [],
            loading: false,
            error: null
        }));

        render(
            <DataContext.Provider value={mockDataContext}>
                <CreateCollection />
            </DataContext.Provider>
        );

        expect(screen.getByRole('form')).toBeInTheDocument();
    });

    it('Should call handleRequest with all fields completed when Create button is clicked', () => {
        useCreateRequest.mockImplementation(() => ({
            handleRequest: mockHandleRequest,
            data: [],
            loading: false,
            error: null
        }));

        render(
            <DataContext.Provider value={mockDataContext}>
                <CreateCollection />
            </DataContext.Provider>
        );

        const name = screen.getByPlaceholderText("Name of Collection");
        const description = screen.getByPlaceholderText("Describe your collection");
        const favorite = screen.getByLabelText("Favorite");
        const privacy = screen.getByLabelText("Private");

        fireEvent.change(name, {
            target: { value: "To Read" }
        });
        fireEvent.change(description, {
            target: { value: "Books I want to read" }
        });
        fireEvent.click(favorite);
        fireEvent.click(privacy);

        fireEvent.click(screen.getByRole("button", { name: "Create" }));

        expect(mockHandleRequest).toHaveBeenCalledWith({
            'name': 'To Read',
            'description': 'Books I want to read',
            'favorite': true,
            'privacy': true
        }, "api/collection", "POST");
    });

    it('Should call handleRequest with only name field completed when Create button is clicked', () => {
        useCreateRequest.mockImplementation(() => ({
            handleRequest: mockHandleRequest,
            data: [],
            loading: false,
            error: null
        }));

        render(
            <DataContext.Provider value={mockDataContext}>
                <CreateCollection />
            </DataContext.Provider>
        );

        const name = screen.getByPlaceholderText("Name of Collection");

        fireEvent.change(name, {
            target: { value: "To Read" }
        });

        fireEvent.click(screen.getByRole("button", { name: "Create" }));

        expect(mockHandleRequest).toHaveBeenCalledWith({
            'name': 'To Read',
            'favorite': false,
            'privacy': false
        }, "api/collection", "POST");
    });

    it('Should render a loading message', () => {
        useCreateRequest.mockImplementation(() => ({
            handleRequest: mockHandleRequest,
            data: [],
            loading: true,
            error: null
        }));

        render(
            <DataContext.Provider value={mockDataContext}>
                <CreateCollection />
            </DataContext.Provider>
        );

        expect(screen.getByText('Creating collection...')).toBeInTheDocument();
        expect(screen.queryByText('Error: Failed to create collection.')).not.toBeInTheDocument();
    });

    it('Should render a error message', () => {
        useCreateRequest.mockImplementation(() => ({
            handleRequest: mockHandleRequest,
            data: [],
            loading: false,
            error: "Error"
        }));

        render(
            <DataContext.Provider value={mockDataContext}>
                <CreateCollection />
            </DataContext.Provider>
        );

        expect(screen.queryByText('Creating collection...')).not.toBeInTheDocument();
        expect(screen.getByText('Error: Failed to create collection.')).toBeInTheDocument();
    });

    it('Should clear input fields when Create button is clicked', () => {
        useCreateRequest.mockImplementation(() => ({
            handleRequest: mockHandleRequest,
            data: [],
            loading: false,
            error: null
        }));

        render(
            <DataContext.Provider value={mockDataContext}>
                <CreateCollection />
            </DataContext.Provider>
        );

        const name = screen.getByPlaceholderText("Name of Collection");
        const description = screen.getByPlaceholderText("Describe your collection");
        const favorite = screen.getByLabelText("Favorite");
        const privacy = screen.getByLabelText("Private");

        fireEvent.change(name, {
            target: { value: "To Read" }
        });
        fireEvent.change(description, {
            target: { value: "Books I want to read" }
        });
        fireEvent.click(favorite);
        fireEvent.click(privacy);

        fireEvent.click(screen.getByRole("button", { name: "Create" }));

        expect(name).toHaveValue("");
        expect(description).toHaveValue("");
        expect(favorite).not.toBeChecked();
        expect(privacy).not.toBeChecked();
    });

    it('Should call setRefresh when data is returned from useCreateRequest hook', () => {
        useCreateRequest.mockImplementation(() => ({
            handleRequest: mockHandleRequest,
            data: [{
                "id": 4,
                "name": "Whodunit",
                "description": "Mystery books",
                "favorite": true,
                "privacy": false,
                "username": "admin",
                "isAdmin": null
            }],
            loading: false,
            error: null
        }));

        render(
            <DataContext.Provider value={mockDataContext}>
                <CreateCollection />
            </DataContext.Provider>
        );

        expect(setRefresh).toHaveBeenCalled();
    });
})