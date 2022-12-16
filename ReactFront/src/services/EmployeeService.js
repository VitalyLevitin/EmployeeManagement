import axios from "axios";

const base_url = 'http://localhost:8080/api/v1';

class EmployeeService {

    getAllEmployess() {
        return axios.get(`${base_url}/employees`);
    }

    getAllTitles() {
        return axios.get(`${base_url}/employees/titles`)
    }

    createEmployee(employee, titleId) {
        return axios.post(`${base_url}/employees/add-employee`, employee, titleId)
    }

    getEmployeeById(employeeId) {
        return axios.get(`${base_url}/employees/${employeeId}`)
    }

    getTitleByEmployee(employee) {
        const titleId = employee.titleId;
        return axios.get(`${base_url}/employees/titles/${titleId}`)
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