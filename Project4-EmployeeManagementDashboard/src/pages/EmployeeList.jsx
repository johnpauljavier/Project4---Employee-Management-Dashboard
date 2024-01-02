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

    const [editToggle, setEditToggle] = useState(false);

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


    const updateEmployee = (employeeID, firstname, lastname, email, phoneNumber, address, department) => {
        setEditToggle(true);
        setEmployee({
          employeeID: employeeID,
          firstname: firstname,
          lastname: lastname,
          email: email,
          phoneNumber: phoneNumber,
          address: address,
          department: department,
          // Add other fields as needed
        });
      };
      
  
    const handleEmployeeUpdate = () => {
      const employeeRef = doc(db, "employees", employee.employeeID);
  
      updateDoc(employeeRef, {
        firstname: employee.firstname,
        lastname: employee.lastname,
        email: employee.email,
        phoneNumber: employee.phoneNumber,
        address: employee.address,
        department: employee.department,
        // Add other fields as needed
      }).then(() => {
        setEditToggle(false);
        setEmployee({
          // Clear all fields after update
          firstname: '',
          lastname: '',
          email: '',
          phoneNumber: '',
          address: '',
          department: '',
        });
      }).catch((error) => {
        // Handle error if update fails
        console.error("Error updating document: ", error);
      });
    };
      


    const deleteEmployee = (id, firstname, lastname) => {
        
        // initialize config
        const db = getFirestore(firebaseApp);    
         
        const [tempEmp] = employeeList.filter(li => li.id === id);

        // confirm(`Are you sure you want to delete ${tempEmp.firstname} ${tempEmp.lastname} ${tempEmp.employee_id}?`).then(
        //     deleteDoc(doc(db, "employees", tempEmp.employee_id))
            
        // );


        Swal.fire({
            icon: "question",
            title: `Are you sure you want to delete ${tempEmp.firstname} ${tempEmp.lastname} ${tempEmp.employee_id}?`,
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


    const handleViewMore = (id, firstname, lastname, jobTitle, department, email, phone) => {
        const selectedEmployee = employeeList.find(selectedEmployee => employee.id === id);
      
        if (selectedEmployee) {
          // Display more details or perform actions with the selected employee's information
          console.log(selectedEmployee); // For testing purposes
        //   setEmployeeList(selectedEmployee);
      
          // Update state or perform actions to display more details of the selected employee
          // For example:
          // setSelectedEmployee(selectedEmployee);
          // Open a modal to display the employee's details
        } else {
          console.error("Employee not found");
        }
      };


if(authenticated){
    return(
        <section className="pt-5 mt-3">
            <h1 className="fw-bold">Welcome, { userProperties.displayName }  </h1>
            {/* {userProperties.displayName} */}
            <p>This is a list of <span className="text-danger fw-bold">OnePlus</span> employee records.</p>
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
                            <button type="button" onClick={()=>handleViewMore(employee.id, employee.firstname, employee.lastname)} 
                            className="btn btn-dark"
                            data-bs-toggle="modal"
                            data-bs-target={`#employeeDetails-${employee.id}`}
                            >✏️</button>
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

                                       {/* Modal */}
            <div
              className="modal fade"
              id={`employeeDetails-${employee.id}`}
              tabIndex="-1"
              aria-labelledby={`employeeDetailsLabel-${employee.id}`}
              aria-hidden="true"
            >
              <div className="modal-dialog modal-dialog-scrollable  modal-dialog-centered modal-xl">
                <div className="modal-content">
                  <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">
                      Employee Details
                    </h1>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    <div className="mb-5 p-5 border mt-5 shadow-md">
                      <div className="card-body">
                        <div className="table-responsive">
                          <table className="table">
                            <tbody className="row m-2 border p-2 shadow">
                              <tr className="row">
                                <th className="col-md-6 col-sm-12" scope="row">First Name</th>
                                <td className="col-md-6 col-sm-12">{employeeList.firstname}</td>
                              </tr>
                              <tr className="row">
                                <th className="col-md-6 col-sm-12" scope="row">Last Name</th>
                                <td className="col-md-6 col-sm-12">{employeeList.lastname}</td>
                              </tr>
                              <tr className="row">
                                <th className="col-md-6 col-sm-12" scope="row">Job Title</th>
                                <td className="col-md-6 col-sm-12">{employeeList.jobTitle}</td>
                              </tr>
                              <tr className="row">
                                <th className="col-md-6 col-sm-12" scope="row">Department</th>
                                <td className="col-md-6 col-sm-12">{employeeList.department}</td>
                              </tr>
                              <tr className="row">
                                <th className="col-md-6 col-sm-12" scope="row">Email</th>
                                <td className="col-md-6 col-sm-12">{employeeList.email}</td>
                              </tr>
                              <tr className="row">
                                <th className="col-md-6 col-sm-12" scope="row">Contact Number</th>
                                <td className="col-md-6 col-sm-12">{employeeList.phone}</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                  </div>
                  </div>
                  </div>



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
