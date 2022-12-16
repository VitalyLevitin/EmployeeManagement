import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import EmployeeService from "../services/EmployeeService";

const AddEmployee = () => {
  const [employee, setEmployee] = useState({
      firstName: '',
      lastName: '',
      email: '',
      title: '',
  })

  const [titles, setTitles] = useState([])
  const navigate = useNavigate();

  useEffect(() => {
    EmployeeService.getAllTitles()
      .then(response => {
        console.log(response.data)
        setTitles(response.data)
        });
  }, [])
  

  const saveEmployee = (e) => {
    e.preventDefault();
    EmployeeService.createEmployee(employee, employee.title)
      .then(() => {
        navigate("/employees");
      })
      .catch((e) =>{
           console.log(e)
            navigate("/employees/add-employee")});
  };

  const updateInput = (e => {
      setEmployee({...employee, [e.target.name]: e.target.value})
  })

  return (
    <>
    <pre>{JSON.stringify(employee)}</pre>
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
                    name='email'
                    value={employee.email}
                    onChange={updateInput}
                  />
                </div>
                <div className="my-2">
                  <select
                    required={true}
                    className="form-control"
                    name='title'
                    value={employee.title}
                    onChange={updateInput}>
                      <option value="">Select a title</option>
                      {
                        titles.map(title => {
                          return(
                            <option key={title.id} value={title.id}> {title.titleName} </option>
                          )
                        })
                      }
                    </select>
                  
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
