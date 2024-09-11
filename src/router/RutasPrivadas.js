import {Navigate, useLocation, Outlet} from 'react-router-dom';

export const RutasPrivadas = ({children}) => {

    const {state} = useLocation()


  return state?.logged ? <Outlet/> : <Navigate to='/login'  />;
}; 
