import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Public from './pages/Public'
import routes from './config/routes'

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path={routes.PUBLIC} element={<Public />}>
            <Route path={routes.HOME} element={<Home />} />

            <Route path={routes.STAR} element={<Home />} />
          </Route>
        </Routes>
      </div>
    </Router>
  )
}

export default App
