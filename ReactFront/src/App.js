import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import EmployeeList from './components/EmployeeList';
import Footer from './components/Footer';
import Header from './components/Header';
import AddEmployee from './components/AddEmployee';
import UpdateEmployee from './components/UpdateEmployee';
import ViewEmployee from './components/ViewEmployee';

function App() {
  return (
    <Router>
      <div className="main-wrapper">
        <Header />
        <Routes>
          <Route exact path = "/" element = {<EmployeeList />}> </Route>
          <Route path = "/employees" element = {<EmployeeList />}> </Route>
          <Route path = "/employees/add-employee" element = {<AddEmployee />}> </Route>
          <Route path = "/update-employee/:employeeId" element = {<UpdateEmployee />}> </Route>
          <Route path = "/view-employee/:employeeId" element = {<ViewEmployee />}> </Route>
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
