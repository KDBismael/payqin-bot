import axios from 'axios';

const BASE_URL = 'http://localhost:3500';

const sendMessageApi = (eventType: string, message: string) => {
    try {
        const res = axios.post(`${BASE_URL}/send-message`, { eventType, message })
        return res;
    } catch (error) {
        console.log(error)
    }
}

const createTicketPost = async (data: Partial<TicketI>) => {
    try {
        const res = await axios.post(`${BASE_URL}/ticket`, data)
        return res.data;
    } catch (error) {
        console.log(error);
    }
}

export { createTicketPost, sendMessageApi };
