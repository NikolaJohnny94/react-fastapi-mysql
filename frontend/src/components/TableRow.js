import { useState } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { deleteUser, showAlert, hideAlert } from '../actions/userAction'
import { Button, Modal } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'

const TableRow = ({ user, deleteUser, showAlert, hideAlert, rowNumber }) => {
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const removeUser = () => {
    deleteUser(user.id)

    showAlert()

    setTimeout(() => {
      hideAlert()
    }, 3000)
  }
  return (
    <tr>
      <td>{rowNumber}</td>
      <td>{user.firstname}</td>
      <td>{user.lastname}</td>
      <td>
        {' '}
        <Link to={'/user-page'} state={{ user }}>
          {user.email}
        </Link>
      </td>
      <td>{user.country}</td>
      <td>{user.city}</td>
      <td>
        <Link
          to={'/update-user'}
          state={{ user }}
          className='text-decoration-none'
          title='Update existing user'
        >
          <Button className='bg-primary d-block mx-auto border-0'>
            Update
          </Button>
        </Link>
      </td>
      <td>
        <Modal
          show={show}
          onHide={handleClose}
          backdrop='static'
          keyboard={false}
        >
          <Modal.Header closeButton className='bg-dark'>
            <Modal.Title className='text-danger bg-dark'>
              <FontAwesomeIcon icon={faTriangleExclamation} size='lg' /> Delete
              user ?
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className='bg-dark text-light'>
            Are you sure you want to delete user:{' '}
            <span className='fw-bold text-danger text-decoration-underline'>
              <Link to={'/user-page'} state={{ user }}>
                {user.email}
              </Link>
            </span>
            ?
          </Modal.Body>
          <Modal.Footer>
            <Button variant='danger' onClick={removeUser}>
              Yes
            </Button>
            <Button variant='secondary' onClick={handleClose}>
              No
            </Button>
          </Modal.Footer>
        </Modal>
        <Button
          className='d-block mx-auto'
          variant='danger'
          onClick={handleShow}
          title='Delete user'
        >
          Delete
        </Button>
      </td>
    </tr>
  )
}

export default connect(null, { deleteUser, showAlert, hideAlert })(TableRow)
