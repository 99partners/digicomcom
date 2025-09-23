import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from 'react-router-dom';
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
import ForgotPassword from './pages/ForgotPassword';
import About from './pages/About';
import Contact from './pages/Contact';
import Partners from './pages/Partners';
import Shop from './pages/Shop';
import AdminDashboard from './pages/AdminDashboard';
import AdminLogin from './pages/AdminLogin';
import RefundPolicy from './pages/RefundPolicy';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import CookiePolicy from './pages/CookiePolicy';
import FAQ from './pages/dashboard/FAQ';
import MyApplications from './pages/dashboard/MyApplications';

// Import ONDC Solutions
import OndcSeller from './pages/solutions/OndcSeller';
import OndcBuyer from './pages/solutions/OndcBuyer';
import ProfitCalculator from './pages/calculator/ProfitCalculator';

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
import AdvertisingMarketing from './pages/advertising_marketing';

import ForProductPartners from './pages/whyPartners';
import PartnersOnboarding from './pages/partnersOnboarding';

import Blogs from './pages/blogs';
import CaseStudies from './pages/caseStudies';
import GuidesTutorials from './pages/guidesTutorials';
import Faqs from './pages/faq';
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
              {/* Keep login page removed; redirect legacy /login to partner login */}
              <Route path="/login" element={<Navigate to="/partnerlogin" replace />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/about_us" element={<About />} />
              <Route path="/contact_us" element={<Contact />} />
              <Route path="/partners" element={<Partners />} />
              <Route path="/privacypolicy" element={<PrivacyPolicy />} />
              <Route path="/termsofservice" element={<TermsOfService />} />
              <Route path="/cookiepolicy" element={<CookiePolicy />} />
              <Route path="/refundpolicy" element={<RefundPolicy />} />

              <Route path="/resources/blogs" element={<Blogs />} />
              <Route path="/resources/blogs/:title" element={<BlogDetails />} />
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
              <Route path="/services/co_branding_solutions" element={<CoBranding />} />

              <Route path="/services/grow" element={<AdvertisingMarketing />} />    
              <Route path="/services/manage" element={<AccountManagementServices />} />
              <Route path="/services/launch" element={<PlatformEnablement />} />
              {/* Service Form Routes */}
              <Route path="/services/launch/form" element={<PlatformEnablementForm />} />
              <Route path="/services/manage/form" element={<AMSForm />} />
              <Route path="/services/grow/form" element={<AdvertisingForm />} />
              
              {/* Calculator Route */}
              <Route path="/calculator" element={<ProfitCalculator />} />
              
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
          {/* Global Floating WhatsApp Button */}
          <a
            href="https://api.whatsapp.com/send/?phone=916352653306&text&type=phone_number&app_absent=0"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            className="fixed bottom-6 right-6 z-50 group"
          >
            <div className="relative">
              <span className="absolute inset-0 rounded-full bg-green-500/30 blur-sm"></span>
              <div className="w-14 h-14 rounded-full bg-green-600 text-white flex items-center justify-center shadow-xl ring-2 ring-white/60 transition-transform duration-200 group-hover:scale-105 group-active:scale-95 animate-bounce">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-7 h-7" aria-hidden="true" focusable="false">
                  <path fill="currentColor" d="M20.52 3.48A11.86 11.86 0 0 0 12.02 0C5.4 0 .05 5.35.05 11.97c0 2.11.55 4.16 1.6 5.98L0 24l6.2-1.63a12 12 0 0 0 5.82 1.48h.01c6.62 0 11.97-5.35 11.97-11.97a11.9 11.9 0 0 0-3.48-8.4ZM12.03 21.8a9.75 9.75 0 0 1-4.98-1.36l-.36-.21-3.68.97.98-3.59-.23-.37A9.78 9.78 0 1 1 21.8 12c0 5.39-4.38 9.8-9.77 9.8Zm5.56-7.34c-.3-.16-1.77-.87-2.04-.97-.27-.1-.47-.15-.66.15-.19.29-.76.97-.93 1.16-.17.2-.34.22-.64.08-.3-.14-1.26-.46-2.4-1.47-.89-.79-1.49-1.77-1.66-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.53.15-.18.2-.3.3-.5.1-.2.06-.38-.02-.53-.08-.15-.7-1.7-.95-2.33-.25-.62-.5-.53-.67-.54h-.57c-.2 0-.52.08-.8.38-.27.3-1.05 1.05-1.05 2.56s1.08 2.96 1.24 3.16c.15.2 2.13 3.22 5.16 4.52.72.31 1.26.48 1.69.62.71.23 1.35.2 1.86.13.57-.09 1.71-.69 1.95-1.36.24-.67.24-1.24.17-1.36-.07-.12-.27-.2-.56-.35Z"/>
                </svg>
              </div>
            </div>
          </a>
          </Router>
        </LanguageProvider>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
