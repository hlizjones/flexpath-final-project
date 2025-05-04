import { fireEvent, render, screen } from '@testing-library/react'
import SearchResults from "./SearchResults";

const mockHandleLoad = jest.fn()
jest.mock('../../../hooks/useLoadPage', () => {
    return {
        __esModule: true,
        default: jest.fn(() => ({ handleLoad: mockHandleLoad }))
    }
});

let mockSortedData = []
jest.mock('../../../hooks/useSort', () => {
    return {
        __esModule: true,
    default: jest.fn(() => ({ sortedData: mockSortedData }))
}});

describe('SearchResults', () => {
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
    const sortedData=[{
        "id": 1,
        "title": "Atomic Habits",
        "author": "James Clear",
        "genre": "Self Help"
    },    {
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
    const setSort = jest.fn()

    it('Should render a loading message', () => {
        render(<SearchResults
            page={"Page"}
            data={[]}
            loading={true}
            error={null}
            setSort={setSort}
            sort={{ key: null, order: true }}
        />)

        expect(screen.getByText("Loading records...")).toBeInTheDocument();
        expect(screen.queryByText("Error: Failed to load records.")).not.toBeInTheDocument();
    })

    it('Should render an error message', () => {
        render(<SearchResults
            page={"Page"}
            data={[]}
            loading={null}
            error={"Error"}
            setSort={setSort}
            sort={{ key: null, order: true }}
        />)

        expect(screen.getByText("Error: Failed to load records.")).toBeInTheDocument();
        expect(screen.queryByText("Loading records...")).not.toBeInTheDocument();
    })

    it('Should render only a search message', () => {
        render(<SearchResults
            page={"Page"}
            data={[]}
            loading={null}
            error={null}
            setSort={setSort}
            sort={{ key: null, order: true }}
        />)

        expect(screen.getByText("Search to find a book or collection!")).toBeInTheDocument();
        expect(screen.queryByText("Loading records...")).not.toBeInTheDocument();
        expect(screen.queryByText("Error: Failed to load records.")).not.toBeInTheDocument();
        expect(screen.queryByRole('table')).not.toBeInTheDocument();
    })

    it('Should render only a table', () => {
        mockSortedData=sortedData

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
        expect(screen.queryByText("Error: Failed to load records.")).not.toBeInTheDocument();
        expect(screen.queryByText("Loading records...")).not.toBeInTheDocument();
        expect(screen.queryByText("Search to find a book or collection!")).not.toBeInTheDocument();
    })

    it('Should call handleLoad when a row is clicked', () => {
        mockSortedData=sortedData

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
        mockSortedData=sortedData

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