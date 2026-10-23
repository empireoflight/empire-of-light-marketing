import { Navigate, Route, Routes } from 'react-router-dom'
import { ScrollToTop } from './components/ScrollToTop'

import HomePage from './pages/HomePage'
import ThesisPage from './pages/ThesisPage'
import LivingProofPage from './pages/LivingProofPage'
import TeamsPage from './pages/TeamsPage'
import NowWhatCohortPage from './pages/NowWhatCohortPage'
import AboutPage from './pages/AboutPage'
import AdvisoryPage from './pages/AdvisoryPage'
import PrivacyPage from './pages/PrivacyPage'
import TermsPage from './pages/TermsPage'
import LetsChatPage from './pages/LetsChatPage'
import EventOfferPage from './pages/EventOfferPage'

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/thesis" element={<ThesisPage />} />
        <Route path="/living-proof" element={<LivingProofPage />} />
        <Route path="/origin-story" element={<Navigate to="/living-proof" replace />} />
        <Route path="/teams" element={<TeamsPage />} />
        <Route path="/now-what-cohort" element={<NowWhatCohortPage />} />
        <Route path="/unmasking-cohort" element={<Navigate to="/now-what-cohort" replace />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/advisory" element={<AdvisoryPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/lets-chat" element={<LetsChatPage />} />
        <Route path="/event" element={<EventOfferPage />} />
        <Route path="/event/:slug" element={<EventOfferPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}

export default App
