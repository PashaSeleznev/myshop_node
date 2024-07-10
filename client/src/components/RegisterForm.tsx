import { FC } from "react"
import { User } from "../containers/AccountContainer"

type RegisterFormProps = {
    newUser: User,
    setNewUser: (user: User) => void,
    toCreate: () => void,
    hasRegError: boolean,
    setIsRegistered: (bool: boolean) => void
}

const RegisterForm: FC<RegisterFormProps> = ({
    newUser,
    setNewUser,
    toCreate,
    hasRegError,
    setIsRegistered
}) => {
  return (
    <div className="register">
          <div className="login-form">
            <h2>Регистрация</h2>
            <section className="em-pass-section">
              <p>Ваше имя:</p>
              <input 
                type="text"
                placeholder="Введите имя"
                className="name-form" 
                value = {newUser.name}
                onChange = {(e) => setNewUser({ ...newUser, name: e.target.value })}
              />
              <p>Адрес электронной почты:</p>
              <input 
                type="email"
                placeholder="Введите e-mail"
                className="email-form" 
                value = {newUser.email}
                onChange = {(e) => setNewUser({...newUser, email: e.target.value})}
              />
              <p>Пароль:</p>
              <input
                type="text"
                placeholder="Введите пароль"
                className="password-form"
                value = {newUser.password}
                onChange = {(e) => setNewUser({...newUser, password: e.target.value})}
              />
            </section>
            <section className="button-section">
              <button onClick={toCreate}>Создать аккаунт</button>
              {hasRegError && <p style={{color: 'red'}}>К этой почте уже привязан аккаунт!</p>}
              <p onClick={() => setIsRegistered(true)}>У меня уже есть аккаунт.</p>
            </section>
          </div>
          <img src="/src/images/register-img.jpg" alt="" />
        </div>
  )
}

export default RegisterForm