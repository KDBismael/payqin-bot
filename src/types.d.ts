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
    conversationH: (BotMessageI | UserMessageI)[]
    addNewMessageH: (message: BotMessageI | UserMessageI) => void,
    addNewMessage: (message: BotMessageI | UserMessageI | quickActionMessageI) => void,
    addTicketItem: (key: keyof TicketI, value: string | File) => void
    setConversationIds: (data: conversationIds) => void
    conversationIds: conversationIds
}

interface conversationIds {
    conversationId: string;
    ticketId: string;
}

interface TicketI {
    username: string,
    email: string,
    description: string,
    image?: File,
}
interface MessageI {
    sender: string;
    recipient: string;
    text: string;
    conversation: string;
    _id: string
}