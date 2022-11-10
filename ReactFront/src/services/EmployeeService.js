import axios from "axios";

const EMPLOYEES_REST_API_URL = 'https://localhost:8080/api/employess';

class EmployeeService {

    getAllEmployess() {
        return axios.get(EMPLOYEES_REST_API_URL);
    }

    createEmployee(employee) {
        return axios.post(EMPLOYEES_REST_API_URL, employee)
    }

    getEmployeeById(employeeId) {
        return axios.get(EMPLOYEES_REST_API_URL + '/' + employeeId)
    }

    deleteEmployee(employeeId) {
        return axios.delete(EMPLOYEES_REST_API_URL + '/' + employeeId)
    }

}

export default new EmployeeService();