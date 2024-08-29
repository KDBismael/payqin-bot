import { useEffect, useRef, useState } from "react";
import { useSocket } from "../hooks/useSocket";
import { useBotStore } from "../stores/bot-store";
import { BotMessage } from "./botMessage";
import { UserMessage } from "./userMessage";

export const ChatHumain = ({ close }: { close: () => void; }) => {
    const { conversationIds } = useBotStore();
    const { loadConversation, messages, sendMessage, conversationId } = useSocket()
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [message, setMessage] = useState('');


    const onSendMessage = async () => {
        if (message && conversationIds.ticketId && conversationIds.conversationId)
            sendMessage({ conversation: conversationId ?? '', recipient: conversationIds.conversationId, sender: conversationIds.ticketId, text: message })
        setMessage('');
    }
    const onEnterKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key == "Enter") onSendMessage()
    }
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages.length]);

    useEffect(() => {
        if (conversationIds.conversationId && conversationIds.ticketId)
            loadConversation(conversationIds.ticketId, conversationIds.conversationId)
    }, [conversationIds.conversationId, conversationIds.ticketId])

    return (<>
        <div className=" p-10">
            <div className="opened w-[370px]" style={{ "background": 'rgb(234, 238, 243)' }}>
                <div className="chat shadow-lg rounded-md">
                    <div data-shadow="true" className="top flex justify-between p-2"
                        style={{ "backgroundColor": 'rgb(255, 255, 255)' }}
                    >
                        <div className="flex items-center">
                            <div className="avatar w-14 h-14 mr-5">
                                <div className="tpl-avatar relative">
                                    <div className="tpl-avatar-status h-3 w-3 bg-green-500 rounded-full absolute bottom-0 right-1" style={{ "borderColor": 'rgb(255, 255, 255)' }}></div>
                                    <div className="tpl-avatar-image"
                                    // style={{ "backgroundColor": "rgb(255, 255, 255)" }}
                                    >
                                        <div data-status="loaded" data-cover="true" className="">
                                            <img src="src/assets/message.png" alt="msg-icon" className="object-cover rounded-full" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="company">
                                <div className="header" style={{ "color": 'rgb(0, 0, 0)' }}>PayQin client Support</div>
                                <div className="status text-sm" style={{ color: 'rgb(155, 166, 179)' }}>En ligne</div>
                            </div>
                        </div>
                        <div className="close mt-2 cursor-pointer" onClick={() => close()}>
                            <div data-actions="true" data-size="normal" className="tpl-close w-6 h-6">
                                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" fill="#5e6165"></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div className="messages h-[490px]  relative overflow-y-auto overflow-x-hidden">
                        {messages.map((message, i) => {
                            if (message.recipient == conversationIds.ticketId)
                                return <div className="w-full flex justify-start"><BotMessage key={i} islast={i == messages.length - 1} message={{ id: message._id, response: message.text }} /></div>
                            else return <div className="w-full flex justify-end"><UserMessage key={i} message={{ query: message.text, id: message._id }} /></div>
                        })}
                        <div ref={messagesEndRef} />
                    </div>
                    <div className="typing  border-b flex items-center h-14 pr-5" style={{ background: "rgb(255, 255, 255)", borderTopColor: "rgb(234, 234, 234)" }}>
                        <input onKeyUp={(event) => onEnterKeyUp(event)} value={message} type="text" onChange={(val) => setMessage(val.target.value)} className="w-full h-full pl-3 border-none outline-none" maxLength={256} placeholder="Type your message here" style={{ color: "rgb(150, 155, 166)" }} />
                        <div className="send-icon w-7 h-7 cursor-pointer" onClick={() => onSendMessage()}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" xmlSpace="preserve"><path fill="#d7d7d7" d="M22,11.7V12h-0.1c-0.1,1-17.7,9.5-18.8,9.1c-1.1-0.4,2.4-6.7,3-7.5C6.8,12.9,17.1,12,17.1,12H17c0,0,0-0.2,0-0.2c0,0,0,0,0,0c0-0.4-10.2-1-10.8-1.7c-0.6-0.7-4-7.1-3-7.5C4.3,2.1,22,10.5,22,11.7z"></path></svg>
                        </div>
                    </div>
                    <div className="tpl-powered-by text-center py-2" style={{ borderTopColor: "rgb(238, 238, 238)", background: "rgb(249, 249, 249)" }}>
                        <span>
                            <span style={{ color: "rgb(155, 166, 178)" }}>Powered by</span>
                            <a target="_blank" href="" style={{ color: "rgb(18, 91, 251)" }}> PayQin</a>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </>)
}