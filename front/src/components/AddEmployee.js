import {useState} from 'react'

const AddEmployee = () => {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')

    const saveEmployee = (e) => {
        e.preventDefault();
        const employee = {firstName, lastName, email}
    }

    return (
        <div>
            <br></br>
            <div className = 'container'>
                <div className = 'row'>
                    <div className = 'card col-md-6 offset-md-3'>
                        <h2 className = 'text-center'>Add Employee</h2>
                        <div claasName = 'card-body'>
                            <form>
                                <div className = 'form-group mb-2'>
                                    <label className = 'form-label'> First Name: </label>
                                    <input
                                        type = 'text'
                                        placeholder = 'Enter first name'
                                        name = 'firstName'
                                        className = 'form-control'
                                        value = {firstName}
                                        onChange = {e => setFirstName(e.target.value)}
                                        >
                                    </input>
                                </div>

                                <div className = 'form-group mb-2'>
                                    <label className = 'form-label'> Last Name: </label>
                                    <input
                                        type = 'text'
                                        placeholder = 'Enter last name'
                                        name = 'lastName'
                                        className = 'form-control'
                                        value = {lastName}
                                        onChange = {e => setLastName(e.target.value)}
                                        >
                                    </input>
                                </div>

                                <div className = 'form-group mb-2'>
                                    <label className = 'form-label'> Email: </label>
                                    <input
                                        type = 'email'
                                        placeholder = 'Enter email address'
                                        name = 'email'
                                        className = 'form-control'
                                        value = {email}
                                        onChange = {e => setEmail(e.target.value)}
                                        >
                                    </input>
                                </div>
                                <button className='btn btn-success mb-2' onClick={e => saveEmployee(e)}>Save</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddEmployee