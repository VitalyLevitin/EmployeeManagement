import EmployeeService from "../services/EmployeeService";

const DeleteEmployee = (employeeId, setEmployees) => {
  EmployeeService.deleteEmployee(employeeId)
    .then(() => {
      EmployeeService.getAllEmployess().then((response) => {
        setEmployees(response.data);
      });
    })
    .catch((e) => console.log(e));
};

export default DeleteEmployee;
