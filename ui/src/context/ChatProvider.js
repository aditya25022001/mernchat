import React, { createContext, useContext, useState } from 'react'

const chatContext = createContext();

const ChatProvider = ({ children }) => {

    const [selectedChat, setSelectedChat] = useState();
    const [notification, setNotification] = useState([]);
    const [chatR, setChatR] = useState([]);

    return (
        <chatContext.Provider
            value={{
                selectedChat,setSelectedChat,
                notification,setNotification,
                chatR,setChatR
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
