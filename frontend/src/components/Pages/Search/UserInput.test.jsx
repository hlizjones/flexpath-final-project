import { fireEvent, render, screen } from '@testing-library/react'
import UserInput from './UserInput'
import * as hooks from '../../../hooks/useUrlBuilder';

jest.mock('../../../hooks/useUrlBuilder');
hooks.default.mockImplementation(() => ({
    buildUrl: jest.fn()
}));

describe('UserInput', () => {
    const setPage = jest.fn();
    const setUrl = jest.fn();
    const setSort = jest.fn();

    it('Should call handleSubmit when Search button is clicked', () => {
        hooks.default.mockImplementationOnce(() => ({
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

    it('Should call handleSubmit when Search button is clicked and Third Input Field does not exist', () => {
        hooks.default.mockImplementationOnce(() => ({
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

    it('Should clear input fields when Search button is clicked', () => {
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

    it('Should clear input fields when Search button is clicked and Third Input Field does not exist', () => {
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