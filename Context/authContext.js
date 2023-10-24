import {createContext, useContext, useState } from "react";

// create a context using createContext hook 
const UserContext = createContext(); 

// export a function which return a component with some values where thier initiale value is null and true 
export const UserProvider = ({children}) => {

    // create two states using usestate hook 
    const [currentUser, setcurrentUser] = useState("Palak Kumar");
    const [isLoading, setisLoading] = useState(true);
    return (
        <UserContext.Provider value={{ currentUser, setcurrentUser, isLoading, setisLoading }}>
            {children}
        </UserContext.Provider>
    )

}
// export another  function which take another fuction (callback) 
export const useAuth = () => useContext(UserContext);
