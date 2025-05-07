import { fireEvent, render, screen } from '@testing-library/react';
import CreateReview from './CreateReview';
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

describe("Create review", () => {
    it("Should render a form", () => {
        useCreateRequest.mockImplementation(() => ({
            handleRequest: mockHandleRequest,
            data: [],
            loading: false,
            error: null
        }));

        render(
            <DataContext.Provider value={mockDataContext}>
                <CreateReview bookId={1} />
            </DataContext.Provider>
        );

        expect(screen.getByRole('form')).toBeInTheDocument();
    });

    it("Should call handleRequest with all fields completed when Create button is clicked", () => {
        useCreateRequest.mockImplementation(() => ({
            handleRequest: mockHandleRequest,
            data: [],
            loading: false,
            error: null
        }));

        render(
            <DataContext.Provider value={mockDataContext}>
                <CreateReview bookId={1} />
            </DataContext.Provider>
        );

        const rating = screen.getByPlaceholderText("Rating");
        const content = screen.getByPlaceholderText("Share your thoughts");
        const privacy = screen.getByLabelText("Private");

        fireEvent.change(rating, {
            target: { value: '5' }
        });
        fireEvent.change(content, {
            target: { value: "Great book!" }
        });
        fireEvent.click(privacy);

        fireEvent.click(screen.getByRole("button", { name: "Create" }));

        expect(mockHandleRequest).toHaveBeenCalledWith({
            'rating': '5',
            'content': 'Great book!',
            'privacy': true
        }, `api/review?bookId=1`, "POST");
    });

    it("Should call handleRequest with only rating field completed when Create button is clicked", () => {
        useCreateRequest.mockImplementation(() => ({
            handleRequest: mockHandleRequest,
            data: [],
            loading: false,
            error: null
        }));

        render(
            <DataContext.Provider value={mockDataContext}>
                <CreateReview bookId={1} />
            </DataContext.Provider>
        );

        const rating = screen.getByPlaceholderText("Rating");

        fireEvent.change(rating, {
            target: { value: '5' }
        });

        fireEvent.click(screen.getByRole("button", { name: "Create" }));

        expect(mockHandleRequest).toHaveBeenCalledWith({
            'rating': '5',
            'privacy': false
        }, `api/review?bookId=1`, "POST")
    });

    it("Should render a Creating review message", () => {
        useCreateRequest.mockImplementation(() => ({
            handleRequest: mockHandleRequest,
            data: [],
            loading: true,
            error: null
        }));

        render(
            <DataContext.Provider value={mockDataContext}>
                <CreateReview bookId={1} />
            </DataContext.Provider>
        );

        expect(screen.getByText("Creating review...")).toBeInTheDocument();
        expect(screen.queryByText("Error: Failed to create review.")).not.toBeInTheDocument();
    });

    it("Should render an error creating review message", () => {
        useCreateRequest.mockImplementation(() => ({
            handleRequest: mockHandleRequest,
            data: [],
            loading: false,
            error: "Error"
        }));

        render(
            <DataContext.Provider value={mockDataContext}>
                <CreateReview bookId={1} />
            </DataContext.Provider>
        );

        expect(screen.getByText("Error: Failed to create review.")).toBeInTheDocument();
        expect(screen.queryByText("Creating review...")).not.toBeInTheDocument();
    });

    it("Should clear input fields when Create button is clicked", () => {
        useCreateRequest.mockImplementation(() => ({
            handleRequest: mockHandleRequest,
            data: [],
            loading: false,
            error: null
        }));

        render(
            <DataContext.Provider value={mockDataContext}>
                <CreateReview bookId={1} />
            </DataContext.Provider>
        );

        const rating = screen.getByPlaceholderText("Rating");
        const content = screen.getByPlaceholderText("Share your thoughts");
        const privacy = screen.getByLabelText("Private");

        fireEvent.change(rating, {
            target: { value: '5' }
        });
        fireEvent.change(content, {
            target: { value: "Great book!" }
        });
        fireEvent.click(privacy);

        fireEvent.click(screen.getByRole("button", { name: "Create" }));

        expect(rating.value).toBe("");
        expect(content).toHaveValue("");
        expect(privacy).not.toBeChecked();
    });

    it("Should call setRefresh when data is returned from useCreateRequest hook", () => {
        useCreateRequest.mockImplementation(() => ({
            handleRequest: mockHandleRequest,
            data: [
                {
                    "id": 1,
                    "bookId": 1,
                    "rating": 4,
                    "content": "Very helpful life tips!",
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
                <CreateReview bookId={1} />
            </DataContext.Provider>
        );

        expect(setRefresh).toHaveBeenCalled()
    });
})