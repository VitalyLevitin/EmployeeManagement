import {useState, useEffect} from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import EmployeeService from '../services/EmployeeService'

const UpdateEmployee = () => {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const navigate = useNavigate()
    const {id} = useParams();


    useEffect(() => {
        EmployeeService.getEmployeeById(id)
          .then(response => {
              setFirstName(response.data.firstName)
              setLastName(response.data.lastName)
              setEmail(response.data.email)
          }).catch(e => console.log(e))
      
      }, [])

      const update = (e) => {
          e.preventDefault();

          const employee = {firstName, lastName, email}
          EmployeeService.updateEmployee(id, employee)
            .then(() => { navigate("/")})
            .catch(error => console.log(error))
      }


  return (
    <>
            <br></br>
            <div className = 'container'>
                <div className = 'row'>
                    <div className = 'card col-md-6 offset-md-3'>
                        <h2 className = 'text-center'> Update Employee </h2>
                        <div claasName = 'card-body' >
                            <form>
                                <div className = 'form-group mb-2'>
                                    <label className = 'form-label'> First Name: </label>
                                    <input
                                        type = 'text'
                                        placeholder = 'Enter first name'
                                        name = 'firstName'
                                        className = 'form-control'
                                        value = {firstName}
                                        onChange = {e => setFirstName(e.target.value)}
                                        >
                                    </input>
                                </div>

                                <div className = 'form-group mb-2'>
                                    <label className = 'form-label'> Last Name: </label>
                                    <input
                                        type = 'text'
                                        placeholder = 'Enter last name'
                                        name = 'lastName'
                                        className = 'form-control'
                                        value = {lastName}
                                        onChange = {e => setLastName(e.target.value)}
                                        >
                                    </input>
                                </div>

                                <div className = 'form-group mb-2'>
                                    <label className = 'form-label'> Email: </label>
                                    <input
                                        type = 'email'
                                        placeholder = 'Enter email address'
                                        name = 'email'
                                        className = 'form-control'
                                        value = {email}
                                        onChange = {e => setEmail(e.target.value)}
                                        >
                                    </input>
                                </div>
                                <button className='btn btn-success mb-2' onClick= {e => update(e)}> Save </button>
                                <Link to = "/" className='btn btn-danger ms-2 mb-2'> Cancel </Link>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
  )
}

export default UpdateEmployee