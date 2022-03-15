import axios from 'axios'
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
} from './types'

export const getUsers = () => {
  return async (dispatch) => {
    const res = await axios.get('/users')
    dispatch({
      type: GET_USERS,
      payload: res.data.data,
    })
  }
}

export const createUser = (user) => {
  return async (dispatch) => {
    const res = await axios.post('/users', user)
    dispatch({
      type: CREATE_USER,
      payload: res.data,
    })
  }
}

export const updateUser = (id, body) => {
  return async (dispatch) => {
    const res = await axios.put(`/users/${id}`, body)
    dispatch({
      type: UPDATE_USER,
      payload: res.data,
    })
  }
}

export const deleteUser = (id) => {
  return async (dispatch) => {
    const res = await axios.delete(`/users/${id}`)
    dispatch({
      type: DELETE_USER,
      payload: res.data,
    })
  }
}

export const search = (text) => {
  return {
    type: SEARCH,
    payload: text,
  }
}

export const showAlert = () => {
  return {
    type: SHOW_ALERT,
  }
}

export const hideAlert = () => {
  return {
    type: HIDE_ALERT,
  }
}

export const showEmailAlert = () => {
  return {
    type: SHOW_EMAIL_ALERT,
  }
}

export const hideEmailAlert = () => {
  return {
    type: HIDE_EMAIL_ALERT,
  }
}
