import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface Document {
  id: string
  type: "national_id" | "union_card" | "resume" | "certificates"
  name: string
  url: string
  uploadedAt: string
}

export interface IndividualUser {
  id: string
  type: "individual"
  firstName: string
  lastName: string
  email: string
  phone: string
  country: string
  city: string
  primaryRole: string
  yearsOfExperience: number
  portfolio?: string
  documents: Document[]
  createdAt: string
}

export interface CompanyUser {
  id: string
  type: "company"
  firstName: string
  lastName: string
  email: string
  phone: string
  country: string
  city: string
  legalCompanyName: string
  taxNumber: string
  registrationNumber: string
  companySize: string
  pocName: string
  pocEmail: string
  pocPhone: string
  portfolio?: string
  documents: Document[]
  createdAt: string
}

export type User = IndividualUser | CompanyUser

interface UsersState {
  individuals: IndividualUser[]
  companies: CompanyUser[]
  selectedIndividuals: string[]
  selectedCompanies: string[]
}

const initialState: UsersState = {
  individuals: [
    {
      id: "1",
      type: "individual",
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      phone: "+1-555-0101",
      country: "United States",
      city: "New York",
      primaryRole: "Cinematographer",
      yearsOfExperience: 5,
      portfolio: "https://johndoe-portfolio.com",
      documents: [
        { id: "d1", type: "national_id", name: "US Passport", url: "/docs/passport.pdf", uploadedAt: "2024-01-15" },
        { id: "d2", type: "resume", name: "Resume_John_Doe.pdf", url: "/docs/resume.pdf", uploadedAt: "2024-01-15" },
      ],
      createdAt: "2024-01-15",
    },
    {
      id: "2",
      type: "individual",
      firstName: "Sarah",
      lastName: "Smith",
      email: "sarah.smith@example.com",
      phone: "+1-555-0102",
      country: "United States",
      city: "Los Angeles",
      primaryRole: "Director",
      yearsOfExperience: 8,
      portfolio: "https://sarahsmith-films.com",
      documents: [
        {
          id: "d3",
          type: "national_id",
          name: "CA Driver License",
          url: "/docs/license.pdf",
          uploadedAt: "2024-02-01",
        },
      ],
      createdAt: "2024-02-01",
    },
    {
      id: "3",
      type: "individual",
      firstName: "Ahmed",
      lastName: "Hassan",
      email: "ahmed.hassan@example.com",
      phone: "+20-100-1234567",
      country: "Egypt",
      city: "Cairo",
      primaryRole: "Editor",
      yearsOfExperience: 3,
      documents: [
        { id: "d4", type: "national_id", name: "Egyptian ID", url: "/docs/eg-id.pdf", uploadedAt: "2024-01-20" },
        { id: "d5", type: "resume", name: "CV_Ahmed.pdf", url: "/docs/cv-ahmed.pdf", uploadedAt: "2024-01-20" },
        {
          id: "d6",
          type: "certificates",
          name: "Adobe Certifications",
          url: "/docs/certs.pdf",
          uploadedAt: "2024-01-20",
        },
      ],
      createdAt: "2024-01-20",
    },
  ],
  companies: [
    {
      id: "c1",
      type: "company",
      firstName: "Emma",
      lastName: "Johnson",
      email: "emma@creativestudios.com",
      phone: "+1-555-2001",
      country: "United States",
      city: "San Francisco",
      legalCompanyName: "Creative Studios Inc.",
      taxNumber: "98-765432",
      registrationNumber: "CA-2020-001234",
      companySize: "50-100",
      pocName: "Emma Johnson",
      pocEmail: "emma@creativestudios.com",
      pocPhone: "+1-555-2001",
      portfolio: "https://creativestudios.com",
      documents: [
        { id: "d7", type: "national_id", name: "Tax Certificate", url: "/docs/tax-cert.pdf", uploadedAt: "2024-01-10" },
      ],
      createdAt: "2024-01-10",
    },
    {
      id: "c2",
      type: "company",
      firstName: "Michael",
      lastName: "Chen",
      email: "michael@mediapro.com",
      phone: "+1-555-2002",
      country: "Canada",
      city: "Toronto",
      legalCompanyName: "MediaPro Productions Ltd.",
      taxNumber: "12-3456789",
      registrationNumber: "ON-2019-005678",
      companySize: "100+",
      pocName: "Michael Chen",
      pocEmail: "michael@mediapro.com",
      pocPhone: "+1-555-2002",
      portfolio: "https://mediapro.ca",
      documents: [
        { id: "d8", type: "national_id", name: "Business License", url: "/docs/license.pdf", uploadedAt: "2024-01-05" },
        { id: "d9", type: "certificates", name: "ISO Certifications", url: "/docs/iso.pdf", uploadedAt: "2024-01-05" },
      ],
      createdAt: "2024-01-05",
    },
  ],
  selectedIndividuals: [],
  selectedCompanies: [],
}

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    toggleIndividualSelection: (state, action: PayloadAction<string>) => {
      const index = state.selectedIndividuals.indexOf(action.payload)
      if (index > -1) {
        state.selectedIndividuals.splice(index, 1)
      } else {
        state.selectedIndividuals.push(action.payload)
      }
    },
    toggleCompanySelection: (state, action: PayloadAction<string>) => {
      const index = state.selectedCompanies.indexOf(action.payload)
      if (index > -1) {
        state.selectedCompanies.splice(index, 1)
      } else {
        state.selectedCompanies.push(action.payload)
      }
    },
    selectAllIndividuals: (state) => {
      state.selectedIndividuals = state.individuals.map((u) => u.id)
    },
    selectAllCompanies: (state) => {
      state.selectedCompanies = state.companies.map((u) => u.id)
    },
    clearIndividualSelection: (state) => {
      state.selectedIndividuals = []
    },
    clearCompanySelection: (state) => {
      state.selectedCompanies = []
    },
    deleteIndividualUsers: (state, action: PayloadAction<string[]>) => {
      state.individuals = state.individuals.filter((u) => !action.payload.includes(u.id))
      state.selectedIndividuals = []
    },
    deleteCompanyUsers: (state, action: PayloadAction<string[]>) => {
      state.companies = state.companies.filter((u) => !action.payload.includes(u.id))
      state.selectedCompanies = []
    },
  },
})

export const {
  toggleIndividualSelection,
  toggleCompanySelection,
  selectAllIndividuals,
  selectAllCompanies,
  clearIndividualSelection,
  clearCompanySelection,
  deleteIndividualUsers,
  deleteCompanyUsers,
} = usersSlice.actions

export default usersSlice.reducer
