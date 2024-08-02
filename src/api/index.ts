import axios from 'axios';

const BASE_URL = 'http://localhost:3500';

const sendMessageApi = (eventType: string, message: string) => {
    const res = axios.post(`${BASE_URL}/send-message`, { eventType, message })
    return res;
}

export { sendMessageApi };
