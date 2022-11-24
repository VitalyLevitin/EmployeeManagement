import {useState, useEffect} from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import EmployeeService from '../services/EmployeeService'

const UpdateEmployee = () => {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const navigate = useNavigate()
    const {employeeId} = useParams();


    useEffect(() => {
        EmployeeService.getEmployeeById(employeeId)
          .then(response => {
              setFirstName(response.data.firstName)
              setLastName(response.data.lastName)
              setEmail(response.data.email)
          }).catch(e => console.log(e))
      
      }, [])

      const update = (e) => {
          e.preventDefault();

          const employee = {firstName, lastName, email}
          EmployeeService.updateEmployee(employeeId, employee)
            .then(() => { navigate("/")})
            .catch(error => console.log(error))
      }


  return (
    <>
    <div className='container p-3'>
        <div className='row '>
            <p className='h4 fw'>Update Employee</p>
            <div className="row align-items-center">
                <div className="col-md-4">
                    <form>
                        <div className="my-2">
                            <input type='text' className="form-control" placeholder='Name' />
                        </div>
                        <div className="my-2">
                            <input type='email' className="form-control" placeholder='Email' />
                        </div>
                        <div className="my-2">
                            <input type='text' className="form-control" placeholder='Title' />
                        </div>
                        <div className="my-2">
                            <button className='btn btn-primary mb-2'> Update </button>
                            <Link to="/employees" className='btn btn-danger ms-2 mb-2'> Cancel </Link>
                        </div>
                    </form>
                </div>
                <div className="col-md-6">
                    <img src="https://findicons.com/files/icons/1316/futurama_vol_1/256/bender.png" alt="Bender" className="employee-img" />
                </div>
            </div>
        </div>
    </div>
</>
  )
}

export default UpdateEmployee