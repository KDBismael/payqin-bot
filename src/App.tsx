import { useState } from 'react';
import './App.css';
import { ChatBot } from './components/chat';

function App() {
  const [isBotActive, setIsBotActive] = useState(false);

  const close = () => {
    setIsBotActive(false);
  }
  const StartCoversation = () => {
    setIsBotActive(true);
  }

  return (
    <>
      {!isBotActive &&
        < div onClick={() => StartCoversation()} className='bubble h-16 w-16 absolute bottom-7 right-5 cursor-pointer'>
          <img className='rounded-full object-cover shadow-2xl' src="/src/assets/message.png" alt="message" />
        </div >
      }
      {isBotActive && <div className='absolute bottom-5 right-3'>
        <ChatBot close={close} />
      </div>}
    </>
  )
}

export default App
