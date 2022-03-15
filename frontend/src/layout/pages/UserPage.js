import { useLocation } from 'react-router-dom'
import styles from '../../styles/UserPage.module.css'

const UserPage = () => {
  const location = useLocation()
  const { user } = location.state

  const createdAt = new Date(user.created_at)
  const updatedAt = new Date(user.updated_at)
  return (
    <div className={`mt-5 ${styles.user_container}`}>
      <h1 className='text-light'>
        {user.firstname} {user.lastname}
      </h1>
      <h2>{user.email}</h2>
      <h3>
        {user.city}, {user.country}
      </h3>
      <h4>
        <span className='text-success'>Created</span>
        <br />{' '}
        {createdAt.toLocaleString('en', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: 'numeric',
          minute: '2-digit',
          second: '2-digit',
        })}
      </h4>
      {user.updated_at !== null && (
        <h4>
          <span className='text-info'>Updated</span> <br />{' '}
          {updatedAt.toLocaleString('en', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            second: '2-digit',
          })}
        </h4>
      )}
    </div>
  )
}

export default UserPage
