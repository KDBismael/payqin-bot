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
    conversation: (BotMessageI | UserMessageI)[]
    addNewMessage: (message: BotMessageI | UserMessageI) => void
}