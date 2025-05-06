import { fireEvent, render, screen } from '@testing-library/react'
import UserInput from './UserInput'
import useUrlBuilder from '../../../hooks/useUrlBuilder';

jest.mock('../../../hooks/useUrlBuilder');

afterEach(() => {
    jest.clearAllMocks();
});

describe('UserInput with ThirdInput', () => {
    beforeEach(() => {
        jest.mock('./ToggleFields', function mockToggleFields({ firstInputField, secondInputField, thirdInputField }) {
            return (
                <div className="col-md-5 d-grid gap-3 mb-3">
                    <input className="form-control" type="search" id="firstInput" placeholder={firstInputField}></input>
                    <input className="form-control" type="search" id="secondInput" data-testid="secondInput" placeholder={secondInputField}></input>
                    <input className="form-control" type="search" id="thirdInput" data-testid="thirdInput" placeholder={thirdInputField}></input>
                </div>
            )
        });
    })
    const setPage = jest.fn();
    const setUrl = jest.fn();
    const setSort = jest.fn();

    it('Should call handleSubmit when Search button is clicked', () => {
        useUrlBuilder.mockImplementation(() => ({
            buildUrl: () => "api/book?title=Call of the Wild&author=Jack London&genre=Adventure"
        }));

        render(
            <UserInput
                setPage={setPage}
                setUrl={setUrl}
                setSort={setSort}
            />
        );

        const firstInput = screen.getByTestId("firstInput");
        const secondInput = screen.getByTestId("secondInput");
        const thirdInput = screen.getByTestId("thirdInput");

        fireEvent.change(firstInput, {
            target: { value: "Call of the Wild" }
        });
        fireEvent.change(secondInput, {
            target: { value: "Jack London" }
        });
        fireEvent.change(thirdInput, {
            target: { value: "Adventure" }
        });

        fireEvent.click(screen.getByRole("button", { name: "Search" }));

        expect(setPage).toHaveBeenCalledWith("book");
        expect(setUrl).toHaveBeenCalledWith("api/book?title=Call of the Wild&author=Jack London&genre=Adventure");
        expect(setSort).toHaveBeenCalledWith({ key: null, order: true });
    })

    it('Should clear input fields when Search button is clicked', () => {
        useUrlBuilder.mockImplementation(() => ({
            buildUrl: jest.fn()
        }));

        render(
            <UserInput
                setPage={setPage}
                setUrl={setUrl}
                setSort={setSort}
            />
        );

        const firstInput = screen.getByTestId("firstInput");
        const secondInput = screen.getByTestId("secondInput");
        const thirdInput = screen.getByTestId("thirdInput");

        fireEvent.change(firstInput, {
            target: { value: "Call of the Wild" }
        });
        fireEvent.change(secondInput, {
            target: { value: "Jack London" }
        });
        fireEvent.change(thirdInput, {
            target: { value: "Adventure" }
        });

        fireEvent.click(screen.getByRole("button", { name: "Search" }));

        expect(firstInput).toHaveValue("");
        expect(secondInput).toHaveValue("");
        expect(thirdInput).toHaveValue("");
    })
})

describe('UserInput without ThirdInput', () => {
    beforeEach(() => {
        jest.mock('./ToggleFields', function mockToggleFields({ firstInputField, secondInputField }) {
            return (
                <div className="col-md-5 d-grid gap-3 mb-3">
                    <input className="form-control" type="search" id="firstInput" data-testid="firstInput" placeholder={firstInputField}></input>
                    <input className="form-control" type="search" id="secondInput" data-testid="secondInput" placeholder={secondInputField}></input>
                </div>
            )
        });
    })
    const setPage = jest.fn();
    const setUrl = jest.fn();
    const setSort = jest.fn();


    it('Should call handleSubmit when Search button is clicked and Third Input Field does not exist', () => {
        useUrlBuilder.mockImplementation(() => ({
            buildUrl: () => "api/book?title=Call of the Wild&author=Jack London"
        }));

        render(
            <UserInput
                setPage={setPage}
                setUrl={setUrl}
                setSort={setSort}
            />
        );

        const firstInput = screen.getByTestId("firstInput");
        const secondInput = screen.getByTestId("secondInput");

        fireEvent.change(firstInput, {
            target: { value: "Call of the Wild" }
        });
        fireEvent.change(secondInput, {
            target: { value: "Jack London" }
        });

        fireEvent.click(screen.getByRole("button", { name: "Search" }));

        expect(setPage).toHaveBeenCalledWith("book");
        expect(setUrl).toHaveBeenCalledWith("api/book?title=Call of the Wild&author=Jack London");
        expect(setSort).toHaveBeenCalledWith({ key: null, order: true });
    })

    it('Should clear input fields when Search button is clicked and Third Input Field does not exist', () => {
        useUrlBuilder.mockImplementation(() => ({
            buildUrl: jest.fn()
        }));

        render(
            <UserInput
                setPage={setPage}
                setUrl={setUrl}
                setSort={setSort}
            />
        );

        const firstInput = screen.getByTestId("firstInput");
        const secondInput = screen.getByTestId("secondInput");

        fireEvent.change(firstInput, {
            target: { value: "Call of the Wild" }
        });
        fireEvent.change(secondInput, {
            target: { value: "Jack London" }
        });

        fireEvent.click(screen.getByRole("button", { name: "Search" }));

        expect(firstInput).toHaveValue("");
        expect(secondInput).toHaveValue("");
    })
})