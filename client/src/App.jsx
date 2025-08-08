import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';

import { decodeJwt } from 'jose';
import { useGoogleOneTapLogin } from '@react-oauth/google';
import axiosInstance from './config/api.config';
import { useAuth } from './context/AuthContext';

// Import pages
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import About from './pages/About';
import Contact from './pages/Contact';
import Partners from './pages/Partners';
// import Shop from './pages/Shop';
import AdminDashboard from './pages/AdminDashboard';
import AdminLogin from './pages/AdminLogin';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import CookiePolicy from './pages/CookiePolicy';
import FAQ from './pages/dashboard/FAQ';
import MyApplications from './pages/dashboard/MyApplications';

// Import ONDC Solutions
import OndcSeller from './pages/solutions/OndcSeller';
import OndcBuyer from './pages/solutions/OndcBuyer';

import DashboardLayout from './components/partner/DashboardLayout';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardGuard from './components/DashboardGuard';
import ServiceSelection from './components/partner/ServiceSelection';
import DashboardPanel from './components/partner/DashboardPanel';
import CustomerLogin from './pages/CutomerLogin';
import PartnerLogin from './pages/PartnerLogin';

import Profile from './pages/dashboard/Profile';
import Notifications from './pages/dashboard/Notifications';
import Subscriptions from './pages/dashboard/Subscriptions';

// Import from Services Partner Resources
import PlatformEnablement from './pages/launch';
import AccountManagementServices from './pages/manage';
import ForProductPartners from './pages/whyPartners';
import PartnersOnboarding from './pages/partnersOnboarding';
import AdvertisingMarketing from './pages/advertising_marketing';
import Blogs from './pages/blogs';
// import CaseStudies from './pages/caseStudies';
import GuidesTutorials from './pages/guidesTutorials';
import Faqs from './pages/faq';
import CoBranding from './pages/CoBranding';
// import Careers from './pages/Careers';
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
import Amazon from './pages/marketplaces/Amazon';
import Flipkart from './pages/marketplaces/Flipkart';
// import ONDC from './pages/marketplaces/ONDC';
import JioMart from './pages/marketplaces/JioMart';
import Meesho from './pages/marketplaces/Meesho';
// import IndiaMART from './pages/marketplaces/IndiaMART';
import Snapdeal from './pages/marketplaces/Snapdeal';
import Blinkit from './pages/marketplaces/Blinkit';
import Instamart from './pages/marketplaces/Instamart';
import Zepto from './pages/marketplaces/Zepto';
import Bigbasket from './pages/marketplaces/Bigbasket';

import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {
  const { handleLogin } = useAuth();

  useGoogleOneTapLogin({
    onSuccess: async (credentialResponse) => {
      const { credential } = credentialResponse;
      if (!credential) return;

      try {
        const payload = decodeJwt(credential);
        console.log("✅ Decoded Payload:", payload);

        const res = await axiosInstance.post('/api/google/google-login', {
          token: credential
        });

        if (res.data.success) {
          const { token, user } = res.data;
          // Use AuthContext to handle login state
          await handleLogin(token, { ...user, googleId: payload.sub });
        }

        console.log("🔐 Auth response:", res.data);
      } catch (error) {
        console.error("❌ Error authenticating:", error);
      }
    },
    onError: (error) => {
      console.error("❌ Google One Tap Error:", error);
    },
  });


  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <AuthProvider>
        <LanguageProvider>
          <Router>
          <ToastContainer position="top-right" autoClose={3000} />
          <Routes>
            {/* Dashboard Routes - Double Protected */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <DashboardGuard>
                  <DashboardLayout>
                    <Outlet />
                  </DashboardLayout>
                </DashboardGuard>
              </ProtectedRoute>
            }>
              <Route index element={<Profile />} />
              <Route path="create-application" element={<ServiceSelection />} />
              <Route path="my-applications" element={<MyApplications />} />
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

            {/* Partner Routes removed as requested */}

            {/* Auth Routes without Header/Footer */}
            <Route path="/email-verify" element={<EmailVerify />} />
            <Route path="/reset-password" element={<ResetPassword />} />

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
              <Route path="/about_us" element={<About />} />
              <Route path="/contact_us" element={<Contact />} />
              <Route path="/partners" element={<Partners />} />
              <Route path="/privacypolicy" element={<PrivacyPolicy />} />
              <Route path="/termsofservice" element={<TermsOfService />} />
              <Route path="/cookiepolicy" element={<CookiePolicy />} />

              <Route path="/resources/blogs" element={<Blogs />} />
              <Route path="/resources/blogs/:id" element={<BlogDetails />} />
              <Route path="/resources/guides_Tutorials" element={<GuidesTutorials />} />
              <Route path="/resources/faq" element={<Faqs />} />
              <Route path="/faqss" element={<Faqs />} />
              <Route path="/customer-login" element={<CustomerLogin />} />
              <Route path="/partnerlogin" element={<PartnerLogin />} />
              <Route path="/customerlogin" element={<CustomerLogin />} />
              
              <Route path="/platform-enablement-ams" element={<PlatformEnablementAMS />} />

              {/* routes from Services Partner Resources */}
              <Route path="/partners/why_Partners_with_us" element={<ForProductPartners />} />
              <Route path="/partners/partners_Onboarding" element={<PartnersOnboarding />} />
              <Route path="/partners/marketplaces/amazon" element={<Amazon />} />
              <Route path="/partners/marketplaces/flipkart" element={<Flipkart />} />
              <Route path="/partners/marketplaces/jiomart" element={<JioMart />} />
              <Route path="/partners/marketplaces/meesho" element={<Meesho />} />
              <Route path="/partners/marketplaces/blinkit" element={<Blinkit />} />
              <Route path="/partners/marketplaces/instamart" element={<Instamart />} />
              <Route path="/partners/marketplaces/zepto" element={<Zepto />} />
              <Route path="/partners/marketplaces/bigbasket" element={<Bigbasket />} />
              <Route path="/partners/marketplaces/snapdeal" element={<Snapdeal />} />
              <Route path="/services/grow" element={<AdvertisingMarketing />} />    
              <Route path="/services/manage" element={<AccountManagementServices />} />
              <Route path="/services/co_branding_solutions" element={<CoBranding />} />
              <Route path="/services/launch" element={<PlatformEnablement />} />
              
              {/* Solution Routes */}
              <Route path="/solutions/ondc-seller" element={<OndcSeller />} />
              <Route path="/solutions/ondc-buyer" element={<OndcBuyer />} />

              {/* Home Route */}
              <Route path="/" element={<Home />} />
            </Route>
            
            {/* Catch-all route for unauthorized dashboard access */}
            <Route path="/dashboard/*" element={
              <ProtectedRoute>
                <DashboardGuard>
                  <div>Redirecting...</div>
                </DashboardGuard>
              </ProtectedRoute>
            } />
          </Routes>
          </Router>
        </LanguageProvider>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
