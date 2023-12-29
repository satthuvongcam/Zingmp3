import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Public from './pages/Public'
import routes from './config/routes'
import Album from './pages/Album'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <>
      <Router>
        <div>
          <Routes>
            <Route path={routes.PUBLIC} element={<Public />}>
              <Route path={routes.HOME} element={<Home />} />
              <Route path={routes.ALBUM} element={<Album />} />

              <Route path={routes.STAR} element={<Home />} />
            </Route>
          </Routes>
        </div>
      </Router>
      <ToastContainer
        position='top-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
      />
    </>
  )
}

export default App
