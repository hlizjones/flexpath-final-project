import { act, renderHook } from "@testing-library/react";
import useCreateRequest from "./useCreateRequest";
import { AuthContext } from "../context/AuthProvider";
import { BrowserRouter } from "react-router-dom";
import * as fetch from "./useFetch";

jest.mock('./useFetch');
const mockToken = { token: "token" }
const wrapper = ({ children }) =>
    <BrowserRouter>
        <AuthContext.Provider value={mockToken}>
            {children}
        </AuthContext.Provider>
    </BrowserRouter>

describe("useCreateRequest", () => {
    it('Initial state should be empty', () => {
        fetch.default.mockImplementation(() => ({ data: [], loading: false, error: null }));
        const { result } = renderHook(() => useCreateRequest(), { wrapper });

        expect(result.current.data).toEqual([]);
        expect(result.current.loading).toEqual(false);
        expect(result.current.error).toEqual(null);

    })

    it('handleRequest should call useFetch', () => {
        fetch.default.mockImplementation(() => ({ data: [], loading: null, error: null }));
        const { result } = renderHook(() => useCreateRequest(), { wrapper });

        act(() => {
            result.current.handleRequest({
                "title": "Atomic habits",
                "author": "James Clear",
                "genre": "Self Help"
            }, "api/book", "POST")
        });

        expect(fetch.default).toHaveBeenCalledWith(
            'api/book',
            {
                method: "POST",
                headers: {
                    'Authorization': `Bearer token`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    {
                        "title": "Atomic habits",
                        "author": "James Clear",
                        "genre": "Self Help"
                    }
                ),
            });
    });
})