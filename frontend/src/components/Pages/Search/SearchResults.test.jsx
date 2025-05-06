import { fireEvent, render, screen } from '@testing-library/react'
import SearchResults from "./SearchResults";
import useSort from '../../../hooks/useSort';

const mockHandleLoad = jest.fn();
jest.mock('../../../hooks/useLoadPage', () => {
    return {
        __esModule: true,
        default: jest.fn(() => ({ handleLoad: mockHandleLoad }))
    }
});

jest.mock('../../../hooks/useSort');

afterEach(() => {
    jest.clearAllMocks();
});

describe('SearchResults', () => {
    const setSort = jest.fn()
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

    it('Should render a loading message', () => {
        useSort.mockImplementation(() => ({ sortedData: [] }))

        render(<SearchResults
            page={"Page"}
            data={[]}
            loading={true}
            error={null}
            setSort={setSort}
            sort={{ key: null, order: true }}
        />)

        expect(screen.getByText("Loading search results...")).toBeInTheDocument();
        expect(screen.queryByText("Error: Failed to load search results.")).not.toBeInTheDocument();
    })

    it('Should render an error message', () => {
        useSort.mockImplementation(() => ({ sortedData: [] }))

        render(<SearchResults
            page={"Page"}
            data={[]}
            loading={null}
            error={"Error"}
            setSort={setSort}
            sort={{ key: null, order: true }}
        />)

        expect(screen.getByText("Error: Failed to load search results.")).toBeInTheDocument();
        expect(screen.queryByText("Loading search results...")).not.toBeInTheDocument();
    })

    it('Should render only a "Search to find a book or collection!" message', () => {
        useSort.mockImplementation(() => ({ sortedData: [] }))

        render(<SearchResults
            page={"Page"}
            data={[]}
            loading={null}
            error={null}
            setSort={setSort}
            sort={{ key: null, order: true }}
        />)

        expect(screen.getByText("Search to find a book or collection!")).toBeInTheDocument();
        expect(screen.queryByText("Loading search results...")).not.toBeInTheDocument();
        expect(screen.queryByText("Error: Failed to load search results.")).not.toBeInTheDocument();
        expect(screen.queryByRole('table')).not.toBeInTheDocument();
    })

    it('Should render only a table', () => {
        useSort.mockImplementation(() => ({ sortedData: sortedData }))

        render(<SearchResults
            page={"Page"}
            data={data}
            loading={null}
            error={null}
            setSort={setSort}
            sort={{ key: null, order: true }}
        />)

        expect(screen.getByRole('table')).toBeInTheDocument();
        const rows = screen.getAllByTestId("objectRow")
        expect(rows.length).toBe(data.length)
        expect(screen.queryByText("Error: Failed to load search results.")).not.toBeInTheDocument();
        expect(screen.queryByText("Loading search results...")).not.toBeInTheDocument();
        expect(screen.queryByText("Search to find a book or collection!")).not.toBeInTheDocument();
    })

    it('Should call handleLoad when a row is clicked', () => {
        useSort.mockImplementation(() => ({ sortedData: sortedData }))

        render(<SearchResults
            page={"Page"}
            data={data}
            loading={null}
            error={null}
            setSort={setSort}
            sort={{ key: null, order: true }}
        />)

        const rows = screen.getAllByTestId("objectRow")
        for (let row of rows) {
            fireEvent.click(row)
            expect(mockHandleLoad).toHaveBeenCalled();
        }

        expect(mockHandleLoad).toHaveBeenCalledTimes(rows.length)
    })

    it('Should call setSort when a header is clicked', () => {
        useSort.mockImplementation(() => ({ sortedData: sortedData }))

        render(<SearchResults
            page={"Page"}
            data={data}
            loading={null}
            error={null}
            setSort={setSort}
            sort={{ key: null, order: true }}
        />)

        const headers = screen.getAllByRole("columnheader")
        for (let header of headers) {
            fireEvent.click(header)
            expect(setSort).toHaveBeenCalled();
        }

        expect(setSort).toHaveBeenCalledTimes(headers.length)
    })
})