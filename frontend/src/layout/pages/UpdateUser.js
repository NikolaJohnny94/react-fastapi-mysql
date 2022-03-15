import { useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { connect } from 'react-redux'
import {
  updateUser,
  showAlert,
  hideAlert,
  showEmailAlert,
  hideEmailAlert,
} from '../../actions/userAction'
import { Form, Button, Alert } from 'react-bootstrap'
import { checkUpdateEmail } from '../../methods/checkEmail'
import styles from '../../styles/Forms.module.css'

const UpdateUser = ({
  users,
  emailAlertShow,
  updateUser,
  showAlert,
  showEmailAlert,
  hideAlert,
  hideEmailAlert,
}) => {
  const navigate = useNavigate()

  const location = useLocation()
  const { user } = location.state

  const firstName = useRef()
  const lastName = useRef()
  const email = useRef()
  const country = useRef()
  const city = useRef()

  const ediUser = (e) => {
    e.preventDefault()
    let emailExist = checkUpdateEmail(user.email, email.current.value, users)
    if (
      firstName.current.value === user.firstname &&
      lastName.current.value === user.lastname &&
      email.current.value === user.email &&
      country.current.value === user.country &&
      city.current.value === user.city
    ) {
      return navigate('/')
    } else if (!emailExist) {
      let updatedBody = {
        firstname: '',
        lastname: '',
        email: '',
        country: '',
        city: '',
      }
      if (firstName.current.value) {
        updatedBody.firstname = firstName.current.value
      }
      if (lastName.current.value) {
        updatedBody.lastname = lastName.current.value
      }
      if (email.current.value) {
        updatedBody.email = email.current.value
      }
      if (country.current.value) {
        updatedBody.country = country.current.value
      }
      if (city.current.value) {
        updatedBody.city = city.current.value
      }
      updateUser(user.id, updatedBody)

      showAlert()
      setTimeout(() => {
        hideAlert()
      }, 3000)
      return navigate('/')
    } else {
      showEmailAlert()
      setTimeout(() => {
        hideEmailAlert()
      }, 3000)
    }
  }

  return (
    <>
      {emailAlertShow && (
        <Alert variant='warning' className='fw-bold text-center'>
          Email: <u>{email.current.value}</u> is already taken!
        </Alert>
      )}
      <Form className={`${styles.form}`} onSubmit={ediUser}>
        <Form.Group className='mb-3'>
          <Form.Label
            className={`d-block text-center text-light fw-bold ${styles.label}`}
          >
            First Name
          </Form.Label>
          <Form.Control
            type='text'
            placeholder="Enter User's First Name"
            ref={firstName}
            defaultValue={user.firstname}
            required
            onInvalid={(e) =>
              e.target.setCustomValidity('First Name is required!')
            }
            onInput={(e) => e.target.setCustomValidity('')}
          />
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label
            className={`d-block text-center text-light fw-bold ${styles.label}`}
          >
            Last Name
          </Form.Label>
          <Form.Control
            type='text'
            placeholder="Enter User's Last Name"
            ref={lastName}
            defaultValue={user.lastname}
            required
            onInvalid={(e) =>
              e.target.setCustomValidity('Last Name is required!')
            }
            onInput={(e) => e.target.setCustomValidity('')}
          />
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label
            className={`d-block text-center text-light fw-bold ${styles.label}`}
          >
            Email
          </Form.Label>
          <Form.Control
            type='email'
            placeholder="Enter User's Email Address"
            ref={email}
            defaultValue={user.email}
            required
            onInvalid={(e) => e.target.setCustomValidity('Email is required!')}
            onInput={(e) => e.target.setCustomValidity('')}
          />
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label
            className={`d-block text-center text-light fw-bold ${styles.label}`}
          >
            Country
          </Form.Label>
          <Form.Control
            type='text'
            placeholder="Enter User's Country"
            ref={country}
            defaultValue={user.country}
            required
            onInvalid={(e) =>
              e.target.setCustomValidity('Country Name is required!')
            }
            onInput={(e) => e.target.setCustomValidity('')}
          />
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label
            className={`d-block text-center text-light fw-bold ${styles.label}`}
          >
            City
          </Form.Label>
          <Form.Control
            type='text'
            placeholder="Enter User's City"
            ref={city}
            defaultValue={user.city}
            required
            onInvalid={(e) =>
              e.target.setCustomValidity('City Name is required!')
            }
          />
        </Form.Group>
        <Button
          className='d-block mt-4 mx-auto'
          variant='success'
          type='submit'
        >
          Update
        </Button>
      </Form>
    </>
  )
}

const mapStateToProps = (state) => ({
  users: state.user.users,
  emailAlertShow: state.user.showEmailAlert,
})

export default connect(mapStateToProps, {
  updateUser,
  showAlert,
  hideAlert,
  showEmailAlert,
  hideEmailAlert,
})(UpdateUser)
