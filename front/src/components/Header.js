import { Link } from "react-router-dom"

const Header = () => {
  return (
    <div>
        <header>
            <nav className='navbar navbar-expand-md navbar-dark bg-dark'>
                <div>
                    <Link to = '/' className = "navbar-brand">
                        Employee Management Application
                    </Link>
                </div>
            </nav>
        </header>
    </div>
  )
}

export default Header