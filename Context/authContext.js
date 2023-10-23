import {createContext, useContext, useState } from "react";

// create a context using createContext hook and pass a parameter
const UserContext = createContext({children}); 

// export a function which return a component with some values where thier initiale value is null and true 
export const UserProvider = () => {

    // create two states using usestate hook 
    const [currentUser, setcurrentUser] = useState(null);
    const [isLoading, setisLoading] = useState(true);
    return (
        <UserContext.Provider value={{ currentUser, setcurrentUser, isLoading, setisLoading }}>
            {children}
        </UserContext.Provider>
    )

}
// export another  function which take another fuction (callback) 
export const useAuth = () => useContext(UserContext);
