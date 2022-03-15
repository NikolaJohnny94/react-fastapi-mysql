import { Table } from 'react-bootstrap'
import TableRow from './TableRow'
import styles from '../styles/Table.module.css'

const TableComponent = ({ users }) => {
  return (
    <Table
      striped
      bordered
      hover
      variant='dark'
      responsive
      className={`mb-5 ${styles.table}`}
    >
      <thead>
        <tr>
          <th>#</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Country</th>
          <th>City</th>
          <th>Update</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <TableRow
            key={user.id}
            user={user}
            rowNumber={users.indexOf(user) + 1}
          />
        ))}
      </tbody>
    </Table>
  )
}

export default TableComponent
