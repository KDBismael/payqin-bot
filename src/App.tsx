import { useEffect, useState } from 'react';
import './App.css';
import { ChatBot } from './components/chat';
import { ChatHumain } from './components/chat-humain';
import { useBotStore } from './stores/bot-store';

function App() {
  const urlParams = new URLSearchParams(window.location.search);
  const conversationId = urlParams.get('conversationId');
  const ticketId = urlParams.get('ticketId');
  const [isBotActive, setIsBotActive] = useState(false);
  const { setConversationIds } = useBotStore();
  const close = () => {
    setIsBotActive(false);
  }
  const StartCoversation = () => {
    setIsBotActive(true);
  }

  useEffect(() => {
    if (conversationId && ticketId)
      setConversationIds({ conversationId, ticketId });
  }, [conversationId && ticketId])

  return (
    <>
      {!isBotActive &&
        < div onClick={() => StartCoversation()} className='bubble h-16 w-16 absolute bottom-7 right-5 cursor-pointer'>
          <img className='rounded-full object-cover shadow-2xl' src="/src/assets/message.png" alt="message" />
        </div >
      }
      {isBotActive && !conversationId && !ticketId && <div className='absolute bottom-5 right-3'>
        <ChatBot close={close} />
      </div>}
      {isBotActive && conversationId && ticketId && <div className='absolute bottom-5 right-3'>
        <ChatHumain close={close} />
      </div>}
    </>
  )
}

export default App
