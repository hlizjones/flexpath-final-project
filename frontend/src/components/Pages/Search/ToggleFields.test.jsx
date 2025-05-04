import { fireEvent, render, screen } from '@testing-library/react';
import ToggleFields from './ToggleFields';

describe('ToggleFields', () => {
    const setFirstInputField = jest.fn();
    const setSecondInputField = jest.fn();
    const setThirdInputField = jest.fn();

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('Should render a Third Input Field', () => {

        render(
            <ToggleFields
                firstInputField={"Title"}
                setFirstInputField={setFirstInputField}
                secondInputField={"Author"}
                setSecondInputField={setSecondInputField}
                thirdInputField={"Genre"}
                setThirdInputField={setThirdInputField}
            />
        );

        const firstInput = screen.getByTestId("firstInput");
        const secondInput = screen.getByTestId("secondInput");
        const thirdInput = screen.getByTestId("thirdInput");

        expect(firstInput).toBeInTheDocument();
        expect(secondInput).toBeInTheDocument();
        expect(thirdInput).toBeInTheDocument();

        expect(firstInput).toHaveAttribute("placeholder", "Title");
        expect(secondInput).toHaveAttribute("placeholder", "Author");
        expect(thirdInput).toHaveAttribute("placeholder", "Genre");

    })

    it('Should not render Third Input Field when thirdInputField is false', () => {
        render(
            <ToggleFields
                firstInputField={"Name"}
                secondInputField={"Username"}
                thirdInputField={false} />
        );

        const firstInput = screen.getByTestId("firstInput");
        const secondInput = screen.getByTestId("secondInput");
        const thirdInput = screen.queryByTestId("thirdInput");

        expect(firstInput).toBeInTheDocument();
        expect(secondInput).toBeInTheDocument();
        expect(thirdInput).not.toBeInTheDocument();

        expect(firstInput).toHaveAttribute("placeholder", "Name");
        expect(secondInput).toHaveAttribute("placeholder", "Username");

    })

    it('Should call state setters when Collection is selected', () => {
        render(
            <ToggleFields
                firstInputField={"Title"}
                setFirstInputField={setFirstInputField}
                secondInputField={"Author"}
                setSecondInputField={setSecondInputField}
                thirdInputField={"Genre"}
                setThirdInputField={setThirdInputField}
            />
        );

        fireEvent.change(screen.getByRole("combobox"), {
            target: { value: "collection" }
        });

        expect(setFirstInputField).toHaveBeenCalledWith("Name");
        expect(setSecondInputField).toHaveBeenCalledWith("Username");
        expect(setThirdInputField).toHaveBeenCalledWith(false);

    })

    it('Should call state setters when Book is selected', () => {
        render(
            <ToggleFields
                firstInputField={"Name"}
                setFirstInputField={setFirstInputField}
                secondInputField={"Username"}
                setSecondInputField={setSecondInputField}
                thirdInputField={false}
                setThirdInputField={setThirdInputField}
            />
        );

        fireEvent.change(screen.getByRole("combobox"), {
            target: { value: "book" }
        });

        expect(setFirstInputField).toHaveBeenCalledWith("Title");
        expect(setSecondInputField).toHaveBeenCalledWith("Author");
        expect(setThirdInputField).toHaveBeenCalledWith("Genre");

    })
})