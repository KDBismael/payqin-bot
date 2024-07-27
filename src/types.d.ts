interface BotMessageI {
    id: string,
    response: string,
    probability: number,
    date: Date
}
interface UserMessageI {
    id: string,
    query: string,
    date: Date
}
interface BotState {
    ticket: TicketI,
    conversation: (BotMessageI | UserMessageI)[]
    addNewMessage: (message: BotMessageI | UserMessageI) => void,
    addTicketItem: (key: keyof TicketI, value: string | File) => void
}

interface TicketI {
    userName: string,
    email: string,
    description: string,
    image?: File,
}