import { HashRouter, Routes, Route } from 'react-router-dom'
import Layout from '@/components/layout/Layout'
import Home from '@/pages/Home'
import About from '@/pages/About'
import Services from '@/pages/Services'
import Expertise from '@/pages/Expertise'
import EngagementModel from '@/pages/EngagementModel'
import Contact from '@/pages/Contact'

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="services" element={<Services />} />
          <Route path="expertise" element={<Expertise />} />
          <Route path="engagement" element={<EngagementModel />} />
          <Route path="contact" element={<Contact />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}
