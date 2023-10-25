import { auth } from "@/Firebase/firebase";
import {onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useState, useEffect } from "react";


// create a context using createContext hook 
const UserContext = createContext();

// export a function which return a component with some values where thier initiale value is null and true 
export const UserProvider = ({ children }) => {
// create two states using usestate hook 
const [currentUser, setcurrentUser] = useState("Palak Kumar");
const [isLoading, setisLoading] = useState(true);

// to clear the loading and currentuser
    const clear = () => {
        setcurrentUser(null);
        setisLoading(false);
    }

    const authStateChanged = (user) => {
        setisLoading(true);

        if (!user) {
            clear();
            return
        }
        setcurrentUser(user)
        setisLoading(false);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, authStateChanged);
        return () => unsubscribe();
    }, []);


    return (
        <UserContext.Provider value={{ currentUser, setcurrentUser, isLoading, setisLoading }}>
            {children}
        </UserContext.Provider>
    )

}
// export another  function which take another fuction (callback) 
export const useAuth = () => useContext(UserContext);
