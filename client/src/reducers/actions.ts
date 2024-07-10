import { Users } from "../containers/AccountContainer";
import { AppDispatch} from "../reduxStore";

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