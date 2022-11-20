import { useState, useEffect } from "react";
import EmployeeService from "../services/EmployeeService";
import { Link } from "react-router-dom";
import DeleteEmployee from "./DeleteEmployee";

export default function EmployeeList() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    getEmployess();
  }, []);

  const getEmployess = () => {
    EmployeeService.getAllEmployess()
      .then((response) => {
        setEmployees(response.data);
        console.log(response.data);
      })
      .catch((e) => console.log(e));
  };

  return (
    <>
      <div className="container p-3">
        <p className="h3">
          Employee List
          <Link to="/add-employee" className="btn btn-primary ms-2">
            <i className="fa fa-plus-circle me-2" />
            Add Employee
          </Link>
        </p>
        <form className="row">
          <div className="col">
            <div className="mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Employee Name"
              />
            </div>
          </div>
          <div className="col">
            <div>
              <input
                type="submit"
                className="btn btn-outline-dark"
                value="Search Names"
              />
            </div>
          </div>
        </form>
      </div>
      <table className="table table-bordered table-striped">
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
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td> {employee.id} </td>
              <td> {employee.firstName} </td>
              <td> {employee.lastName} </td>
              <td> {employee.email} </td>
              <td>
                <Link
                  className="btn btn-info me-2"
                  to={`/update-employee/${employee.id}`}
                >
                  {" "}
                  Update{" "}
                </Link>
                <button
                  className="btn btn-danger"
                  onClick={() =>
                    DeleteEmployee(employee.id, setEmployees, employees)
                  }
                >
                  {" "}
                  Remove{" "}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
