import EmployeeService from "../services/EmployeeService";

const findEmployeeByName = (name, setEmployees) => {
    EmployeeService.getEmployeeByFirstName(name)
      .then((response) =>{
        setEmployees(response.data);
        console.log(response.data)
      })
      .catch((e) => console.log(e));
  }

export default findEmployeeByName
