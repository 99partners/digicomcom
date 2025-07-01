import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Partners from './pages/Partners';
import Shop from './pages/Shop';
import Resources from './pages/Resources';
import Careers from './pages/Careers';
import Contact from './pages/Contact';
import CustomerLogin from './pages/CutomerLogin';
import PartnerLogin from './pages/PartnerLogin';
import Partner from './pages/Partner';
import FAQs from './pages/Faqs';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService'; 
import CookiePolicy from './pages/CookiePolicy';
import CoBranding from './pages/CoBranding';
import PlatformEnablementAMS from './pages/PlatformEnablementAMS';
import EmailVerify from './components/EmailVerify';
import ResetPassword from './components/ResetPassword';
import ProtectedRoute from './components/ProtectedRoute';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from './context/AuthContext';

// Layout wrapper component
const Layout = ({ children }) => {
  const location = useLocation();
  
  // List of routes where we don't want to show header and footer
  const noHeaderFooterRoutes = ['/partnerlogin', '/customerlogin', '/partner', '/reset-password', '/email-verify'];
  
  const shouldShowHeaderFooter = !noHeaderFooterRoutes.includes(location.pathname);

  return (
    <div className="min-h-screen bg-white">
      {shouldShowHeaderFooter && <Header />}
      <main className={!shouldShowHeaderFooter ? 'h-screen' : ''}>
        <ToastContainer />
        {children}
      </main>
      {shouldShowHeaderFooter && <Footer />}
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/co-branding" element={<CoBranding />} />
            <Route path="/services/platform-ams" element={<PlatformEnablementAMS />} />
            <Route path="/partners" element={<Partners />} />
            <Route 
              path="/partner" 
              element={
                <ProtectedRoute key="partner-route">
                  <Partner />
                </ProtectedRoute>
              } 
            />
            <Route path="/shop" element={<Shop />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/customerlogin" element={<CustomerLogin />} />
            <Route path="/partnerlogin" element={<PartnerLogin />} />
            <Route path="/faqs" element={<FAQs />} />
            <Route path="/privacypolicy" element={<PrivacyPolicy />} />
            <Route path="/termsofservice" element={<TermsOfService />} />
            <Route path="/cookiepolicy" element={<CookiePolicy />} />
            <Route path="/co-branding" element={<CoBranding />} />
            <Route path="/email-verify" element={<EmailVerify />} />
            <Route path="/reset-password" element={<ResetPassword/>} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;
