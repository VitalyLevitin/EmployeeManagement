import EmployeeService from "../services/EmployeeService"

//, setEmployees, employees
const DeleteEmployee = (employeeId, setEmployees, employees) => {
    console.log(employeeId)
    EmployeeService.deleteEmployee(employeeId)
        .then(() => {EmployeeService.getAllEmployess().then(response => {
            setEmployees(response.data)
            console.log(response.data)})})
        .catch(e => console.log(e))
}


export default DeleteEmployee