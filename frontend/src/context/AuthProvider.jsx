import React, {createContext, useState} from "react";

export const AuthContext = createContext();

export default function AuthProvider({children}) {
    const storedToken = localStorage.getItem("accessToken");
    const [token, setToken] = useState(storedToken ? storedToken : null)

    const storedUsername = localStorage.getItem("username");
    const storedRole = localStorage.getItem("userRole");
    const [username, setUsername] = useState(storedUsername ? storedUsername : null)
    const [role, setRole] = useState(storedRole ? storedRole : null)

    return (
        <>
            <AuthContext.Provider value={{username, setUsername, role, setRole, token, setToken}}>
                {children}
            </AuthContext.Provider>
        </>
    );

}