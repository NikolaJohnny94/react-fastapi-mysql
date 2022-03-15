import { useEffect } from 'react'
import { connect } from 'react-redux'
import { getUsers } from '../../actions/userAction'
import TableComponent from '../../components/TableComponent'
import { Alert } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faUserPlus,
  faUserPen,
  faUserMinus,
} from '@fortawesome/free-solid-svg-icons'

const Home = ({
  users,
  action,
  filteredUsers,
  filtered,
  showAlert,
  responseMessage,
  getUsers,
}) => {
  useEffect(() => {
    setTimeout(() => {
      getUsers()
    }, 300)
  }, [])

  return (
    <>
      {showAlert && (
        <Alert
          variant={
            action === 'create'
              ? 'success'
              : action === 'delete'
              ? 'danger'
              : 'info'
          }
          className='text-center fw-bold'
        >
          <FontAwesomeIcon
            icon={
              action === 'create'
                ? faUserPlus
                : action === 'delete'
                ? faUserMinus
                : faUserPen
            }
          />{' '}
          {responseMessage}
        </Alert>
      )}
      <TableComponent
        users={filteredUsers.length !== 0 && filtered ? filteredUsers : users}
      />
    </>
  )
}

const mapStateProps = (state) => ({
  users: state.user.users,
  filteredUsers: state.user.filteredUsers,
  filtered: state.user.filtered,
  showAlert: state.user.showAlert,
  responseMessage: state.user.responseMessage,
  action: state.user.action,
})

export default connect(mapStateProps, { getUsers })(Home)
