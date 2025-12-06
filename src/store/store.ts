import { configureStore } from "@reduxjs/toolkit"
import departmentsReducer from "./departmentsSlice"
import applicationsReducer from "./applicationsSlice"
import faqsReducer from "./faqsSlice"
import usersReducer from "./usersSlice"
import siteContentReducer from "./siteContentSlice"
import contactMessagesReducer from "./contactMessagesSlice"

export const store = configureStore({
  reducer: {
    departments: departmentsReducer,
    applications: applicationsReducer,
    faqs: faqsReducer,
    users: usersReducer,
    siteContent: siteContentReducer,
    contactMessages: contactMessagesReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
