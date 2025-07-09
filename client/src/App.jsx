import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Shop from './pages/Shop';
import Blogs from './pages/blogs';  
import CaseStudies from './pages/caseStudies';
import GuidesTutorials from './pages/guidesTutorials';
import Faqs from './pages/faqss';
import Careers from './pages/Careers';
import Contact from './pages/Contact';
import CustomerLogin from './pages/CutomerLogin';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService'; 
import CookiePolicy from './pages/CookiePolicy';
import CoBrandingPage from './pages/CoBranding';
import AccountManagementServices from './pages/ams';
import ECommerce from './pages/eCommerce';
import PartnerCommitments from './pages/ourPartners';
import PartnerOnboarding from './pages/partnersOnboarding';
import PlatformEnablement from './pages/platformEnable';
import ForProductPartners from './pages/whyPartners';

import EmailVerify from './components/EmailVerify';
import ResetPassword from './components/ResetPassword';
import ProtectedRoute from './components/ProtectedRoute';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import BlogForm from './components/admin/BlogForm';
import BlogEdit from './components/admin/BlogEdit';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from './context/AuthContext';

// Layout wrapper component
const Layout = ({ children }) => {
  const location = useLocation();
  
  // Exact routes where we don't want to show header and footer
  const noHeaderFooterRoutes = [
    '/customerlogin',
    '/reset-password',
    '/email-verify',
    '/admin/login',
    '/admin',
    '/admin/blogs/new',
    '/admin/blogs/edit'
  ];
  
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
            <Route path="/services/coBranding" element={<CoBrandingPage />} />          
            <Route path="/services/ams" element={<AccountManagementServices />} />
            <Route path="/services/platformEnable" element={<PlatformEnablement />} />
            <Route path="/services/eCommerce" element={<ECommerce />} />
            <Route path="/partners/ourPartners" element={<PartnerCommitments />} />
            <Route path="/partners/whyPartners" element={<ForProductPartners/>} />
            <Route path="/partners/partnersOnboarding" element={<PartnerOnboarding />} />
           
            <Route path="/shop" element={<Shop />} />
            <Route path="/resources/blogs" element={<Blogs />} />
            <Route path="/resources/caseStudies" element={<CaseStudies />} />
            <Route path="/resources/guidesTutorials" element={<GuidesTutorials />} />
            <Route path='/resources/faqss' element={<Faqs />} />
            <Route path="resources/careers" element={<Careers />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/customerlogin" element={<CustomerLogin />} />
            <Route path="/privacypolicy" element={<PrivacyPolicy />} />
            <Route path="/termsofservice" element={<TermsOfService />} />
            <Route path="/cookiepolicy" element={<CookiePolicy />} />
            <Route path="/email-verify" element={<EmailVerify />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            
            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute key="admin-route">
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
            <Route
              path="/admin/blogs/new"
              element={
                <ProtectedRoute key="admin-blog-new">
                  <BlogForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/blogs/edit/:id"
              element={
                <ProtectedRoute key="admin-blog-edit">
                  <BlogEdit />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;