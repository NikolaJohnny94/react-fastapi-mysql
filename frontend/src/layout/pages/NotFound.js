import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import styles from '../../styles/NotFound.module.css'

const NotFound = () => {
  return (
    <div className={styles.h1}>
      <h1 className='text-danger text-center'>
        404 | Not Found{' '}
        <FontAwesomeIcon icon={faExclamationTriangle} size='lg' />
      </h1>
    </div>
  )
}

export default NotFound
