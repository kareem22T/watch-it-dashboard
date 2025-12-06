import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface FormField {
  id: string
  type: "input" | "textarea" | "select" | "file"
  label: string
  name: string
  placeholder?: string
  required?: boolean
  options?: Array<{ value: string; label: string }>
}

export interface Step {
  id: string
  title: string
  description?: string
  formFields: FormField[]
  order: number
}

export interface Department {
  id: string
  name: string
  description?: string
  steps: Step[]
  createdAt: string
  updatedAt: string
}

interface DepartmentsState {
  departments: Department[]
  selectedDepartments: Set<string>
  loading: boolean
  error: string | null
}

const initialState: DepartmentsState = {
  departments: [
    {
      id: "scriptwriting",
      name: "Scriptwriting",
      description: "Submit scenarios, scripts, and series pitches for review by our development team.",
      steps: [
        {
          id: "scriptwriting-step-1",
          title: "Contact Information",
          description: "Basic contact details",
          order: 1,
          formFields: [
            {
              id: "field-1",
              type: "input",
              label: "Contact Name",
              name: "contactName",
              placeholder: "Enter your full name",
              required: true,
            },
            {
              id: "field-2",
              type: "input",
              label: "Contact Email",
              name: "contactEmail",
              placeholder: "Enter your email address",
              required: true,
            },
            {
              id: "field-3",
              type: "input",
              label: "Phone Number",
              name: "phoneNumber",
              placeholder: "Enter your phone number",
              required: true,
            },
            {
              id: "field-4",
              type: "input",
              label: "Location",
              name: "location",
              placeholder: "City, Country",
              required: true,
            },
            {
              id: "field-5",
              type: "input",
              label: "Portfolio / Website URL",
              name: "portfolioUrl",
              placeholder: "https://yourportfolio.com",
              required: true,
            },
          ],
        },
        {
          id: "scriptwriting-step-2",
          title: "Script Details",
          description: "Information about your script or series pitch",
          order: 2,
          formFields: [
            {
              id: "field-6",
              type: "input",
              label: "Script / Series Title",
              name: "scriptTitle",
              placeholder: "Enter the title of your script or series",
              required: true,
            },
            {
              id: "field-7",
              type: "textarea",
              label: "Synopsis",
              name: "synopsis",
              placeholder: "Provide a brief synopsis of your script or series concept",
              required: true,
            },
            {
              id: "field-8",
              type: "select",
              label: "Genre",
              name: "genre",
              required: true,
              options: [
                { value: "drama", label: "Drama" },
                { value: "comedy", label: "Comedy" },
                { value: "thriller", label: "Thriller" },
                { value: "sci-fi", label: "Sci-Fi" },
                { value: "documentary", label: "Documentary" },
                { value: "animation", label: "Animation" },
                { value: "other", label: "Other" },
              ],
            },
            {
              id: "field-9",
              type: "input",
              label: "Format",
              name: "format",
              placeholder: "e.g., Feature Film, Web Series, Pilot Episode",
              required: true,
            },
            {
              id: "field-10",
              type: "input",
              label: "Estimated Runtime / Episodes",
              name: "runtime",
              placeholder: "e.g., 120 minutes or 8 episodes",
              required: true,
            },
          ],
        },
        {
          id: "scriptwriting-step-3",
          title: "Writer Experience",
          description: "Your background and experience",
          order: 3,
          formFields: [
            {
              id: "field-11",
              type: "textarea",
              label: "Writing Experience",
              name: "writingExperience",
              placeholder: "Describe your experience as a screenwriter or content creator",
              required: true,
            },
            {
              id: "field-12",
              type: "textarea",
              label: "Previous Works",
              name: "previousWorks",
              placeholder: "List any previously published or produced scripts/content",
              required: false,
            },
            {
              id: "field-13",
              type: "textarea",
              label: "Awards & Recognition",
              name: "awards",
              placeholder: "List any awards, nominations, or industry recognition",
              required: false,
            },
          ],
        },
        {
          id: "scriptwriting-step-4",
          title: "Script Upload",
          description: "Submit your script and materials",
          order: 4,
          formFields: [
            {
              id: "field-14",
              type: "file",
              label: "Script Document",
              name: "scriptFile",
              placeholder: "Upload PDF, DOC, or DOCX",
              required: true,
            },
            {
              id: "field-15",
              type: "textarea",
              label: "Additional Notes",
              name: "additionalNotes",
              placeholder: "Any additional information about your submission",
              required: false,
            },
          ],
        },
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "production",
      name: "Production",
      description: "Apply to produce content with WATCH IT and bring creative projects to life.",
      steps: [
        {
          id: "production-step-1",
          title: "Basic Information",
          description: "Your contact and background information",
          order: 1,
          formFields: [
            {
              id: "prod-field-1",
              type: "input",
              label: "Contact Name",
              name: "contactName",
              placeholder: "Enter your full name",
              required: true,
            },
            {
              id: "prod-field-2",
              type: "input",
              label: "Contact Email",
              name: "contactEmail",
              placeholder: "Enter your email address",
              required: true,
            },
            {
              id: "prod-field-3",
              type: "input",
              label: "Phone Number",
              name: "phoneNumber",
              placeholder: "Enter your phone number",
              required: true,
            },
            {
              id: "prod-field-4",
              type: "input",
              label: "Location",
              name: "location",
              placeholder: "City, Country",
              required: true,
            },
            {
              id: "prod-field-5",
              type: "input",
              label: "Portfolio / Website URL",
              name: "portfolioUrl",
              placeholder: "Provide a link to your portfolio, website, or relevant work samples",
              required: true,
            },
          ],
        },
        {
          id: "production-step-2",
          title: "Project Details",
          description: "Information about your production capabilities and experience",
          order: 2,
          formFields: [
            {
              id: "prod-field-6",
              type: "input",
              label: "Project / Service Title",
              name: "projectTitle",
              placeholder: "e.g., Production Services",
              required: true,
            },
            {
              id: "prod-field-7",
              type: "textarea",
              label: "Description",
              name: "description",
              placeholder: "Provide a detailed description of your project, services, or capabilities...",
              required: true,
            },
            {
              id: "prod-field-8",
              type: "textarea",
              label: "Relevant Experience",
              name: "relevantExperience",
              placeholder: "Describe your relevant experience, past projects, and expertise...",
              required: true,
            },
            {
              id: "prod-field-9",
              type: "select",
              label: "Production Type",
              name: "productionType",
              required: true,
              options: [
                { value: "photography", label: "Photography" },
                { value: "videography", label: "Videography" },
                { value: "editing", label: "Post-Production/Editing" },
                { value: "sound", label: "Sound Design/Audio" },
                { value: "animation", label: "Animation/Motion Graphics" },
                { value: "color", label: "Color Grading" },
                { value: "vfx", label: "VFX" },
                { value: "full-service", label: "Full-Service Production" },
                { value: "other", label: "Other" },
              ],
            },
            {
              id: "prod-field-10",
              type: "textarea",
              label: "Production Capacity",
              name: "productionCapacity",
              placeholder: "Describe your team size, crew capacity, and simultaneous project handling capabilities...",
              required: true,
            },
            {
              id: "prod-field-11",
              type: "textarea",
              label: "Equipment & Facilities",
              name: "equipmentFacilities",
              placeholder: "List available equipment, studio spaces, post-production facilities, etc...",
              required: true,
            },
            {
              id: "prod-field-12",
              type: "select",
              label: "Years in Business",
              name: "yearsInBusiness",
              required: true,
              options: [
                { value: "0-1", label: "0-1 years" },
                { value: "1-3", label: "1-3 years" },
                { value: "3-5", label: "3-5 years" },
                { value: "5-10", label: "5-10 years" },
                { value: "10+", label: "10+ years" },
              ],
            },
            {
              id: "prod-field-13",
              type: "select",
              label: "Completed Projects",
              name: "completedProjects",
              required: true,
              options: [
                { value: "0-10", label: "0-10 projects" },
                { value: "10-50", label: "10-50 projects" },
                { value: "50-100", label: "50-100 projects" },
                { value: "100+", label: "100+ projects" },
              ],
            },
            {
              id: "prod-field-14",
              type: "select",
              label: "Total Budget",
              name: "totalBudget",
              required: false,
              options: [
                { value: "0-10k", label: "$0-10K" },
                { value: "10-50k", label: "$10-50K" },
                { value: "50-100k", label: "$50-100K" },
                { value: "100k+", label: "$100K+" },
              ],
            },
            {
              id: "prod-field-15",
              type: "select",
              label: "Project Timeline",
              name: "projectTimeline",
              required: false,
              options: [
                { value: "immediate", label: "Immediate" },
                { value: "1-3-months", label: "1-3 months" },
                { value: "3-6-months", label: "3-6 months" },
                { value: "6-12-months", label: "6-12 months" },
                { value: "flexible", label: "Flexible" },
              ],
            },
          ],
        },
        {
          id: "production-step-3",
          title: "Uploads & Portfolio",
          description: "Submit your portfolio materials and links",
          order: 3,
          formFields: [
            {
              id: "prod-field-16",
              type: "file",
              label: "Upload Files",
              name: "portfolioFiles",
              placeholder: "PDF, JPG, PNG, MP4 (max 50MB per file)",
              required: true,
            },
            {
              id: "prod-field-17",
              type: "textarea",
              label: "Additional Links",
              name: "additionalLinks",
              placeholder:
                "Add links to work samples, reels, or reference materials (one per line)\nInclude links to Vimeo, YouTube, Google Drive, Dropbox, etc.",
              required: false,
            },
            {
              id: "prod-field-18",
              type: "textarea",
              label: "References (Optional)",
              name: "references",
              placeholder: "List professional references with contact information",
              required: false,
            },
          ],
        },
        {
          id: "production-step-4",
          title: "Review & Submit",
          description: "Review your application before submitting",
          order: 4,
          formFields: [
            {
              id: "prod-field-19",
              type: "input",
              label: "Terms & Conditions",
              name: "termsAccepted",
              placeholder: "I agree to the terms and conditions",
              required: true,
            },
          ],
        },
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
  selectedDepartments: new Set(),
  loading: false,
  error: null,
}

const departmentsSlice = createSlice({
  name: "departments",
  initialState,
  reducers: {
    addDepartment: (state, action: PayloadAction<Department>) => {
      state.departments.push(action.payload)
    },
    updateDepartment: (state, action: PayloadAction<Department>) => {
      const index = state.departments.findIndex((d) => d.id === action.payload.id)
      if (index !== -1) {
        state.departments[index] = action.payload
      }
    },
    deleteDepartment: (state, action: PayloadAction<string>) => {
      state.departments = state.departments.filter((d) => d.id !== action.payload)
    },
    deleteMultipleDepartments: (state, action: PayloadAction<string[]>) => {
      state.departments = state.departments.filter((d) => !action.payload.includes(d.id))
    },
    toggleDepartmentSelection: (state, action: PayloadAction<string>) => {
      const newSet = new Set(state.selectedDepartments)
      if (newSet.has(action.payload)) {
        newSet.delete(action.payload)
      } else {
        newSet.add(action.payload)
      }
      state.selectedDepartments = newSet
    },
    selectAllDepartments: (state) => {
      state.selectedDepartments = new Set(state.departments.map((d) => d.id))
    },
    clearSelection: (state) => {
      state.selectedDepartments = new Set()
    },
    addStep: (state, action: PayloadAction<{ departmentId: string; step: Step }>) => {
      const department = state.departments.find((d) => d.id === action.payload.departmentId)
      if (department) {
        department.steps.push(action.payload.step)
      }
    },
    updateStep: (
      state,
      action: PayloadAction<{
        departmentId: string
        stepId: string
        step: Step
      }>,
    ) => {
      const department = state.departments.find((d) => d.id === action.payload.departmentId)
      if (department) {
        const stepIndex = department.steps.findIndex((s) => s.id === action.payload.stepId)
        if (stepIndex !== -1) {
          department.steps[stepIndex] = action.payload.step
        }
      }
    },
    deleteStep: (state, action: PayloadAction<{ departmentId: string; stepId: string }>) => {
      const department = state.departments.find((d) => d.id === action.payload.departmentId)
      if (department) {
        department.steps = department.steps.filter((s) => s.id !== action.payload.stepId)
      }
    },
  },
})

export const {
  addDepartment,
  updateDepartment,
  deleteDepartment,
  deleteMultipleDepartments,
  toggleDepartmentSelection,
  selectAllDepartments,
  clearSelection,
  addStep,
  updateStep,
  deleteStep,
} = departmentsSlice.actions

export default departmentsSlice.reducer
