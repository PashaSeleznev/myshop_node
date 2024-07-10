import { FC } from "react"
import { User } from "../containers/AccountContainer"

type LoginFormProps = {
    logUser: User, 
    setLogUser: (user: User) => void, 
    setIsRegistered: (bool: boolean) => void,
    toEnter: () => void,
    hasEnterError: boolean,
}

const LoginForm: FC<LoginFormProps> = ({
    logUser, 
    setLogUser, 
    setIsRegistered,
    toEnter,
    hasEnterError,
}) => {
  return (
    <div className="enter">
          <div className="login-form">
            <h2>Вход в аккаунт</h2>
            <section className="em-pass-section">
              <p>Адрес электронной почты:</p>
              <input 
                type="email"
                placeholder="Введите e-mail"
                className="email-form" 
                value = {logUser.email}
                onChange = {(e) => setLogUser({...logUser, email: e.target.value})}
              />
              <p>Пароль:</p>
              <input
                type="text"
                placeholder="Введите пароль"
                className="password-form"
                value = {logUser.password}
                onChange = {(e) => setLogUser({...logUser, password: e.target.value})}
              />
            </section>
            <section className="button-section">
              <button onClick={toEnter}>Войти</button>
              {hasEnterError && (<p style={{color: 'red'}} >Неверный адрес электронной почты или пароль!</p>)}
              <p onClick={() => setIsRegistered(false)}>Нет аккаунта? Пройдите регистрацию</p>
            </section>
          </div>
          <img src="/src/images/account-img.jpg" alt="" />
        </div>
  )
}

export default LoginForm