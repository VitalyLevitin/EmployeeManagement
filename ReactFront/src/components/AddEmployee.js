import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import EmployeeService from '../services/EmployeeService'

const AddEmployee = () => {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const navigate = useNavigate()
    const { id } = useParams();

    const saveEmployee = (e) => {
        e.preventDefault();
        const employee = { firstName, lastName, email }
        EmployeeService.createEmployee(employee)
            .then(() => {
                navigate('/employees')
            })
            .catch(e => console.log(e))
    }

    useEffect(() => {
        EmployeeService.getEmployeeById(id)
            .then(response => {
                setFirstName(response.data.firstName)
                setLastName(response.data.lastName)
                setEmail(response.data.email)
            }).catch(e => console.log(e))

    }, [])


    return (
        <>
            <div className='container p-3'>
                <div className='row'>
                    <p className='h4'>Add Employee</p>
                    <div className="row">
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
                                    <button className='btn btn-success mb-2'> Create </button>
                                    <Link to="/employees" className='btn btn-danger ms-2 mb-2'> Cancel </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddEmployee