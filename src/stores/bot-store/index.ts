import { create } from 'zustand'

export const useBotStore = create<BotState>((set) => ({
    conversation: [{ id: 'g', date: new Date(), query: "what's up" }, { id: 'q', date: new Date(), response: "Fine", probability: 1 }, { id: 'g', date: new Date(), query: "Great" }, { id: 'qq', date: new Date(), response: "Cool", probability: 1 }],
    addNewMessage: (message) => set((state) => ({ conversation: [...state.conversation, message] })),
}))