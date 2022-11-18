import EmployeeService from "../services/EmployeeService"

//, setEmployees, employees
const DeleteEmployee = (employeeId, setEmployees, employees) => {
    console.log(employeeId)
    EmployeeService.deleteEmployee(employeeId)
        .then((response) => { setEmployees(employees.filter(employee => employee.employeeId !== employeeId))})
        .catch(e => console.log(e))
}


export default DeleteEmployee