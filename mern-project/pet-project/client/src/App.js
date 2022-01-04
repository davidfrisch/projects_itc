import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { Container } from '@material-ui/core'
import Home from './components/Home/Home'
import UserProfile from './components/UserProfile/UserProfile';
import AdminDashboard from './components/Admin/AdminDashboard';
import Page404 from './components/Page404/Page404';
import SearchPage from './components/SearchPage/SearchPage';
import PetPage from './components/PetPage/PetPage';
import Header from './components/Header/Header';
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login } from './actions/auth'
import MyPetsPage from './components/MyPetsPage/MyPetsPage';
import { ROLE } from './constants/roles';

function App() {
  const { currentUserAuth, isLoading } = useSelector(state => state.userStatus)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(login())
    console.log('refresh App.js')
  }, [currentUserAuth?._id])


  function UserRoute({ minRole }) {
    if (!isLoading && (!currentUserAuth || currentUserAuth?.role) < minRole) {
      return <Navigate to='/' />
    }
    return <Outlet />
  }

  function AdminRoute({ children, minRole }) {
    if (!isLoading && (!currentUserAuth || currentUserAuth?.role) < minRole) {
      return <Navigate to='/' />
    }
    return children
  }



  return (
    <BrowserRouter>
        <>
          <Header />
          <Container maxWidth='lg'>
            <Routes>
              {/* Visitor */}
              <Route path="/" element={<Home />} />
              <Route path="/pet/:idPokedex" element={<PetPage />} />
              <Route path="/search" element={<SearchPage />} />

              {/* User */}
              <Route path="/user" element={<UserRoute minRole={ROLE.USER} />}>
                <Route path="profile" element={<UserProfile />} />
                <Route path="mypets" element={<MyPetsPage />} />
              </Route>



              {/* Admin */}
              <Route
                path="/admin"
                element={
                  <AdminRoute minRole={ROLE.ADMIN} >
                    <AdminDashboard />
                  </AdminRoute>
                }
              />

              <Route path="*" element={<Page404 />} />
            </Routes>
          </Container>
        </>
    </BrowserRouter>
  );
}

export default App;
