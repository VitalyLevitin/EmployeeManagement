import axios from "axios";

const EMPLOYEES_REST_API_URL = 'https://localhost:8080/api/employess';

class EmployeeService {

    getEmployess() {
        return axios.get(EMPLOYEES_REST_API_URL);
    }

}

export default new EmployeeService();