import { fireEvent, render, screen } from '@testing-library/react'
import CreateBook from './CreateBook';
import useCreateRequest from '../../hooks/useCreateRequest';

const mockHandleRequest = jest.fn();
jest.mock('../../hooks/useCreateRequest');

const mockHandleLoad = jest.fn();
jest.mock('../../hooks/useLoadPage', () => {
    return {
        __esModule: true,
        default: jest.fn(() => ({ handleLoad: mockHandleLoad }))
    }
});

jest.mock('../../hooks/useMessageTimeout');

describe('CreateBook', () => {
    it('Should render a form', () => {
        useCreateRequest.mockImplementation(()=> ({
            handleRequest: mockHandleRequest,
                    data: [],
                    loading: false,
                    error: null
        }));

        render(<CreateBook />);
        expect(screen.getByRole('form')).toBeInTheDocument();
    });

    it('Should not render loading message, error message, or button', () => {
        useCreateRequest.mockImplementation(()=> ({
            handleRequest: mockHandleRequest,
                    data: [],
                    loading: false,
                    error: null
        }));

        render(<CreateBook />);
        expect(screen.queryByText("Creating book...")).not.toBeInTheDocument();
        expect(screen.queryByText("Error: Failed to create book.")).not.toBeInTheDocument();
        expect(screen.queryByRole('button', { name: "Go to book!" })).not.toBeInTheDocument();
    });

    it('Should render a loading message', () => {
        useCreateRequest.mockImplementation(()=> ({
            handleRequest: mockHandleRequest,
                    data: [],
                    loading: true,
                    error: null
        }));
     
        render(<CreateBook />);
        expect(screen.getByText("Creating book...")).toBeInTheDocument();
    });

    it('Should render an error message', () => {
        useCreateRequest.mockImplementation(()=> ({
            handleRequest: mockHandleRequest,
                    data: [],
                    loading: false,
                    error: "Error"
        }));
   
        render(<CreateBook />);
        expect(screen.getByText("Error: Failed to create book.")).toBeInTheDocument();
    });

    it('Should render an button', () => {
        useCreateRequest.mockImplementation(()=> ({
            handleRequest: mockHandleRequest,
                    data: [{
                        "id": 6,
                        "title": "The Hobbit",
                        "author": "J.R.R. Tolkien",
                        "genre": "Fantasy"
                    }],
                    loading: false,
                    error: null
        }));

        render(<CreateBook />);
        expect(screen.getByRole('button', { name: "Go to book!" })).toBeInTheDocument();
    });

    it('Should call handleLoad when Go To Book! button is clicked', () => {
        useCreateRequest.mockImplementation(()=> ({
            handleRequest: mockHandleRequest,
                    data: [{
                        "id": 6,
                        "title": "The Hobbit",
                        "author": "J.R.R. Tolkien",
                        "genre": "Fantasy"
                    }],
                    loading: false,
                    error: null
        }));
        render(<CreateBook />);

        fireEvent.click(screen.getByRole('button', { name: "Go to book!" }));

        expect(mockHandleLoad).toHaveBeenCalled();
    });

    it('Should call handleRequest when Create button is clicked', () => {
        useCreateRequest.mockImplementation(()=> ({
            handleRequest: mockHandleRequest,
                    data: [],
                    loading: false,
                    error: null
        }));

        render(<CreateBook />);

        fireEvent.change(screen.getByPlaceholderText("Title of Book"), {
            target: { value: "Call of the Wild" }
        });
        fireEvent.change(screen.getByPlaceholderText("Author of Book"), {
            target: { value: "Jack London" }
        });
        fireEvent.change(screen.getByPlaceholderText("Genre of Book"), {
            target: { value: "Adventure" }
        });

        fireEvent.click(screen.getByRole('button', { name: "Create" }));

        expect(mockHandleRequest).toHaveBeenCalled();
    });
})