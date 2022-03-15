import {
  GET_USERS,
  CREATE_USER,
  UPDATE_USER,
  DELETE_USER,
  SHOW_ALERT,
  HIDE_ALERT,
  SEARCH,
  SHOW_EMAIL_ALERT,
  HIDE_EMAIL_ALERT,
} from '../actions/types'

const initialState = {
  users: [],
  filtered: false,
  filteredUsers: [],
  action: '',
  showAlert: false,
  showEmailAlert: false,
  responseMessage: '',
  errorMessage: '',
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        users: action.payload,
        filtered: false,
      }
    case CREATE_USER:
      return {
        ...state,
        users: [...state.users, action.payload.data],
        action: 'create',
        responseMessage: action.payload.message,
        filtered: false,
      }
    case UPDATE_USER:
      return {
        ...state,
        users: state.users.map((user) =>
          user.id === action.payload.data.id ? action.payload.data : user
        ),
        action: 'update',
        responseMessage: action.payload.message,
        filtered: false,
      }
    case DELETE_USER:
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.payload.data.id),
        action: 'delete',
        responseMessage: action.payload.message,
        filtered: false,
      }
    case SEARCH:
      return {
        ...state,
        filtered: true,
        filteredUsers: state.users.filter(
          (user) =>
            user.firstname
              .toLowerCase()
              .includes(action.payload.toLowerCase()) ||
            user.lastname
              .toLowerCase()
              .includes(action.payload.toLowerCase()) ||
            user.email.toLowerCase().includes(action.payload.toLowerCase()) ||
            user.country.toLowerCase().includes(action.payload.toLowerCase()) ||
            user.city.toLowerCase().includes(action.payload.toLowerCase())
        ),
      }
    case SHOW_ALERT:
      return {
        ...state,
        showAlert: true,
      }
    case HIDE_ALERT:
      return {
        ...state,
        showAlert: false,
        responseMessage: '',
      }
    case SHOW_EMAIL_ALERT: {
      return {
        ...state,
        showEmailAlert: true,
      }
    }
    case HIDE_EMAIL_ALERT: {
      return {
        ...state,
        showEmailAlert: false,
      }
    }
    default:
      return state
  }
}

export default userReducer
