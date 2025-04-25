import React, {createContext, useState} from "react";

export const AuthContext = createContext();

export default function AuthProvider({children}) {
    const storedToken = localStorage.getItem("accessToken");
    const [token, setToken] = useState(storedToken ? storedToken : null);
    const [tokenExpMessage, setTokenExpMessage] = useState(null);

    const storedUsername = localStorage.getItem("username");
    const [username, setUsername] = useState(storedUsername ? storedUsername : null);
    
    const storedRole = localStorage.getItem("role");
    const [role, setRole] = useState(storedRole ? storedRole : null);

    return (
        <>
            <AuthContext.Provider value={{username, setUsername, role, setRole, token, setToken, tokenExpMessage, setTokenExpMessage}}>
                {children}
            </AuthContext.Provider>
        </>
    );

}