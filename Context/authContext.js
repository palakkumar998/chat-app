import { auth, db } from "@/Firebase/firebase";
import { onAuthStateChanged, signOut as authSignOut } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { createContext, useContext, useState, useEffect } from "react";



//?------------------->/ CREATE A CONTEXT USING createContext HOOK /<------------------//?
const UserContext = createContext();

//? EXPORT A FUNCTION WHICH RETURNS A COMPONENT WITH SOME VALUES WHERE THEIR INITIAL VALUE IS NULL AND TRUE
export const UserProvider = ({ children }) => {

    //? CREATE TWO STATES USING USESTATE HOOK

    const [currentUser, setCurrentUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    //? METHOD 1: THIS CLEAR METHOD SETS SETCURRENTUSER, SETISLOADING TO INITIAL STATE

    const clear = async () => {

        try {
            if (currentUser) {
                await updateDoc(doc(db, "users", currentUser.uid), {
                    isOnline: false,
                })
            }

            setCurrentUser(null);
            setIsLoading(false);
        }
        catch (error̥) {
            console.error(error̥)

        }
    }

    //? METHOD 2 : THIS METHOD CHANGES THE STATE OF USER
    const authStateChanged = async (user) => {

        setIsLoading(true);
        //? CHECK USER EXIST OR NOT
        if (!user) {
            clear();
            return
        }

        const userDocExist = await getDoc(doc(db, "users", user.uid))
        if (userDocExist.exists()) {
            await updateDoc(doc(db, "users", user.uid), {
                isOnline: true,
            })
        }

        const userDoc = await getDoc(doc(db, "users", user.uid));
        setCurrentUser(userDoc.data());
        setIsLoading(false);
    }




    //? METHOD 3: THIS METHOD MEANS THAT IT'S PERFORMING SOME ASYNCHRONOUS OPERATION. WHEN THE OPERATION IS COMPLETED, IT WILL EXECUTE THE FUNCTION PROVIDED WITHIN THEN()
    const signOut = () => {
        authSignOut(auth).then(() =>
            clear()
        )
    }

    //? HOOK: THE CODE INSIDE THE FUNCTION WILL RUN WHEN CERTAIN DEPENDENCIES CHANGE. IN THIS CASE, THE EMPTY DEPENDENCY ARRAY [] INDICATES THAT THIS EFFECT RUNS ONLY ONCE WHEN THE COMPONENT IS MOUNTED AND NOT IN RESPONSE TO ANY SPECIFIC CHANGES.
    useEffect(() => {
        //? auth and authStateChanged. This function likely has something to do with authentication state changes. The details of this function would depend on your code and the libraries or utilities you are using for authentication. It's common to have a callback function like authStateChanged that gets called when the authentication state changes.    

        const unsubscribe = onAuthStateChanged(auth, authStateChanged);
        //? This line defines a clean-up function that will be executed when the component unmounts or when the dependencies change (in this case, when the component is initially mounted due to the empty dependency array). The clean-up function invokes the unsubscribe function, which is likely meant to detach or "unsubscribe" any event listeners or watchers related to authentication state changes. This is a common pattern when working with event listeners or subscriptions in React.
        return () => unsubscribe();
    }, []);




    return (
        <UserContext.Provider value={{ currentUser, setCurrentUser, isLoading, setIsLoading, signOut }}>
            {children}
        </UserContext.Provider>
    )

}
//? export another  function which take another fuction (callback) 
export const useAuth = () => useContext(UserContext);
