import { BrowserRouter as Router, Routes, Route } from "react-router";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import NotFound from "./pages/OtherPage/NotFound";
import UserProfiles from "./pages/UserProfiles";
import Videos from "./pages/UiElements/Videos";
import Images from "./pages/UiElements/Images";
import Alerts from "./pages/UiElements/Alerts";
import Badges from "./pages/UiElements/Badges";
import Avatars from "./pages/UiElements/Avatars";
import Buttons from "./pages/UiElements/Buttons";
import LineChart from "./pages/Charts/LineChart";
import BarChart from "./pages/Charts/BarChart";
import Calendar from "./pages/Calendar";
import BasicTables from "./pages/Tables/BasicTables";
import FormElements from "./pages/Forms/FormElements";
import Blank from "./pages/Blank";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";
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

            {/* Others Page */}
            <Route path="/profile" element={<UserProfiles />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/blank" element={<Blank />} />

            {/* Forms */}
            <Route path="/form-elements" element={<FormElements />} />

            {/* Tables */}
            <Route path="/basic-tables" element={<BasicTables />} />

            {/* Ui Elements */}
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/avatars" element={<Avatars />} />
            <Route path="/badge" element={<Badges />} />
            <Route path="/buttons" element={<Buttons />} />
            <Route path="/images" element={<Images />} />
            <Route path="/videos" element={<Videos />} />

            {/* Charts */}
            <Route path="/line-chart" element={<LineChart />} />
            <Route path="/bar-chart" element={<BarChart />} />

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
