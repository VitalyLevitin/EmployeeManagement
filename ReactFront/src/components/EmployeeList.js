import {useState, useEffect} from 'react'
import EmployeeService from '../services/EmployeeService'
import {Link} from 'react-router-dom'
import DeleteEmployee from './DeleteEmployee'

export default function EmployeeList() {
    
    const [employees, setEmployees] = useState([])

    useEffect(() => {
        getEmployess()
    }, [])
    
    const getEmployess = () => {
        EmployeeService.getAllEmployess()
            .then(response => {
                setEmployees(response.data)
                console.log(response.data)
            }).catch(e => console.log(e));
    };

    return (
       <div className='container'>
            <h1 className='text-center'> Employees </h1>
            <Link to = "/add-employee" className = "btn btn-primary mb-2"> Add Employee </Link>
            <table className='table table-bordered table-striped'>
                <thead>
                    <tr>
                        <th> Employee ID </th>
                        <th> Employee First Name </th>
                        <th> Employee Last Name </th>
                        <th> Employee Email </th>
                        <th> Actions </th>
                    </tr>
                </thead>

                <tbody>
                    {
                        employees.map(
                            employee =>
                                <tr key = {employee.id} >
                                    <td> {employee.id} </td>
                                    <td> {employee.firstName} </td>
                                    <td> {employee.lastName} </td>
                                    <td> {employee.email} </td>
                                    <td>
                                        <Link className = 'btn btn-info me-2' to = {`/edit-employee/${employee.id}`}> Update </Link>
                                        <button className = 'btn btn-danger' onClick =
                                         {() => DeleteEmployee(employee.id, setEmployees, employees)}> Remove </button>
                                    </td>
                                </tr>
                        )
                    }
                </tbody>
            </table>
       </div>
  )
}
