import { useState } from "react";
import { getFirestore, collection, onSnapshot, addDoc, deleteDoc, updateDoc, doc } from "firebase/firestore";
import firebaseApp from "./firebaseConfig";


function AddEmployee(){

    const [employee, setEmployee] = useState({
        firstname: '',
        lastname: '',
        jobTitle: '',
        department: '', 
        email: '',
        phone: '',
    });
    const [employeeList, setEmployeeList] = useState([]);

    const addNewEmployee = () => {


        // Initialize Cloud Firestore and get a reference to the service.
        const db = getFirestore(firebaseApp);    
        

        if(employee.firstname === '' || employee.lastname === '' || employee.jobTitle === ''|| employee.department === '' || employee.email === '' || employee.phone === ''){
            alert("Missing fields!");
        }else{
            setEmployeeList(
                employeeList => [
                    ...employeeList, employee
                ]
            );
            addDoc(collection(db, 'employees'), employee);

            console.log(employee);
            alert(`Successful added ${employee.firstname} ${employee.lastname}`);

            setEmployee({
                firstname: '',
                lastname: '',
                jobTitle: '',
                department: '',
                email: '',
                phone: '',
            }); 

        }
        
    }

    return(
        <section className="pt-5 mt-3">
        <h1 className="fw-bold">📝Add employee records here.</h1>
        <hr />
        <div className="mb-5 p-5 border">
            <div className="row">
                <div className="col-md-5">
                     <label htmlFor="firstname">First name:</label>
                     <input id="firstname" 
                        onChange={(e)=>setEmployee({
                            ...employee,
                            firstname: e.target.value,
                            
                        })} 
                        value={employee.firstname}
                        className="form-control" 
                        type="text" 
                        placeholder="Juan" 
                        required
                     />
                </div>
                <div className="col-md-5">
                     <label htmlFor="lastname">Last name:</label>
                     <input id="lastname" 
                        onChange={(e)=>setEmployee({
                            ...employee,
                            lastname: e.target.value
                        })} 
                        value={employee.lastname}
                        className="form-control" 
                        type="text" 
                        placeholder="Dela Cruz"
                     />
                </div>
                <div className="col-md-5 mt-2">
                     <label htmlFor="jobTitle">Job Title:</label>
                     <input id="jobTitle" 
                        onChange={(e)=>setEmployee({
                            ...employee,
                            jobTitle: e.target.value
                        })} 
                        value={employee.jobTitle || ''}
                        className="form-control" 
                        type="text"         
                     />
                </div>
                <div className="col-md-5 mt-2">
                     <label htmlFor="department">Department:</label>
                     <input id="department" 
                        onChange={(e)=>setEmployee({
                            ...employee,
                            department: e.target.value
                        })} 
                        value={employee.department}
                        className="form-control" 
                        type="text"         
                     />
                </div>
                <div className="col-md-5 mt-2">
                     <label htmlFor="email">Email:</label>
                     <input id="email" 
                        onChange={(e)=>setEmployee({
                            ...employee,
                            email: e.target.value
                        })} 
                        value={employee.email}
                        className="form-control" 
                        type="text"         
                     />
                </div>
                <div className="col-md-5 mt-2 mb-3">
                     <label htmlFor="phone">Phone:</label>
                     <input id="phone" 
                        onChange={(e)=>setEmployee({
                            ...employee,
                            phone: e.target.value
                        })} 
                        value={employee.phone}
                        className="form-control" 
                        type="number" 
                        min={11}        
                     />
                </div>
                
                <div className="col-md-12">
                    <button onClick={() => {addNewEmployee()}} className="btn btn-dark mt-3 form-control">Add ➕</button>
                </div>

            </div>
          </div>
          </section>
    )

}

export default AddEmployee;