import { Routes, Route, Navigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import Product from './pages/Product'
import Solutions from './pages/Solutions'
import Pricing from './pages/Pricing'
import Demo from './pages/Demo'
import Docs from './pages/Docs'
import Company from './pages/Company'
import Customers from './pages/Customers'
import TTSDemo from './pages/TTSDemo'
import EffectsDemo from './pages/demo/EffectsDemo'
import Privacy from './pages/legal/Privacy'
import Terms from './pages/legal/Terms'
import GDPR from './pages/legal/GDPR'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Contact from './pages/Company/Contact'
import Blog from './pages/Company/Blog'
import BlogPost from './pages/Company/BlogPost'
import CaseStudyDetail from './pages/Customers/CaseStudyDetail'
import ProductFeatures from './pages/product/Features'
import ProductTechnology from './pages/product/Technology'
import ProductSecurity from './pages/product/Security'
import SolutionsCustomerService from './pages/solutions/CustomerService'
import SolutionsSales from './pages/solutions/Sales'
import SolutionsCollections from './pages/solutions/Collections'
import SolutionsSurvey from './pages/solutions/Survey'

function App() {
  const { i18n } = useTranslation()

  // Update document language attribute
  useEffect(() => {
    document.documentElement.lang = i18n.language
  }, [i18n.language])

  return (
    <Routes>
      {/* English routes (default) */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="product" element={<Product />} />
        <Route path="product/features" element={<ProductFeatures />} />
        <Route path="product/technology" element={<ProductTechnology />} />
        <Route path="product/security" element={<ProductSecurity />} />
        <Route path="product/*" element={<Product />} />
        <Route path="solutions" element={<Solutions />} />
        <Route path="solutions/customer-service" element={<SolutionsCustomerService />} />
        <Route path="solutions/sales" element={<SolutionsSales />} />
        <Route path="solutions/collections" element={<SolutionsCollections />} />
        <Route path="solutions/*" element={<Solutions />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="demo" element={<Demo />} />
        <Route path="demo/*" element={<Demo />} />
        <Route path="tts-demo" element={<TTSDemo />} />
        <Route path="voice-gallery" element={<TTSDemo />} />
        <Route path="demo/effects" element={<EffectsDemo />} />
        <Route path="docs" element={<Docs />} />
        <Route path="docs/*" element={<Docs />} />
        <Route path="company" element={<Company />} />
        <Route path="company/contact" element={<Contact />} />
        <Route path="company/about" element={<Company />} />
        <Route path="company/careers" element={<Company />} />
        <Route path="blog" element={<Blog />} />
        <Route path="blog/:slug" element={<BlogPost />} />
        <Route path="customers" element={<Customers />} />
        <Route path="customers/:slug" element={<CaseStudyDetail />} />
        <Route path="legal/privacy" element={<Privacy />} />
        <Route path="legal/terms" element={<Terms />} />
        <Route path="legal/gdpr" element={<GDPR />} />
      </Route>

      {/* Chinese routes */}
      <Route path="/zh" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="product" element={<Product />} />
        <Route path="product/features" element={<ProductFeatures />} />
        <Route path="product/technology" element={<ProductTechnology />} />
        <Route path="product/security" element={<ProductSecurity />} />
        <Route path="product/*" element={<Product />} />
        <Route path="solutions" element={<Solutions />} />
        <Route path="solutions/customer-service" element={<SolutionsCustomerService />} />
        <Route path="solutions/sales" element={<SolutionsSales />} />
        <Route path="solutions/collections" element={<SolutionsCollections />} />
        <Route path="solutions/survey" element={<SolutionsSurvey />} />
        <Route path="solutions/*" element={<Solutions />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="demo" element={<Demo />} />
        <Route path="demo/*" element={<Demo />} />
        <Route path="tts-demo" element={<TTSDemo />} />
        <Route path="voice-gallery" element={<TTSDemo />} />
        <Route path="demo/effects" element={<EffectsDemo />} />
        <Route path="docs" element={<Docs />} />
        <Route path="docs/*" element={<Docs />} />
        <Route path="company" element={<Company />} />
        <Route path="company/contact" element={<Contact />} />
        <Route path="company/about" element={<Company />} />
        <Route path="company/careers" element={<Company />} />
        <Route path="blog" element={<Blog />} />
        <Route path="blog/:slug" element={<BlogPost />} />
        <Route path="customers" element={<Customers />} />
        <Route path="customers/:slug" element={<CaseStudyDetail />} />
        <Route path="legal/privacy" element={<Privacy />} />
        <Route path="legal/terms" element={<Terms />} />
        <Route path="legal/gdpr" element={<GDPR />} />
      </Route>

      {/* Auth routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Catch all - redirect to home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
