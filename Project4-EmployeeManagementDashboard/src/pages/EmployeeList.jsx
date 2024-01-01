import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { getFirestore, collection, onSnapshot, addDoc, deleteDoc, updateDoc, doc } from "firebase/firestore";
import firebaseApp from "./firebaseConfig.jsx";
import { getAuth, onAuthStateChanged } from "firebase/auth";

// import sweetalert2 to this component
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/dist/sweetalert2.css";
import "sweetalert2/dist/sweetalert2.js";


function EmployeeList(){

    const [employee, setEmployee] = useState({});
    const [employeeList, setEmployeeList] = useState([]);

    const [authenticated, setAuthenticated] = useState(false);
    const [userProperties, setUserProperties] = useState({});

    let navigate = useNavigate();


    useEffect(() => {  


        // Initialize Cloud Firestore and get a reference to the service.
        const db = getFirestore(firebaseApp);    

        // Reading data inside of Database, display to UI of Homepage
        try{
            
            onSnapshot(collection(db, 'employees'), snapshot => {

                const newEmployeeList = [];

                snapshot.forEach(employee => {
                    const tempEmployee = employee.data()
                    tempEmployee["employee_id"] = employee.id;
                    newEmployeeList.push(tempEmployee); 
                });

                setEmployeeList(newEmployeeList);
                
            
            });
        }catch(e){
            alert('Could not fetch employee data!');
        }
        

        const auth = getAuth(firebaseApp);
        
        onAuthStateChanged(auth, (user) => {
        if (user) {
            setAuthenticated(true);
            setUserProperties(user);         
            const uid = user.uid;
            
        }else{
            // alert('no user found');
        }
        }); 


    }, [])


    const handleEmployeeDetails = (e) => {
        navigate("/employeecard");
    }

    const navigateAddEmployee = () => {
        navigate('/AddEmployee');
    }

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

            setStudent({
                firstname: '',
                lastname: '',
                jobTitle: '',
                department: '',
                email: '',
                phone: '',
            }); 

        }
        
    }

    const deleteEmployee = (id) => {

        const [tempEmp] = employeeList.filter(tempEmp => employee.id === id);

        // const employeeID = String(id);
        // initialize config
        const db = getFirestore(firebaseApp);    
         
        
        // confirm(`Are you sure you want to delete ${tempEmp.firstname} ${tempEmp.lastname} ${tempEmp.employee_id}?`).then(
        //     deleteDoc(doc(db, "employees", tempEmp.employee_id))
            
        // );




        Swal.fire({
            icon: "question",
            title: `Are you sure you want to delete ${tempEmp.firstname} ${tempEmp.lastname}?`,
            showDenyButton: true,
            confirmButtonText: "Delete",
            denyButtonText: "Cancel",
        }).then((result) => {
            if (result.isConfirmed) {
                deleteDoc(doc(db, "employees", tempEmp.employee_id));
                Swal.fire({
                    
                    icon: "success",
                    title: "Success!",
                    text: `${tempEmp.firstname} ${tempEmp.lastname} has been deleted.`,
                });
            } else if (result.isDenied) {
                Swal.fire({
                   
                    icon: "success",
                    title: "Cancelled",
                    text: "Deleting records has been cancelled.",
                });
            }
        });
        
    }


if(authenticated){
    return(
        <section className="pt-5 mt-3">
            <h1 className="fw-bold">Welcome, { userProperties.displayName }  </h1>
            {/* {userProperties.displayName} */}
            <p>This is a list of employee records.</p>
            <hr />



            <div className="bg-dark rounded mt-3 mb-2">
                <h3 className="fw-bold">{employee.firstname} {employee.lastname} </h3>
                <button className="btn btn-dark" onClick={navigateAddEmployee}>➕ Add Employee</button>
            </div>


            <table className="table border shadow">
                    <thead> 
                        <tr>
                            <th scope="col">First Name</th>
                            <th scope="col">Last Name</th>
                            <th scope="col">Job Title</th>
                            <th scope="col">Department</th>
                            <th scope="col">Email</th>
                            <th scope="col">Phone</th>
                        </tr>
                    </thead>
            <tbody className="border p-2 shadow">
            {
    
            employeeList.length > 0

            ?

            (
                employeeList.map((employeeRecord) => (
                    // MAP through employee table to get the DATA

                    <tr>
                        <td>{employeeRecord.firstname}</td>
                        <td>{employeeRecord.lastname}</td>
                        <td>{employeeRecord.jobTitle}</td>
                        <td>{employeeRecord.department}</td>
                        <td>{employeeRecord.email}</td> 
                        <td>{employeeRecord.phone}</td>
                        <td>{employeeRecord.status}</td>
                        <td>
                            <button onClick={()=>handleEmployeeDetails()} className="btn btn-dark">✏️</button>
                            <button className="btn btn-secondary ms-1" onClick={() => deleteEmployee(employee.id)}>🗑️</button>
                        </td>
                     
                    </tr>
            
                    
                ))
                
            )

            :

            (
                <p>No data is available</p>
            )
            
            }
            
         </tbody>
        </table>

        



        


        </section>
    )
    }else{
        return(
            <section className="pt-5 mt-3">
                <h1>Welcome Guest!</h1>
            </section>
        )
    }

    


}

export default EmployeeList;
