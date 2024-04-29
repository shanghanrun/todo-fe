import {Navigate} from 'react-router-dom'

function PrivateRoute({user, children}){
  console.log('user 있나?', user)
  return (
    user? children : <Navigate to='/login' />
  )
}

export default PrivateRoute