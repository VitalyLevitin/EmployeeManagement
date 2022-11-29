import axios from "axios";

const base_url = 'http://localhost:8080/api/v1';

class EmployeeService {

    getAllEmployess() {
        return axios.get(`${base_url}/employees`);
    }

    createEmployee(employee) {
        return axios.post(`${base_url}/employees/add-employee`, employee)
    }

    getEmployeeById(employeeId) {
        return axios.get(`${base_url}/employees/${employeeId}`)
    }
    
    getEmployeeByFirstName(firstName) {
        return axios.get(`${base_url}/employees/search-employee/${firstName}`)
    }

    deleteEmployee(employeeId) {
        return axios.delete(`${base_url}/employees/${employeeId}`)
    }

    updateEmployee(employeeId, employee) {
        return axios.put(`${base_url}/employees/${employeeId}`, employee)
    }

}

export default new EmployeeService();