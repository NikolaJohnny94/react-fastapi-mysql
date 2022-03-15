import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'
import {
  createUser,
  showAlert,
  showEmailAlert,
  hideAlert,
  hideEmailAlert,
} from '../../actions/userAction'
import { Form, Button, Alert } from 'react-bootstrap'
import { checkEmail } from '../../methods/checkEmail'
import styles from '../../styles/Forms.module.css'

const CreateUser = ({
  createUser,
  users,
  emailAlertShow,
  showAlert,
  showEmailAlert,
  hideAlert,
  hideEmailAlert,
}) => {
  const navigate = useNavigate()

  const firstName = useRef()
  const lastName = useRef()
  const email = useRef()
  const country = useRef()
  const city = useRef()

  const newUser = (e) => {
    e.preventDefault()
    let emailExist = checkEmail(email.current.value, users)
    if (!emailExist) {
      createUser({
        firstname: firstName.current.value,
        lastname: lastName.current.value,
        email: email.current.value,
        country: country.current.value,
        city: city.current.value,
      })
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
      <Form className={`${styles.form}`} onSubmit={newUser}>
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
            required
            onInvalid={(e) =>
              e.target.setCustomValidity('Country name is required!')
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
            required
            onInvalid={(e) =>
              e.target.setCustomValidity('City name is required!')
            }
            onInput={(e) => e.target.setCustomValidity('')}
          />
        </Form.Group>
        <Button
          className='d-block mt-4 mx-auto fw-bold'
          variant='success'
          type='submit'
        >
          Submit
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
  createUser,
  showAlert,
  showEmailAlert,
  hideAlert,
  hideEmailAlert,
})(CreateUser)
