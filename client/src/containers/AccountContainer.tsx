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

  const startEditing = (user: User) => {
    setEditingUser(user);
  };

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
          fetchUsers = {fetchUsers}
         />
      )}

      {isRegistered && isEntered  && editingUser && (
        <UserProfileEdit 
          editedUser = {editedUser}
          setEditedUser = {setEditedUser}
          setLogUser = {setLogUser}
          fetchUsers = {fetchUsers}
          setEditingUser = {setEditingUser}
          />
      )}

      {!isRegistered && (
        <RegisterForm 
          newUser = {newUser}
          setNewUser = {setNewUser}
          fetchUsers = {fetchUsers}
          setHasRegError = {setHasRegError}
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