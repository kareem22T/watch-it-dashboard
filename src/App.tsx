import { BrowserRouter as Router, Routes, Route } from "react-router";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import NotFound from "./pages/OtherPage/NotFound";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import DepartmentsPage from "./features/departments";
import AddDepartmentPage from "./features/departments/AddDepartment";
import EditDepartmentPage from "./features/departments/EditDepartment";
import ApplicationsPage from "./features/applications";
import ApplicationDetailPage from "./features/applications/ViewApplication";
import FaqsPage from "./features/faqs";
import AddCategoryPage from "./features/faqs/categories/components/AddCategory";
import EditCategoryPage from "./features/faqs/categories/components/EditCategory";
import FaqsListPage from "./features/faqs/FaqsList";
import CreateFaqPage from "./features/faqs/CreateFaq";
import EditFaqPage from "./features/faqs/EditFaq";
import UsersPage from "./features/users";
import UserProfilePage from "./features/users/UserProfile";
import SiteContentSettings from "./components/siteContent";
import ContactMessagesPage from "./components/contactMessages";
import DashboardHome from "./features/dashboard";

export default function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Dashboard Layout */}
          <Route element={<AppLayout />}>
            <Route index path="/" element={<DashboardHome />} />
            <Route path="/departments" element={<DepartmentsPage />} />
            <Route path="/departments/add" element={<AddDepartmentPage />} />
            <Route path="/departments/edit/:id" element={<EditDepartmentPage />} />
            <Route path="/applications" element={<ApplicationsPage />} />
            <Route path="/applications/:id" element={<ApplicationDetailPage />} />

            <Route path="/faqs" element={<FaqsPage />} />
            <Route path="/faqs/categories/add" element={<AddCategoryPage />} />
            <Route path="/faqs/categories/edit/:id" element={<EditCategoryPage />} />
            <Route path="/faqs/faqs-list" element={<FaqsListPage />} />
            <Route path="/faqs/create" element={<CreateFaqPage />} />
            <Route path="/faqs/edit/:id" element={<EditFaqPage />} />

            <Route path="/users" element={<UsersPage />} /> 
            <Route path="/users/profile/:id" element={<UserProfilePage />} /> 

            <Route path="/site-content" element={<SiteContentSettings />} /> 
            <Route path="/contact-us-messages" element={<ContactMessagesPage />} /> 
          </Route>

          {/* Auth Layout */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />


          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}
