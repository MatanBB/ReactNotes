import { Dispatch, SetStateAction, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setAdmin, setFullname, setId } from '../redux/slices/currUser.slice'
import { authService } from "../services/auth.service"
interface Props {
  loginOrSignup: string,
  setModal: Dispatch<SetStateAction<boolean>>
}

function SignupPage({ loginOrSignup, setModal }: Props) {
  const currUser = useSelector((state: any) => { return state.currUser })
  const dispatch = useDispatch()
  const [password, setInputPassword] = useState('')
  const [username, setInputUsername] = useState('')
  const [fullname, setInputFullname] = useState('')
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!password || !username || (!fullname && loginOrSignup === 'signup')) return 'User credentials missing'
    const user = loginOrSignup === 'login' ?
      await authService.login({ username, password }) : await authService.signup({ username, password, fullname, isAdmin: false })
    dispatch(setAdmin(user.isAdmin))
    dispatch(setFullname(user.fullname))
    dispatch(setId(user._id))
    setModal(false)
  }

  return (
    <section className="user-page">
      <form onSubmit={onSubmit}>
        <button onClick={()=>setModal(false)} className="close-button">x</button>
        <h2>{loginOrSignup === 'login' ? 'Login' : 'Sign up'}</h2>

        <main>
          <div>
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" value={username}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setInputUsername(e.target.value) }} />
          </div>

          {
            loginOrSignup === 'signup' &&
            <div>
              <label htmlFor="fullname">Full name:</label>
              <input type="text" id="fullname" value={fullname}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setInputFullname(e.target.value) }} />
            </div>
          }

          <div>
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setInputPassword(e.target.value) }} />
          </div>
        </main>
        <button>{loginOrSignup === 'login' ? 'Login' : 'Sign up'}</button>
      </form>
    </section>
  )
}

export default SignupPage