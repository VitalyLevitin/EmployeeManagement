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
      <section className="employee-search">
        <div className="container p-3">
          <p className="h3 ">
            Employee List
            <Link to="/employees/add-employee" className="btn btn-primary ms-2">
              <i className="fa fa-plus-circle me-2" />
              Add Employee
            </Link>
          </p>
          <form className="row">
            <div className="col-md-6">
              <div className="row">
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
              </div>
            </div>
          </form>
        </div>
      </section>

      <section className="employee-list">
        <div className="container">
          <div className="row">
            {employees.map((employee) => {
              return (
                <div className="col-md-6" key={employee.id}>
                  <div className="card my-2">
                    <div className="card-body">
                      <div className="row align-items-center d-flex justify-content-around">
                        <div className="col-md-4">
                          <img
                            src="https://findicons.com/files/icons/1316/futurama_vol_1/256/bender.png"
                            alt="Bender"
                            className="employee-img"
                          />
                        </div>
                        <div className="col-md-6">
                          <ul className="list-group">
                            <li className="list-group-item list-group-item-action">
                              Name:{" "}
                              <span className="fw-bold">
                                {" "}
                                {employee.firstName} {employee.lastName}{" "}
                              </span>
                            </li>
                            <li className="list-group-item list-group-item-action">
                              Email:{" "}
                              <span className="fw-bold">
                                {" "}
                                {employee.email}{" "}
                              </span>
                            </li>
                            <li className="list-group-item list-group-item-action">
                              Title: <span className="fw-bold"> Manager </span>
                            </li>
                          </ul>
                        </div>
                        <div className="col-md-1 d-flex flex-column align-items-center">
                          <Link
                            className="btn btn-warning my-1"
                            to={`/view-employee/${employee.id}`}
                          >
                            <i className="fa fa-eye"></i>
                          </Link>
                          <Link
                            className="btn btn-primary my-1"
                            to={`/update-employee/${employee.id}`}
                          >
                            <i className="fa fa-pen"></i>
                          </Link>
                          <Link className="btn btn-danger my-1">
                            <i className="fa fa-trash"></i>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
