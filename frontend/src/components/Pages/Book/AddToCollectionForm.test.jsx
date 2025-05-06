import { fireEvent, render, screen } from '@testing-library/react';
import AddToCollectionForm from './AddToCollectionForm';
import useCreateRequest from '../../../hooks/useCreateRequest';

const mockHandleRequest = jest.fn();
jest.mock('../../../hooks/useCreateRequest');

jest.mock('../../../hooks/useMessageTimeout');

afterEach(() => {
    jest.clearAllMocks();
});

describe("AddToCollectionForm", () => {
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
        }]

    it('Should render a form', () => {
        useCreateRequest.mockImplementation(() => ({
            handleRequest: mockHandleRequest,
            data: [],
            loading: false,
            error: null
        }));

        render(<AddToCollectionForm formData={[]} id={1} />);

        expect(screen.getByRole('form')).toBeInTheDocument();
    });

    it('Select element should be disabled when there are no collections', () => {
        useCreateRequest.mockImplementation(() => ({
            handleRequest: mockHandleRequest,
            data: [],
            loading: false,
            error: null
        }));

        render(<AddToCollectionForm formData={[]} id={1} />);

        expect(screen.getByRole('option', { name: "Create a collection to add books." })).toBeInTheDocument();
        expect(screen.queryByRole('option', { name: "Favorites" })).not.toBeInTheDocument();
        expect(screen.queryByRole('option', { name: "To Read" })).not.toBeInTheDocument();
    });

    it('Should render one select option per collection when there are collections', () => {
        useCreateRequest.mockImplementation(() => ({
            handleRequest: mockHandleRequest,
            data: [],
            loading: false,
            error: null
        }));

        render(<AddToCollectionForm formData={data} id={1} />);

        expect(screen.queryByRole('option', { name: "Create a collection to add books." })).not.toBeInTheDocument();
        expect(screen.getByRole('option', { name: "Favorites" })).toBeInTheDocument();
        expect(screen.getByRole('option', { name: "To Read" })).toBeInTheDocument();
    });

    it('Add button should be disabled if there are no collections', () => {
        useCreateRequest.mockImplementation(() => ({
            handleRequest: mockHandleRequest,
            data: [],
            loading: false,
            error: null
        }));

        render(<AddToCollectionForm formData={[]} id={1} />);

        expect(screen.getByRole('button', { name: "Add" })).toBeDisabled();
    });

    it('Should call handleRequest when Add button is clicked', () => {
        useCreateRequest.mockImplementation(() => ({
            handleRequest: mockHandleRequest,
            data: [],
            loading: false,
            error: null
        }));

        render(<AddToCollectionForm formData={data} id={1} />);

        fireEvent.change(screen.getByRole('combobox'), {
            target: { value: "1" }
        })
        fireEvent.click(screen.getByRole('button', { name: "Add" }))

        expect(mockHandleRequest).toHaveBeenCalledWith(
            null,
            `api/book_collection?bookId=1&collectionId=1`,
            "POST"
        )
    });

    it('Should render an adding book message', () => {
        useCreateRequest.mockImplementation(() => ({
            handleRequest: mockHandleRequest,
            data: [],
            loading: true,
            error: null
        }));

        render(<AddToCollectionForm formData={data} id={1} />);

        expect(screen.getByText('Adding book...')).toBeInTheDocument();
        expect(screen.queryByText('Error: Failed to add book.')).not.toBeInTheDocument();
    });

    it('Should render an error adding book message', () => {
        useCreateRequest.mockImplementation(() => ({
            handleRequest: mockHandleRequest,
            data: [],
            loading: false,
            error: "Error"
        }));

        render(<AddToCollectionForm formData={data} id={1} />);

        expect(screen.queryByText('Adding book...')).not.toBeInTheDocument();
        expect(screen.getByText('Error: Failed to add book.')).toBeInTheDocument();
    });

    it('Should render a book added message', () => {
        useCreateRequest.mockImplementation(() => ({
            handleRequest: mockHandleRequest,
            data: "Book added.",
            loading: false,
            error: null
        }));

        render(<AddToCollectionForm formData={data} id={1} />);

        expect(screen.queryByText('Adding book...')).not.toBeInTheDocument();
        expect(screen.queryByText('Error: Failed to add book.')).not.toBeInTheDocument();
        expect(screen.getByText("Book added.")).toBeInTheDocument();
    });
})