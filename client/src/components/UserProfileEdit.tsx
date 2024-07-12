import { FC } from "react"
import { User } from "../containers/AccountContainer"
import { editUser } from "../reducers/actions"

type UserProfileEditProps = {
    editedUser: User | null,
    setEditedUser: (user: User | null) => void,
    setLogUser: (user: User) => void,
    fetchUsers: () => void,
    setEditingUser: (user: User | null) => void
}

const UserProfileEdit: FC<UserProfileEditProps> = ({
    editedUser,
    setEditedUser,
    setLogUser,
    fetchUsers,
    setEditingUser
}) => {
  return (
    <div className="data">
          <div className="account">
            <h2>Редактирование пользователя</h2>
            <ul className="person">
            <li className="trait">
                <p>Имя пользователя:</p>
                <input
                  type="text"
                  value = {editedUser ? editedUser.name : ''}
                  onChange={(e) => setEditedUser(editedUser ? { ...editedUser, name: e.target.value } : null)}
                />
              </li>
              <li className="trait">
                <p>Адрес электронной почты:</p>
                <input
                  type="text"
                  value = {editedUser ? editedUser.email : ''}
                  onChange={(e) => setEditedUser(editedUser ? { ...editedUser, email: e.target.value } : null)}
                />
              </li>
              <li className="trait">
                <p>Пароль:</p>
                <input
                  type="text"
                  value = {editedUser ? editedUser.password : ''}
                  onChange={(e) => setEditedUser(editedUser ? { ...editedUser, password: e.target.value } : null)}
                />
              </li>
            </ul>
            <section className="button-section">
              <button onClick={() => editUser({editedUser, setLogUser, setEditingUser, fetchUsers})}>Сохранить</button>
              <button onClick={() => setEditingUser(null)}>Отмена</button>
            </section>
          </div>
          <img src="/src/images/person-img.jpg" alt="" />
        </div>
  )
}

export default UserProfileEdit