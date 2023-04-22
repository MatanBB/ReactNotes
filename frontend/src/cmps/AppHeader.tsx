import Logo from '../assets/images/Home-Note-logo/cover.png'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { currUser } from '../models/currUser.model'
import { authService } from '../services/auth.service'
import { setAdmin, setFullname, setId } from '../redux/slices/currUser.slice'
import { MouseEventHandler, useEffect, useState } from 'react'
import SignupPage from './SignupPage'

function AppHeader() {
  const [isOpen, setIsOpen] = useState(false)
  const [loginOrSignup, setLoginOrSignup] = useState('')
  const currUser = useSelector((state: any) => { return state.currUser })
  const dispatch = useDispatch()
  useEffect(() => {
    const setupUser = async () => {
      const user = await authService.getLoggedinUser()
      dispatch(setId(user._id || null))
      dispatch(setFullname(user.fullname || null))
      dispatch(setAdmin(user.isAdmin || false))
    }
    setupUser()
  }, [])

  const logUser = (key: string): MouseEventHandler<HTMLButtonElement> | undefined => {
    setIsOpen(true)
    const log = setLoginOrSignup(key)
    return
  }

  const logOut = async () => {
    await authService.logout()
    dispatch(setFullname(null))
    dispatch(setId(null))
    dispatch(setAdmin(false))
    // console.log(currUser);
  }
  return (
    <header className="app-header main-container full">
      <section className='header-section'>
        <div className='left-section'>
          <img src={Logo} className='header-logo' />
          <nav>
            <ul className="nav-links ">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/notes">Notes</Link></li>
              <li><Link to='/about'>About</Link></li>
            </ul>
          </nav>
        </div>
        <div className='right-section'>
          {!currUser._id && <button onClick={() => { logUser('login') }}>Login</button>}
          {!currUser._id && <button onClick={() => { logUser('signup') }}>Signup</button>}
          {currUser._id && <button onClick={() => { logOut() }}>Logout </button>}
          {currUser._id && <>Welcome {currUser.fullname}</>}
        </div>
      </section>
      {isOpen && <SignupPage loginOrSignup={loginOrSignup} setModal={setIsOpen} />}
    </header>
  )
}

export default AppHeader