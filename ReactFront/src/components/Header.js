import { Link } from "react-router-dom"

const Header = () => {
  return (
    <div>
      <header>
        <nav className='navbar navbar-expand-sd navbar-dark bg-dark'>
          <div className="container">
            <Link to='/employees' className="navbar-brand">
              <i class="fa fa-address-card text-info" aria-hidden="true"></i> Employee Management Application
            </Link>
          </div>
        </nav>
      </header>
    </div>
  )
}

export default Header