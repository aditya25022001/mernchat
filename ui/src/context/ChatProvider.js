import React, { createContext, useContext, useState } from 'react'

const chatContext = createContext();

const ChatProvider = ({ children }) => {

    const [selectedChat, setSelectedChat] = useState();
    const [notification, setNotification] = useState([]);
    const [chats, setChats] = useState([]);

    return (
        <chatContext.Provider
            value={{
                selectedChat,setSelectedChat,
                notification,setNotification,
                chats,setChats
            }}
        >
            {children}
        </chatContext.Provider>
    )
}

export const ChatState = () => {
    return useContext(chatContext);
}

export default ChatProvider
