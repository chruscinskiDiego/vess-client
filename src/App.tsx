import { ToastContainer } from 'react-toastify'
import './App.css'
import { UserProvider } from './contexts/UserContext'
import { Router } from './routes/Router'


function App() {
  return (
    <>
      <UserProvider>
        <Router/>
        <ToastContainer
          toastClassName="my-toast"
          className="my-toast-body"
          progressClassName="my-toast-prog"
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          pauseOnHover
          draggable
          theme="light"
        />
      </UserProvider>
    </>
  )
}

export default App
