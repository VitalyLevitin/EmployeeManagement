import EmployeeService from "../services/EmployeeService"
import EmployeeList from "./EmployeeList"


const DeleteEmployee = employeeId => {
    EmployeeService.deleteEmployee(employeeId)
        .then((response) => EmployeeList.getEmployess())
        .catch(e => console.log(e))
}


export default DeleteEmployee