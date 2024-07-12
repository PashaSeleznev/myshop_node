import { User, Users } from "../containers/AccountContainer";
import { AppDispatch} from "../reduxStore";
import store from "store";

type toCreateProps = {
  users: Users,
  newUser: User,
  fetchUsers: () => void,
  setNewUser: (user: User) => void,
  setIsRegistered: (bool: boolean) => void,
  setHasRegError: (bool: boolean) => void
}

type deleteUserProps = {
  fetchUsers: () => void,
  clearLocalStorage: () => void,
  userId: User['_id']
}

type editedUserProps = {
  editedUser: User | null,
  setLogUser: (user: User) => void,
  setEditingUser: (user: User | null) => void,
  fetchUsers: () => void,
}

export const fetchUsersAction = () => {
    return async (dispatch: AppDispatch) => {
      dispatch({ type: 'FETCH_USERS_REQUEST' });
      try {
        const response = await fetch('/users');
        const users: Users = await response.json();
        dispatch({ type: 'FETCH_USERS_SUCCESS', payload: users });
      } catch (error) {
        dispatch({ type: 'FETCH_USERS_FAILURE', payload: 'Ошибка при загрузке данных' });
      }
    };
  };

export const toCreate = async ({users, newUser, fetchUsers, setNewUser, setIsRegistered, setHasRegError} : toCreateProps) => {
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

export const deleteUser  = async({fetchUsers, clearLocalStorage, userId} : deleteUserProps) => {
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
}

export const editUser = async({editedUser, setLogUser, setEditingUser, fetchUsers} : editedUserProps) => {
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