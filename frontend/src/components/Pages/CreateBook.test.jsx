import { fireEvent, render, screen } from '@testing-library/react'
import CreateBook from './CreateBook';

const mockHandleRequest = jest.fn();
let mockData = []
let mockLoading = null
let mockError = null
jest.mock('../../hooks/useCreateRequest', () => {
    return {
        __esModule: true,
        default: jest.fn(() => ({
            handleRequest: mockHandleRequest,
            data: mockData,
            loading: mockLoading,
            error: mockError
        }))
    }
});

const mockHandleLoad = jest.fn()
jest.mock('../../hooks/useLoadPage', () => {
    return {
        __esModule: true,
        default: jest.fn(() => ({ handleLoad: mockHandleLoad }))
    }
});

jest.mock('../../hooks/useMessageTimeout', () => {
    return {
        __esModule: true,
        default: jest.fn()
    }
});

describe('CreateBook', () => {
    it('Should render a form', () => {
        render(<CreateBook />)
        expect(screen.getByRole('form')).toBeInTheDocument();
    });

    it('Should not render loading message, error message, or button', () => {
        render(<CreateBook />)
        expect(screen.queryByText("Creating book...")).not.toBeInTheDocument()
        expect(screen.queryByText("Error: Failed to create book.")).not.toBeInTheDocument()
        expect(screen.queryByRole('button', { name: "Go to book!" })).not.toBeInTheDocument()
    });

    it('Should render a loading message', () => {
        mockLoading = true
        render(<CreateBook />)
        expect(screen.getByText("Creating book...")).toBeInTheDocument();
    });

    it('Should render an error message', () => {
        mockError = "Error"
        render(<CreateBook />)
        expect(screen.getByText("Error: Failed to create book.")).toBeInTheDocument();
    });

    it('Should render an button', () => {
        mockData = [{
            "id": 6,
            "title": "The Hobbit",
            "author": "J.R.R. Tolkien",
            "genre": "Fantasy"
        }]
        render(<CreateBook />)
        expect(screen.getByRole('button', { name: "Go to book!" })).toBeInTheDocument();
    });

    it('Should call handleLoad when Go To Book! button is clicked', () => {
        mockData = [{
            "id": 6,
            "title": "The Hobbit",
            "author": "J.R.R. Tolkien",
            "genre": "Fantasy"
        }]
        render(<CreateBook />)

        fireEvent.click(screen.getByRole('button', { name: "Go to book!" }))

        expect(mockHandleLoad).toHaveBeenCalled()
    });

    it('Should call handleRequest when Create button is clicked', () => {
        mockData = []
        render(<CreateBook />)

        fireEvent.change(screen.getByPlaceholderText("Title of Book"), {
            target: { value: "Call of the Wild" }
        });
        fireEvent.change(screen.getByPlaceholderText("Author of Book"), {
            target: { value: "Jack London" }
        });
        fireEvent.change(screen.getByPlaceholderText("Genre of Book"), {
            target: { value: "Adventure" }
        });

        fireEvent.click(screen.getByRole('button', { name: "Create" }))

        expect(mockHandleRequest).toHaveBeenCalled()
    });
})