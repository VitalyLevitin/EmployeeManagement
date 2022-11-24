import {useState, useEffect} from 'react'
import {Link, useParams} from "react-router-dom"
import EmployeeService from '../services/EmployeeService'

const ViewEmployee = () => {

    const [employee, setEmployee] = useState([]);
    const {employeeId} = useParams();


    useEffect(() => {
        EmployeeService.getEmployeeById(employeeId)
          .then(response => {
              setEmployee(response.data)
          }).catch(e => console.log(e))
      
      }, [employeeId])

    return (
        <>
            <div className="container p-3">
                <div className="row">
                    <div className="col">
                        <p className="h3">View Employee</p>
                    </div>
                </div>
            </div>

            <div className="container mt-3">
                <div className="row align-items-center">
                    <div className="col-md-4 ">
                        <img src="https://findicons.com/files/icons/1316/futurama_vol_1/256/bender.png" alt="Bender" className="employee-img" />
                    </div>
                    <div className="col-md-8">
                        <ul className="list-group">
                            <li className="list-group-item list-group-item-action">
                                Name: <span className="fw-bold"> {employee.firstName} {employee.lastName} </span>
                            </li>
                            <li className="list-group-item list-group-item-action">
                                Email: <span className="fw-bold"> {employee.email} </span>
                            </li>
                            <li className="list-group-item list-group-item-action">
                                Title: <span className="fw-bold"> Manager </span>
                            </li>
                            <li className="list-group-item list-group-item-action">
                                Date Created: <span className="fw-bold"> 21/11/2022 </span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="row mt-5">
                    <div className="col text-center">
                        <Link to="/employees" className='btn btn-warning'> Return </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ViewEmployee