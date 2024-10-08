import { FC } from "react"
import { User } from "../containers/AccountContainer"
import { deleteUser } from "../reducers/actions"

type UserProfileProps = {
    logUser: User,
    startEditing: (user: User) => void,
    clearLocalStorage: () => void,
    setLogUser: (user: User) => void, 
    setIsEntered: (bool: boolean) => void,
    fetchUsers: () => void,
}

const UserProfile: FC<UserProfileProps> = ({
    logUser,
    startEditing,
    clearLocalStorage,
    setLogUser, 
    setIsEntered,
    fetchUsers
}) => {

    return (
        <div className="data">
          <div className="account">
            <h2>Добро пожаловать в личный кабинет, {logUser.name}!</h2>
            <ul className="person">
              <li>Имя пользователя: {logUser.name}</li>
              <li>Адрес электронной почты: {logUser.email}</li>
              <li>Пароль: {logUser.password}</li>
            </ul>
            <section className="button-section">
              <button onClick={() => startEditing(logUser)}>Изменить</button>
              <button onClick={() => clearLocalStorage()}>Выйти</button>
              <button onClick = {() => {
                deleteUser({ userId: logUser._id, fetchUsers, clearLocalStorage })
                setIsEntered(false)
                setLogUser({ _id: 0, name: '', password: '', email: '' })
              }}>Удалить аккаунт</button>
            </section>
          </div>
          <img src="/src/images/person-img.jpg" alt="" />
        </div>
  )
}

export default UserProfile