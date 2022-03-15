export const checkEmail = (email, users) => {
  const checkForEmail = users.filter((user) => user.email === email)
  if (checkForEmail.length > 0) {
    return true
  } else {
    return false
  }
}

export const checkUpdateEmail = (originalEmail, currentEmail, users) => {
  const checkForEmail = users.filter(
    (user) => user.email !== originalEmail && user.email === currentEmail
  )
  if (checkForEmail.length > 0) {
    return true
  } else {
    return false
  }
}
