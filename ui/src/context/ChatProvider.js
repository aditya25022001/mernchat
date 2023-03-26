import React, { createContext, useContext, useState } from 'react'

const chatContext = createContext();

const ChatProvider = ({ children }) => {

    const [selectedChat, setSelectedChat] = useState();
    const [notification, setNotification] = useState(JSON.parse(localStorage.getItem("notification")) || []);
    const [chatR, setChatR] = useState([]);
    const [leftOpen, setLeftOpen] = useState(true)

    return (
        <chatContext.Provider
            value={{
                selectedChat,setSelectedChat,
                notification,setNotification,
                chatR,setChatR,
                leftOpen, setLeftOpen
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
