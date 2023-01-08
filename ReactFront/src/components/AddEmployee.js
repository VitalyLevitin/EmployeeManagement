import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import EmployeeService from "../services/EmployeeService";

const AddEmployee = () => {
  const [employee, setEmployee] = useState({
      firstName: '',
      lastName: '',
      email: ''
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const saveEmployee = (e) => {
    e.preventDefault();
    EmployeeService.createEmployee(employee)
      .then(() => {
        navigate("/employees");
      })
      .catch((e) =>{
        console.log(e.response)
        setError("* Email already taken")
        });
  };

  const updateInput = (e => {
      setEmployee({...employee, [e.target.name]: e.target.value})
  })

  return (
    <>
      <div className="container p-3">
        <div className="row">
          <p className="h4">Add Employee</p>
          <div className="row">
            <div className="col-md-4">
              <form onSubmit={saveEmployee}>
                <div className="my-2">
                  <input
                    required={true}
                    type="text"
                    className="form-control"
                    placeholder="First Name"
                    name='firstName'
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
                    name='lastName'
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
                <div className="my-2">
                  <button className="btn btn-success mb-2"> Create </button>
                  <Link to="/employees" className="btn btn-danger ms-2 mb-2">
                    {" "}
                    Cancel{" "}
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddEmployee;
