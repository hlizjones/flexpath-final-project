import { fireEvent, render, screen } from '@testing-library/react';
import CollectionManager from './CollectionManager';
import useCreateRequest from '../../../hooks/useCreateRequest';
import { DataContext } from '../../../context/DataProvider';

const setRefresh = jest.fn();
const mockDataContext = {
    setRefresh: setRefresh
}

const mockHandleRequest = jest.fn();
jest.mock('../../../hooks/useCreateRequest');

jest.mock('../../../hooks/useMessageTimeout');

jest.mock('./DeleteCollection')

afterEach(() => {
    jest.clearAllMocks();
});

describe("CollectionManager", () => {
    it('Should render a form', () => {
        useCreateRequest.mockImplementation(() => ({
            handleRequest: mockHandleRequest,
            data: [],
            loading: false,
            error: null
        }));

        render(
            <DataContext.Provider value={mockDataContext}>
                <CollectionManager id={1} />
            </DataContext.Provider>
        );

        expect(screen.getByRole('form')).toBeInTheDocument();
    });

    it('Should call handleRequest when Update button is clicked', () => {
        useCreateRequest.mockImplementation(() => ({
            handleRequest: mockHandleRequest,
            data: [],
            loading: false,
            error: null
        }));

        render(
            <DataContext.Provider value={mockDataContext}>
                <CollectionManager id={1} />
            </DataContext.Provider>
        );

        const name = screen.getByPlaceholderText("Name of Collection");
        const description = screen.getByPlaceholderText("Describe your collection");

        fireEvent.change(name, {
            target: { value: "Favorites" }
        });

        fireEvent.change(description, {
            target: { value: "Books I love" }
        });

        fireEvent.click(screen.getByRole("button", { name: "Update" }));

        expect(mockHandleRequest).toHaveBeenCalledWith({
            'name': 'Favorites',
            'description': 'Books I love'
        }, "api/collection/1", "PUT");

    })

    it('Should render updating collection message', () => {
        useCreateRequest.mockImplementation(() => ({
            handleRequest: mockHandleRequest,
            data: [],
            loading: true,
            error: null
        }));

        render(
            <DataContext.Provider value={mockDataContext}>
                <CollectionManager id={1} />
            </DataContext.Provider>
        );

        expect(screen.getByText('Updating collection...')).toBeInTheDocument();
        expect(screen.queryByText('Error: Failed to update collection.')).not.toBeInTheDocument();
    })

    it('Should render error updating collection message', () => {
        useCreateRequest.mockImplementation(() => ({
            handleRequest: mockHandleRequest,
            data: [],
            loading: false,
            error: "Error"
        }));

        render(
            <DataContext.Provider value={mockDataContext}>
                <CollectionManager id={1} />
            </DataContext.Provider>
        );

        expect(screen.queryByText('Updating collection...')).not.toBeInTheDocument();
        expect(screen.getByText('Error: Failed to update collection.')).toBeInTheDocument();
    })

    it('Should clear input fields when Update button is clicked', () => {
        useCreateRequest.mockImplementation(() => ({
            handleRequest: mockHandleRequest,
            data: [],
            loading: false,
            error: null
        }));

        render(
            <DataContext.Provider value={mockDataContext}>
                <CollectionManager id={1} />
            </DataContext.Provider>
        );

        const name = screen.getByPlaceholderText("Name of Collection");
        const description = screen.getByPlaceholderText("Describe your collection");

        fireEvent.change(name, {
            target: { value: "Favorites" }
        });

        fireEvent.change(description, {
            target: { value: "Books I love" }
        });

        fireEvent.click(screen.getByRole("button", { name: "Update" }));

        expect(name).toHaveValue("");
        expect(description).toHaveValue("");
    })

    it('Should call setRefresh when data is returned from useCreateRequest hook', () => {
        useCreateRequest.mockImplementation(() => ({
            handleRequest: mockHandleRequest,
            data: [{
                "id": 2,
                "name": "Study",
                "description": "Books for school",
                "favorite": false,
                "privacy": false,
                "username": "admin",
                "isAdmin": null
            }],
            loading: false,
            error: null
        }));

        render(
            <DataContext.Provider value={mockDataContext}>
                <CollectionManager id={1} />
            </DataContext.Provider>
        );

        expect(setRefresh).toHaveBeenCalled();
    })
})
