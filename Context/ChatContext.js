import { createContext, useContext, useReducer, useState } from "react";
import { useAuth } from "./authContext";


const chatContext = createContext();


export const ChatContextProvider = ({ children }) => {
    const [users, setUsers] = useState(false);
    const { currentUser } = useAuth();
    const [chats, setChats] = useState([])
    const [selectedChat, setSelectedChat] = useState(null)

    const INITAIL_STATE = {

        chatId: "",
        user: null
    }

    const chatReducer = (state, action) => {
        switch (action.type) {
            case "CHANGE_USER":
                return {
                    user: action.payload,
                    chatId: currentUser.uid > action.payload.uid
                        ? currentUser.uid + action.payload.uid
                        : action.payload.uid + currentUser.uid
                }

            default:
                return state;
        }

    }

    const [state, dispatch] = useReducer(chatReducer, INITAIL_STATE);

    return (
        <chatContext.Provider
            value={{
                users,
                setUsers,
                data: state,
                dispatch,
                chats,
                setChats,
                selectedChat,
                setSelectedChat
            }}>

            {children}
        </chatContext.Provider >
    )
}
// eslint-disable-next-line react-hooks/rules-of-hooks
export const userChatContext = () => useContext(chatContext);