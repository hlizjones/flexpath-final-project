import { act, renderHook } from "@testing-library/react";
import { AuthContext } from "../context/AuthProvider";
import { BrowserRouter, useNavigate } from "react-router-dom";
import { DataContext } from "../context/DataProvider";
import useLoadPage from "./useLoadPage";

const mockToken = { token: "token" }

let setUrl = jest.fn();
let setOptions = jest.fn();
const mockSetters = {
    setUrl: setUrl,
    setOptions: setOptions
}

const wrapper = ({ children }) =>
    <BrowserRouter>
        <AuthContext.Provider value={mockToken}>
            <DataContext.Provider value={mockSetters}>
                {children}
            </DataContext.Provider>
        </AuthContext.Provider>
    </BrowserRouter>

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn()
}));

const mockNavigate = jest.fn();
useNavigate.mockReturnValue(mockNavigate);

describe("useLoadPage", () => {
    it('Should call state setters when handleLoad is called', () => {

        const { result } = renderHook(() => useLoadPage(), { wrapper });

        act(() => {
            result.current.handleLoad("api/book");
        });

        expect(setUrl).toHaveBeenCalledWith("api/book");
        expect(setOptions).toHaveBeenCalledWith({ headers: { 'Authorization': `Bearer token` } });
    })

    it('Should call state setters and navigate when handleLoad is called', () => {

        const { result } = renderHook(() => useLoadPage(), { wrapper });

        act(() => {
            result.current.handleLoad("api/book", "book");
        });

        expect(setUrl).toHaveBeenCalledWith("api/book");
        expect(setOptions).toHaveBeenCalledWith({ headers: { 'Authorization': `Bearer token` } });
        expect(mockNavigate).toHaveBeenCalledWith("/book");
    })
})