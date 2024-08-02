interface BotMessageI {
    id: string,
    response: string,
    probability?: number,
    showFeedback?: bool
    date?: Date
}
interface UserMessageI {
    id: string,
    query: string,
    date?: Date
}
interface quickActionMessageI {
    id: string,
    message: string,
    action: () => void
}
interface BotState {
    isTicketCreationSTart: boolean,
    toggleTicketCreation: () => void,
    ticket: TicketI,
    conversation: (BotMessageI | UserMessageI | quickActionMessageI)[]
    addNewMessage: (message: BotMessageI | UserMessageI | quickActionMessageI) => void,
    addTicketItem: (key: keyof TicketI, value: string | File) => void
}

interface TicketI {
    userName: string,
    email: string,
    description: string,
    image?: File,
}