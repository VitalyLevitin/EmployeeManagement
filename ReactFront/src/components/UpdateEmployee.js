import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import EmployeeService from "../services/EmployeeService";

const UpdateEmployee = () => {
  const [employee, setEmployee] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { employeeId } = useParams();

  useEffect(() => {
    EmployeeService.getEmployeeById(employeeId)
      .then((response) => {
        setEmployee(response.data);
      })
      .catch((e) => console.log(e));
  }, [employeeId]);

  const update = (e) => {
    e.preventDefault();
    EmployeeService.updateEmployee(employeeId, employee)
      .then(() => {
        setError(null)
        navigate("/employees");
      })
      .catch((e) =>{
          console.log(e.response)
          setError("* Email already taken")
          });

  };

  const updateInput = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="container p-3">
        <div className="row ">
          <p className="h4 fw">Update Employee</p>
          <div className="row align-items-center">
            <div className="col-md-4">
              <form  onSubmit={update}>
                <div className="my-2">
                  <input
                    required={true}
                    type="text"
                    className="form-control"
                    placeholder="First Name"
                    name="firstName"
                    value={employee.firstName}
                    onChange={updateInput}
                  />
                </div>
                <div className="my-2">
                  <input
                    required={true}
                    type="text"
                    className="form-control"
                    placeholder="Last Name"
                    name="lastName"
                    value={employee.lastName}
                    onChange={updateInput}
                  />
                </div>
                <div className="my-2">
                  <input
                    required={true}
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    name="email"
                    value={employee.email}
                    onChange={updateInput}
                    style={error ? {border: '1px solid red'}: {border: 'black'}}
                  />
                  {error != null && error.length > 0 &&
                    <h6 style={{color: 'red'}}> {error} </h6> }
                </div>
                <div className="my-4">
                  <button className="btn btn-warning mb-2"> Update </button>
                  <Link to="/employees" className="btn btn-danger ms-2 mb-2">
                    {" "}
                    Cancel{" "}
                  </Link>
                </div>
              </form>
            </div>
            <div className="col-md-6">
              <img
                src={employee.imageURL}
                alt="Futurama"
                className="employee-img"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateEmployee;
