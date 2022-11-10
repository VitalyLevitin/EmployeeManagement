import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import EmployeeList from './components/EmployeeList';
import Footer from './components/Footer';
import Header from './components/Header';
import AddEmployee from './components/AddEmployee';

function App() {
  return (
    <Router>
      <div >
        <Header />
        <Routes>
          <Route exact path = "/" element = {<EmployeeList />}> </Route>
          <Route path = "/employees" element = {<EmployeeList />}> </Route>
          <Route path = "/add-employee" element = {<AddEmployee />}> </Route>
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
