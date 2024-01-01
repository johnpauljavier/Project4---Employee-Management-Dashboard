import { Outlet, Link, useNavigate} from "react-router-dom";
import { useState, useEffect } from "react";
import firebaseApp from "./firebaseConfig";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";


function Layout(){

    const [authenticated, setAuthenticated] = useState(false);

    let navigate = useNavigate();

    useEffect(() => {  

        const auth = getAuth(firebaseApp);
        
        onAuthStateChanged(auth, (user) => {
        if (user) {
                console.log(user.email);
            setAuthenticated(true);
            const uid = user.uid;
            
        }else{
            // alert('no user found');
        }
        }); 

    }, [])

    const logout = () => {
        const auth = getAuth(firebaseApp);
        signOut(auth).then(() => {
          setAuthenticated(false);
          alert('You have logged out.');
          navigate("/login");
        }).catch((error) => {
          // An error happened.
        });
    }

    return(
        <main className="d-flex flex-column min-vh-100">
                <nav className="navbar navbar-expand-md bg-dark fixed-top shadow">
                    <div className="container-fluid p-1 ps-4 pe-4">
                        <Link className="navbar-brand fw-bold text-white" to="/">OnePlus</Link>
                        
                        <button className="navbar-toggler bg-light" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">

                            <ul className="navbar-nav ms-auto">
                            {
                                    authenticated
                                    
                                    ?

                                    (
                                    <li className="nav-item">
                                        <Link className="nav-link fw-bold text-white" onClick={() => {logout()}}>Logout</Link>
                                    </li> 
                                    )

                                    :

                                    (
                                        <>
                                        <li className="nav-item">
                                            <Link className="nav-link fw-bold text-white" to="login">Login</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link fw-bold text-white" to="register">Register</Link>
                                        </li>                                         
                                        </>
                                    )
                                }
                            </ul>
                        </div>
                    </div>
                </nav>  
        <div className="container p-5">
             <Outlet auth={authenticated}></Outlet>
        </div>

            <footer className="bg-dark p-3 text-white text-center mt-auto">
                <p>Copyright 2023 © John Paul S. Javier. All rights reserved.</p>
            </footer>

        </main>

        // <>
        // <nav>
        //     <ul>
        //         <li>
        //             <Link to="home">Home</Link>
        //         </li>
        //         <li>
        //             <Link to="about">About</Link>
        //         </li>
        //     </ul>
        // </nav>
        // <Outlet />
        
        // </>

    )
}

export default Layout;