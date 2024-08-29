import { useState } from "react";
import { io } from "socket.io-client";

const SOCKET_SERVER_URL = 'http://localhost:3500';

const useSocket = () => {
    const [messages, setMessages] = useState<MessageI[]>([]);
    const [conversationId, setConversationId] = useState(null);
    const socket = io(SOCKET_SERVER_URL);

    socket.on('connect', () => {
        console.log('Connected to WebSocket server');

        socket.on('conversationHistory', (data) => {
            console.log('Received conversation history:', data);
            console.log(data)
            setConversationId(data.conversationId);
            setMessages(data.messages);
        });

        socket.on('receiveMessage', (newMessage) => {
            console.log('New message received:', newMessage);
            setMessages((prevMessages) => [...prevMessages, newMessage]);
        });

        socket.on('disconnect', () => {
            console.log('Disconnected to WebSocket server');
            socket.disconnect();
        });
    });

    // useEffect(() => {


    //     console.log("from socket")
    //     // Clean up the connection when the component unmounts
    //     return () => {
    //         socket.off('conversationHistory');
    //         socket.off('receiveMessage');
    //         socket.disconnect();
    //     };
    // }, []);

    // Function to request conversation data from the server
    const loadConversation = (ticketId: string, conversationId: string) => {
        socket.emit('getConversation', { ticketId, conversationId });
    };

    const sendMessage = (message: Partial<MessageI>) => {
        const newMessage = {
            conversationId: message.conversation,
            sender: message.sender,
            recipient: message.recipient,
            text: message.text,
        };

        socket.emit('sendMessage', newMessage);
    };


    return { messages, conversationId, loadConversation, sendMessage }
}

export { useSocket };
