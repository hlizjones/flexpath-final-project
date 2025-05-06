import { fireEvent, render, screen } from '@testing-library/react';
import ReviewManager from './ReviewManager';
import { DataContext } from '../../../context/DataProvider';
import useCreateRequest from '../../../hooks/useCreateRequest';

const setRefresh = jest.fn();
const mockDataContext = {
    setRefresh: setRefresh
}

const mockHandleRequest = jest.fn();
jest.mock('../../../hooks/useCreateRequest');

jest.mock('../../../hooks/useMessageTimeout');

jest.mock('./DeleteReview')

afterEach(() => {
    jest.clearAllMocks();
});

describe("ReviewManager", () => {
    it('Should render a form', () => {
        useCreateRequest.mockImplementation(() => ({
            handleRequest: mockHandleRequest,
            data: [],
            loading: false,
            error: null
        }));

        render(
            <DataContext.Provider value={mockDataContext}>
                <ReviewManager id={1} bookId={1} />
            </DataContext.Provider>
        );

        expect(screen.getByRole('form')).toBeInTheDocument();
    })

    it('Should call handleRequest when Update Review button is clicked', () => {
        useCreateRequest.mockImplementation(() => ({
            handleRequest: mockHandleRequest,
            data: [],
            loading: false,
            error: null
        }));

        render(
            <DataContext.Provider value={mockDataContext}>
                <ReviewManager id={1} bookId={1} />
            </DataContext.Provider>
        );

        const rating = screen.getByPlaceholderText("Rating");
        const content = screen.getByPlaceholderText("Share your thoughts");

        fireEvent.change(rating, {
            target: { value: '5' }
        });
        fireEvent.change(content, {
            target: { value: "Great book!" }
        });

        fireEvent.click(screen.getByRole("button", { name: "Update Review" }));

        expect(mockHandleRequest).toHaveBeenCalledWith({
            'rating': '5',
            'content': 'Great book!'
        }, `api/review/1?bookId=1`, "PUT");
    });

    it('Should render updating review message', () => {
        useCreateRequest.mockImplementation(() => ({
            handleRequest: mockHandleRequest,
            data: [],
            loading: true,
            error: null
        }));

        render(
            <DataContext.Provider value={mockDataContext}>
                <ReviewManager id={1} bookId={1} />
            </DataContext.Provider>
        );

        expect(screen.getByText("Updating review...")).toBeInTheDocument();
        expect(screen.queryByText("Error: Failed to update review.")).not.toBeInTheDocument();
    })

    it('Should render error updating review message', () => {
        useCreateRequest.mockImplementation(() => ({
            handleRequest: mockHandleRequest,
            data: [],
            loading: false,
            error: "Error"
        }));

        render(
            <DataContext.Provider value={mockDataContext}>
                <ReviewManager id={1} bookId={1} />
            </DataContext.Provider>
        );

        expect(screen.queryByText("Updating review...")).not.toBeInTheDocument();
        expect(screen.getByText("Error: Failed to update review.")).toBeInTheDocument();

    })

    it('Should clear input fields when Update Review button is clicked', () => {
        useCreateRequest.mockImplementation(() => ({
            handleRequest: mockHandleRequest,
            data: [],
            loading: false,
            error: null
        }));

        render(
            <DataContext.Provider value={mockDataContext}>
                <ReviewManager id={1} bookId={1} />
            </DataContext.Provider>
        );

        const rating = screen.getByPlaceholderText("Rating");
        const content = screen.getByPlaceholderText("Share your thoughts");

        fireEvent.change(rating, {
            target: { value: '5' }
        });
        fireEvent.change(content, {
            target: { value: "Great book!" }
        });

        fireEvent.click(screen.getByRole("button", { name: "Update Review" }));

        expect(rating.value).toBe("");
        expect(content).toHaveValue("");
    })

    it('Should call setRefresh when data is returned from useCreateRequest hook', () => {
        useCreateRequest.mockImplementation(() => ({
            handleRequest: mockHandleRequest,
            data: [
                {
                    "id": 1,
                    "bookId": 1,
                    "rating": 3,
                    "content": "I didn't like the ending...",
                    "privacy": false,
                    "username": "admin",
                    "isAdmin": null
                }
            ],
            loading: false,
            error: null
        }));

        render(
            <DataContext.Provider value={mockDataContext}>
                <ReviewManager id={1} bookId={1} />
            </DataContext.Provider>
        );

        expect(setRefresh).toHaveBeenCalled()
    })
})