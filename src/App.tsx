import { Navigate, Route, Routes } from 'react-router-dom'
import { ScrollToTop } from './components/ScrollToTop'

import HomePage from './pages/HomePage'
import ThesisPage from './pages/ThesisPage'
import OriginStoryPage from './pages/OriginStoryPage'
import AboutPage from './pages/AboutPage'
import AdvisoryPage from './pages/AdvisoryPage'
import PrivacyPage from './pages/PrivacyPage'
import TermsPage from './pages/TermsPage'
import LetsChatPage from './pages/LetsChatPage'

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/thesis" element={<ThesisPage />} />
        <Route path="/origin-story" element={<OriginStoryPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/advisory" element={<AdvisoryPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/lets-chat" element={<LetsChatPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}

export default App
