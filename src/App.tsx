import { ToastContainer } from 'react-toastify'
import './App.css'
import { UserProvider } from './contexts/UserContext'
import { Router } from './routes/Router'
import { GoogleOAuthProvider } from '@react-oauth/google';
function App() {
  return (
    <>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID!}>
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
      </GoogleOAuthProvider>
    </>
  )
}

export default App
