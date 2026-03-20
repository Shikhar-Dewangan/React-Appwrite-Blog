import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Container, Logo, LogoutBtn } from '../index'


function Header() {
  const authStatus = useSelector((state) => {
    return state.auth.status
  })
  console.log("HEADER AUTH:", authStatus)
  const navigate = useNavigate()

  // const navItems = [
  //   {
  //     name: 'Home',
  //     slug: "/",
  //     active: true
  //   },
  //   {
  //     name: "Login",
  //     slug: "/login",
  //     active: !authStatus,
  //   },
  //   {
  //     name: "Signup",
  //     slug: "/signup",
  //     active: !authStatus,
  //   },
  //   {
  //     name: "All Posts",
  //     slug: "/all-posts",
  //     active: authStatus,
  //   },
  //   {
  //     name: "Add Post",
  //     slug: "/add-post",
  //     active: authStatus,
  //   },
  // ]


  return (
    <header className="bg-gray-900 text-gray-300 shadow-md">
      <Container>
        <nav className="flex justify-between items-center h-16">
          <div className='mr-4'>
            <Link to='/'>
              <Logo width='70px' />

            </Link>
          </div>
          <ul className="flex ml-auto gap-4 items-center">

            <li><Link to="/">Home</Link></li>

            {!authStatus && (
              <>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/signup">Signup</Link></li>
              </>
            )}

            {authStatus && (
              <>
                <li><Link to="/all-posts">All Posts</Link></li>
                <li><Link to="/add-post">Add Post</Link></li>
                <li><LogoutBtn /></li>
              </>
            )}

          </ul>
        </nav>
      </Container>
    </header>

  )
}

export default Header;