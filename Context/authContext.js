import { auth } from "@/Firebase/firebase";
import { onAuthStateChanged, signOut as authSignOut } from "firebase/auth";
import { createContext, useContext, useState, useEffect } from "react";



// create a context using createContext hook 
const UserContext = createContext();

// export a function which return a component with some values where thier initiale value is null and true 
export const UserProvider = ({ children }) => {

    // create two states using usestate hook 
    const [currentUser, setCurrentUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // METHOD 1 : this method change the state of user
    const authStateChanged = (user) => {
        setIsLoading(true);

        // check user is exist or not
        if (!user) {
            clear();
            return
        }
        setCurrentUser(user)
        setIsLoading(false);
    }

    // METHOD 2: this clear method setCurrentUser, setIsLoading to initial state
    const clear = () => {
        setCurrentUser(null);
        setIsLoading(false);
    }


    // METHOD 3: this method means that it's performing some asynchronous operation. When the operation is completed, it will execute the function provided within then().
    const signOut = () => {
        authSignOut(auth).then(() =>
            clear()
        )
    }

    //HOOK: The code inside the function will run when certain dependencies change. In this case, the empty dependency array [] indicates that this effect runs only once when the component is mounted and not in response to any specific changes.
    useEffect(() => {
        // auth and authStateChanged. This function likely has something to do with authentication state changes. The details of this function would depend on your code and the libraries or utilities you are using for authentication. It's common to have a callback function like authStateChanged that gets called when the authentication state changes.    

        const unsubscribe = onAuthStateChanged(auth, authStateChanged);
        // This line defines a clean-up function that will be executed when the component unmounts or when the dependencies change (in this case, when the component is initially mounted due to the empty dependency array). The clean-up function invokes the unsubscribe function, which is likely meant to detach or "unsubscribe" any event listeners or watchers related to authentication state changes. This is a common pattern when working with event listeners or subscriptions in React.
        return () => unsubscribe();
    }, []);




    return (
        <UserContext.Provider value={{ currentUser, setCurrentUser, isLoading, setIsLoading, signOut }}>
            {children}
        </UserContext.Provider>
    )

}
// export another  function which take another fuction (callback) 
export const useAuth = () => useContext(UserContext);
