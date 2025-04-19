import React, {createContext, useState} from "react";

export const DataContext = createContext();

export default function DataProvider({children}) {
    const [user, setUser] = useState(null)

    return (
        <>
            <DataContext.Provider value={{user, setUser}}>
                {children}
            </DataContext.Provider>
        </>
    );

}