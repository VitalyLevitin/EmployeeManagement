import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import EmployeeList from './components/EmployeeList';
import Footer from './components/Footer';
import Header from './components/Header';
import AddEmployee from './components/AddEmployee';
import UpdateEmployee from './components/UpdateEmployee';

function App() {
  return (
    <Router>
      <>
        <Header />
        <Routes>
          <Route exact path = "/" element = {<EmployeeList />}> </Route>
          <Route path = "/employees" element = {<EmployeeList />}> </Route>
          <Route path = "/add-employee" element = {<AddEmployee />}> </Route>
          <Route path = "/update-employee/:id" element = {<UpdateEmployee />}> </Route>
          {/* <Route path = "/view-employee/:id" element = {<ViewEmployee />}> </Route> */}
        </Routes>
        <Footer />
      </>
    </Router>
  );
}

export default App;
