import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface ContactMessage {
  id: string
  firstName: string
  lastName: string
  email: string
  subject: string
  message: string
  createdAt: string
}

interface ContactMessagesState {
  messages: ContactMessage[]
  selectedMessages: Set<string>
}

const initialState: ContactMessagesState = {
  messages: [
    {
      id: "msg-1",
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      subject: "Question about pricing",
      message: "I would like to know more about your pricing plans.",
      createdAt: new Date().toISOString(),
    },
    {
      id: "msg-2",
      firstName: "Jane",
      lastName: "Smith",
      email: "jane@example.com",
      subject: "Technical support needed",
      message: "I'm experiencing an issue with the integration. Can you help?",
      createdAt: new Date().toISOString(),
    },
  ],
  selectedMessages: new Set(),
}

const contactMessagesSlice = createSlice({
  name: "contactMessages",
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<ContactMessage>) => {
      state.messages.push(action.payload)
    },
    deleteMessage: (state, action: PayloadAction<string>) => {
      state.messages = state.messages.filter((m) => m.id !== action.payload)
    },
    deleteMultipleMessages: (state, action: PayloadAction<string[]>) => {
      state.messages = state.messages.filter((m) => !action.payload.includes(m.id))
    },
    toggleMessageSelection: (state, action: PayloadAction<string>) => {
      const newSet = new Set(state.selectedMessages)
      if (newSet.has(action.payload)) {
        newSet.delete(action.payload)
      } else {
        newSet.add(action.payload)
      }
      state.selectedMessages = newSet
    },
    selectAllMessages: (state) => {
      state.selectedMessages = new Set(state.messages.map((m) => m.id))
    },
    clearMessageSelection: (state) => {
      state.selectedMessages = new Set()
    },
  },
})

export const {
  addMessage,
  deleteMessage,
  deleteMultipleMessages,
  toggleMessageSelection,
  selectAllMessages,
  clearMessageSelection,
} = contactMessagesSlice.actions

export default contactMessagesSlice.reducer
