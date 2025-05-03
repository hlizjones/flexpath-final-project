import { fireEvent, render, screen } from '@testing-library/react'
import UserInput from './UserInput'
import * as hooks from '../../../hooks/useUrlBuilder';

describe('UserInput', () => {
    const setPage = jest.fn();
    const setUrl = jest.fn();
    const setSort = jest.fn();

    let firstInput;
    let secondInput;

    beforeEach(() => {

        render(
            <UserInput
                setPage={setPage}
                setUrl={setUrl}
                setSort={setSort}
            />
        );

        firstInput = screen.getByTestId("firstInput");
        secondInput = screen.getByTestId("secondInput");
    });

    afterEach(() => {
        jest.clearAllMocks();
        jest.restoreAllMocks();
    });

    it('Should call handleSubmit when Search button is clicked', () => {
        let thirdInput = screen.getByTestId("thirdInput");

        jest.spyOn(hooks, 'default').mockImplementation(() => ({
            buildUrl: () => "api/book?title=Call of the Wild&author=Jack London&genre=Adventure"
        }));

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

    it('Should call handleSubmit when Search button is clicked and Third Input Field does not exist', () => {
        jest.spyOn(hooks, 'default').mockImplementation(() => ({
            buildUrl: () => "api/book?title=Call of the Wild&author=Jack London"
        }));

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

    it('Should clear input fields when Search button is clicked', () => {
        let thirdInput = screen.getByTestId("thirdInput");

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

    it('Should clear input fields when Search button is clicked and Third Input Field does not exist', () => {
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