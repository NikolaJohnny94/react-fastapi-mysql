import { useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { connect } from 'react-redux'
import { search } from '../actions/userAction'
import { csvExport } from '../methods/csvExport'
import {
  Navbar,
  Nav,
  Container,
  Button,
  Form,
  FormControl,
} from 'react-bootstrap'
import styles from '../styles/Nav.module.css'

const NavComponent = ({ users, search, filtered, filteredUsers }) => {
  const location = useLocation()
  const searchField = useRef()

  const searchUsers = (e) => {
    if (searchField !== '') {
      search(e.target.value)
    }
  }

  const exportCSV = () => {
    csvExport(filteredUsers.length !== 0 && filtered ? filteredUsers : users)
  }

  return (
    <Navbar expand='lg' variant='dark' className={styles.nav_background}>
      <Container fluid>
        <Navbar.Brand className={styles.logo}>
          <Link to='/'>
            <img
              src='https://i.imgur.com/dfmIVgu.gif'
              className={styles.image}
              title='Home'
            />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='navbarScroll' />
        <Navbar.Collapse id='navbarScroll'>
          <Nav
            className={`me-auto my-2 my-lg-0 ${styles.navbarCollapse}`}
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav>
              <Link
                to='/new-user'
                className={`text-light fw-bold text-decoration-none ${styles.link}`}
                title='Create New User'
              >
                Create User
              </Link>
            </Nav>
          </Nav>
          <Form className={`d-flex ${styles.flex_form_search}`}>
            {location.pathname === '/' && (
              <FormControl
                type='search'
                placeholder='Search Through Users'
                className={`me-2 ${styles.search}`}
                aria-label='Search'
                onChange={searchUsers}
              />
            )}

            <Button
              className='fw-bold'
              variant='dark'
              onClick={exportCSV}
              title='Export users data'
            >
              Export
            </Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

const mapStateProps = (state) => ({
  users: state.user.users,
  filteredUsers: state.user.filteredUsers,
  filtered: state.user.filtered,
})

export default connect(mapStateProps, { search })(NavComponent)
