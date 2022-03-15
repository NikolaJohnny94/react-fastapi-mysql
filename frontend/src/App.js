import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import NavComponent from './layout/NavComponent.js'
import Footer from './layout/Footer.js'
import Home from './layout/pages/Home.js'
import CreateUser from './layout/pages/CreateUser.js'
import UpdateUser from './layout/pages/UpdateUser.js'
import UserPage from './layout/pages/UserPage.js'
import NotFound from './layout/pages/NotFound.js'
import { Provider } from 'react-redux'
import store from './store.js'

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <NavComponent />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='new-user' element={<CreateUser />} />
          <Route path='update-user' element={<UpdateUser />} />
          <Route path='user-page' element={<UserPage />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
        <Footer />
      </Router>
    </Provider>
  )
}

export default App
