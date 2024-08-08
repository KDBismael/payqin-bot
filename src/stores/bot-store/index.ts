import { create } from 'zustand'

export const useBotStore = create<BotState>((set) => ({
    isTicketCreationSTart: false,
    toggleTicketCreation: () => set((state) => ({ isTicketCreationSTart: !state.isTicketCreationSTart })),
    ticket: { userName: '', email: '', description: '' },
    conversation: [{ id: 'g', date: new Date(), response: "Bonjour je suis payqin-bot une IA conversationnelle, commet puis-je vous aider?" }, { id: 'q', date: new Date(), message: "Contacter le support directement", action: () => { } }, { id: 'q', date: new Date(), message: "Questions fréquements posés", action: () => { } }, { id: 'g', date: new Date(), query: "Comment créer une carte virtuelle PayQin?" }, { id: 'qq', date: new Date(), response: "Pour créer une carte virtuelle PayQin rendez vous dans l'onglet 'carte' dans l'application mobile et créer autant de carte que vous le souhaitez.", probability: 1, showFeedback: true }],
    addNewMessage: (message) => set((state) => ({ conversation: [...state.conversation, message] })),
    addTicketItem: (key: keyof TicketI, value: string | File) => set((state) => ({ ticket: { ...state.ticket, [key]: key == 'image' ? value as File : value as string } }))
}))