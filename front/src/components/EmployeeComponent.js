import {useState, useEffect} from 'react'
import EmployeeService from '../services/EmployeeService'

export default function EmployeeComponent() {
    
    const [employees, setEmployees] = useState([])

    useEffect(() => {
        getEmployess()
    }, [])
    
    const getEmployess = () => {
        EmployeeService.getEmployess()
            .then(response => {
                setEmployees(response.data)
                console.log(response.data)
            })
    };

    return (
       <div className='container'>
            <h1 className='text-center'> Employees</h1>

            <table className='table table-striped'>
                <thead>
                    <tr>
                        <th>Employee ID</th>
                        <th>Employee First Name</th>
                        <th>Employee Last Name</th>
                        <th>Employee Email</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        employees.map(
                            employee =>
                                <tr key ={employee.id}>
                                    <td>{employee.id}</td>
                                    <td>{employee.firstName}</td>
                                    <td>{employee.lastName}</td>
                                    <td>{employee.email}</td>
                                </tr>
                        )
                    }
                </tbody>
            </table>
       </div>
  )
}
