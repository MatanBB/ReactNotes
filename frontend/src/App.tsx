
import NoteIndex from './cmps/NoteIndex'
// import './App.css'
import AppHeader from './cmps/AppHeader'
import AppFooter from './cmps/AppFooter'
import AboutPage from './cmps/AboutPage'
import HomePage from './cmps/HomePage'
import { Route, Routes } from 'react-router-dom'

function App() {


  return (
    <div className="App">
      <main className='main-container'>
        <AppHeader />
        <section className='app-routes'>
          <Routes>
            <Route path='/' element={<HomePage />} />
            {/* <Route path='signup' element={<SignupPage />} />
          <Route path='login' element={<LoginPage />} /> */}
            <Route path='/notes' element={<NoteIndex />} />
            <Route path='/about' element={<AboutPage />} />
          </Routes>
        </section>
        <AppFooter />
      </main>

    </div>
  )
}

export default App
