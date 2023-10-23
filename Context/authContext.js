import {createContext, useContext, useState } from "react";

const UserContext = createContext({children});

export const UserProvider = () => {
    const [currentUser, setcurrentUser] = useState(null);
    const [isLoading, setisLoading] = useState(true);
    return (
        <UserContext.Provider value={{ currentUser, setcurrentUser, isLoading, setisLoading }}>
            {children}
        </UserContext.Provider>
    )

}

export const useAuth = () => useContext(UserContext);
