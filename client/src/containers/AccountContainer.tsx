import AgreeToDelete from "../components/AgreeToDelete"
import LoginForm from "../components/LoginForm";
import { useState, useEffect, useCallback, FC } from "react";
import { AccountPageProps } from "../pages/AccountPage";
import { AppDispatch, RootStateType} from "../reduxStore";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsersAction } from "../reducers/actions";
import store from "store";
import UserProfile from "../components/UserProfile";
import UserProfileEdit from "../components/UserProfileEdit";
import RegisterForm from "../components/RegisterForm";

export type User = {
  _id: number;
  name: string;
  password: string,
  email: string,
};

export type Users = User[]

const AccountContainer: FC<AccountPageProps> = ({showDeleteModal, handleCancel, handleDelete, toLogin}) => {

  const [newUser, setNewUser] = useState<User>({ _id: 0, name: '', password: '', email: '' })
  const [logUser, setLogUser] = useState<User>(store.get('logUser') || { _id: 0, name: '', password: '', email: '' })
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [editedUser, setEditedUser] = useState<User | null>(null)
  const [isRegistered, setIsRegistered] = useState(true)
  const [isEntered, setIsEntered] = useState(store.get('isEntered') || false)
  const [hasRegError, setHasRegError] = useState(false)
  const [hasEnterError, setHasEnterError] = useState(false)

  const users = useSelector((state: RootStateType) => state.account.users)

  const dispatch = useDispatch<AppDispatch>()

  const fetchUsers = useCallback(() => {
    dispatch(fetchUsersAction());
  }, [dispatch]);

  const toCreate = async () => {
    const emailCheck = users.find(user => user.email === newUser.email);
    if (!emailCheck) {
      try {
        const response = await fetch('/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newUser),
        });
        if (!response.ok) {
          throw new Error('Ошибка сети при отправке данных!');
        }
        const data = await response.json();
        console.log('Данные успешно отправлены:', data);
        fetchUsers();
        setNewUser({ ...newUser, name: '', password: '', email: '' });
        setIsRegistered(true);
      } catch (error) {
        console.error('Ошибка при отправке данных:', error);
      }
    } else {
      setHasRegError(true);
    }
  };

  const toEnter = () => {
    const foundUser = users.find(user => user.email === logUser.email && user.password === logUser.password)
    if (foundUser) {
      setLogUser(foundUser)
      setIsEntered(true)
      setHasEnterError(false)
      store.set('logUser', foundUser)
    } else {
      setHasEnterError(true)
    }
  }

  const deleteUser = async (userId: User['_id']) => {
    try {
      const response = await fetch(`/users/${userId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Ошибка сети при удалении пользователя!');
      }
      console.log(`Пользователь с ID ${userId} был удален.`);
      fetchUsers()
      clearLocalStorage()
    } catch (error) {
      console.error('Ошибка при удалении пользователя:', error);
    }
  };

  const startEditing = (user: User) => {
    setEditingUser(user);
  };

  const editUser = async() => {
    if (editedUser) {
      try {
        const updatedUser = {
          name: editedUser.name,
          password: editedUser.password,
          email: editedUser.email
        };
  
        const response = await fetch(`/users/${editedUser._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedUser),
        });
  
        if (response.ok) {
          console.log('Пользователь обновлен');
          store.set('logUser', editedUser)
          setLogUser(editedUser)

        } else {
          console.error('Ошибка при обновлении пользователя');
        }
      } catch (error) {
        console.error('Ошибка при отправке запроса', error);
      }
    } else {
      console.log('Нет пользователя для редактирования');
    }
    setEditingUser(null);
    fetchUsers()
  }

  const clearLocalStorage = () => {
    setIsEntered(false)
    store.remove('isEntered')
    store.remove('logUser')
    setLogUser({ _id: 0, name: '', password: '', email: '' })
  }

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  useEffect(() => {
    if (editingUser) {
      setEditedUser(editingUser)
    }
  }, [editingUser])

  useEffect(() => {
    toLogin(isEntered)
    store.set('isEntered', isEntered)
  }, [isEntered, toLogin])

  return (
    <div>
      {isRegistered && !isEntered && (
        <LoginForm 
          logUser = {logUser}
          setLogUser = {setLogUser}
          setIsRegistered = {setIsRegistered}
          toEnter = {toEnter}
          hasEnterError = {hasEnterError} 
        />
      )}

      {isRegistered && isEntered  && !editingUser && (
        <UserProfile 
          logUser = {logUser}
          startEditing = {startEditing}
          clearLocalStorage = {clearLocalStorage}
          setLogUser = {setLogUser}
          setIsEntered = {setIsEntered}
          deleteUser = {deleteUser}
         />
      )}

      {isRegistered && isEntered  && editingUser && (
        <UserProfileEdit 
          editedUser = {editedUser}
          setEditedUser = {setEditedUser}
          editUser = {editUser}
          setEditingUser = {setEditingUser}
          />
      )}

      {!isRegistered && (
        <RegisterForm 
          newUser = {newUser}
          setNewUser = {setNewUser}
          toCreate = {toCreate}
          hasRegError = {hasRegError}
          setIsRegistered = {setIsRegistered}
          />
      )}

      {showDeleteModal && 
        <AgreeToDelete 
          handleCancel={handleCancel}
          handleDelete={handleDelete}
        />
      }

    </div>
  )
  
}

export default AccountContainer
