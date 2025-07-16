import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './context/AuthContext';

// Import pages
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import About from './pages/About';
import Contact from './pages/Contact';
import Partners from './pages/Partners';
import Shop from './pages/Shop';
import AdminDashboard from './pages/AdminDashboard';
import AdminLogin from './pages/AdminLogin';


import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import CookiePolicy from './pages/CookiePolicy';
import FAQ from './pages/dashboard/FAQ';

import DashboardLayout from './components/partner/DashboardLayout';
import PartnerDashboard from './pages/PartnerDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import CreateApplication from './pages/CreateApplication';
import Applications from './pages/Applications';
import ServiceSelection from './components/partner/ServiceSelection';
import DashboardPanel from './components/partner/DashboardPanel';
import CustomerLogin from './pages/CutomerLogin';
import PartnerLogin from './pages/PartnerLogin';

import Profile from './pages/dashboard/Profile';
import Notifications from './pages/dashboard/Notifications';
import Subscriptions from './pages/dashboard/Subscriptions';


// import from Services Partner Resources
import ForProductPartners from './pages/whyPartners';
import PartnerCommitments from './pages/ourPartners';
import PartnersOnboarding from './pages/partnersOnboarding';
import PlatformEnablement from './pages/platformEnable';
import ECommerce from './pages/eCommerce';
import AccountManagementServices from './pages/ams';
import Blogs from './pages/blogs';
import CaseStudies from './pages/caseStudies';
import GuidesTutorials from './pages/guidesTutorials';
import Faqs from './pages/faqss';
import CoBranding from './pages/CoBranding';
import Careers from './pages/Careers';
import EmailVerify from './components/EmailVerify';
import ResetPassword from './components/ResetPassword';




// Import application components
import PlatformEnablementForm from './components/partner/forms/PlatformEnablementForm';
import AMSForm from './components/partner/forms/AMSForm';
import AdvertisingForm from './components/partner/forms/AdvertisingForm';
import CoBrandingForm from './components/partner/forms/CoBrandingForm';
import PlatformEnablementAMS from './pages/PlatformEnablementAMS';


// Import components
import Header from './components/Header';
import Footer from './components/Footer';

// Import BlogDetails
import BlogDetails from './pages/BlogDetails';

function App() {
  return (
    <AuthProvider>
      <Router>
        <ToastContainer position="top-right" autoClose={3000} />
        <Routes>
          {/* Dashboard Routes */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <DashboardLayout>
                <Outlet />
              </DashboardLayout>
            </ProtectedRoute>
          }>
            <Route index element={<DashboardPanel />} />
            <Route path="create-application" element={<ServiceSelection />} />
            <Route path="applications" element={<Applications />} />
            <Route path="faq" element={<FAQ />} />
            <Route path="profile" element={<Profile />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="subscriptions" element={<Subscriptions />} />
          </Route>

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          } />

          {/* Partner Routes */}
          <Route path="/partner" element={
            <ProtectedRoute>
              <DashboardLayout>
                <Outlet />
              </DashboardLayout>
            </ProtectedRoute>
          }>
            <Route path="create-application/platform" element={<PlatformEnablementForm />} />
            <Route path="create-application/ams" element={<AMSForm />} />
            <Route path="create-application/advertising" element={<AdvertisingForm />} />
            <Route path="create-application/cobranding" element={<CoBrandingForm />} />
          </Route>

          {/* Public Routes */}
          <Route element={
            <>
              <Header />
              <Outlet />
              <Footer />
            </>
          }>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/email-verify" element={<EmailVerify />} />
            <Route path="/reset-password" element={<ResetPassword />} />


            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/partners" element={<Partners />} />
            <Route path="/resources/careers" element={<Careers />} />
            <Route path="/shop" element={<Shop />} />

            
            <Route path="/privacypolicy" element={<PrivacyPolicy />} />
            <Route path="/termsofservice" element={<TermsOfService />} />
            <Route path="/cookiepolicy" element={<CookiePolicy />} />
            <Route path="/faqss" element={<Faqs />} />


            <Route path="/resources/blogs" element={<Blogs />} />
            <Route path="/resources/blogs/:id" element={<BlogDetails />} />
            <Route path="/resources/caseStudies" element={<CaseStudies />} />
            <Route path="/resources/guidesTutorials" element={<GuidesTutorials />} />
            <Route path="/resources/faqss" element={<Faqs />} />
            <Route path="/customer-login" element={<CustomerLogin />} />
            <Route path="/partnerlogin" element={<PartnerLogin />} />
            <Route path="/customerlogin" element={<CustomerLogin />} />
            
            <Route path="/platform-enablement-ams" element={<PlatformEnablementAMS />} />
            

           {/* routes from Services Partner Resources */}

          <Route path="/partners/whyPartners" element={<ForProductPartners />} />
            <Route path="/partners/ourPartners" element={<PartnerCommitments />} />
            <Route path="/partners/partnersOnboarding" element={<PartnersOnboarding />} />
            <Route path="/services/eCommerce" element={<ECommerce />} />    
            <Route path="/services/ams" element={<AccountManagementServices />} />
            <Route path="/services/coBranding" element={<CoBranding />} />
            <Route path="/services/platformEnable" element={<PlatformEnablement />} />



          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
