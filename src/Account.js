import { useRef, useState, useEffect } from "react";
import TopNavBar from "./TopNavBar"
import { useUser } from "./UserContext";
import { useNavigate } from "react-router-dom";

function Account() {
    const {currentUser, setCurrentUser} = useUser();
    const navigate = useNavigate();

    const UserInfoCard = (props) => {
        // card to display editable info.
        const [saveButtonDisabled, setSaveButtonDisabled] = useState(true);     // sets save button to be disabled or not
        const inputRef = useRef(null);
        const [inputPlaceholder, setInputPlaceholder] = useState('');

        const heading = props.heading.toLowerCase();

        useEffect(() => {
            // the logic will run when the component mounts and everytime the currentUser changes.
            const fetchCurrentInfo = async () => {
                // makes a GET request to the server, which returns the user's email if any.
                try {
                    const response = await fetch(`http://localhost:5000/account/${currentUser.username}`, {
                        method: 'GET',
                    })
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }

                    const data = await response.json();
                    console.log(`email: ${data.email}`)
                    setInputPlaceholder(data.email);
                } catch (error) {
                    console.error('Error fetching account information:', error);
                }
            }
    
            if (currentUser) {
                fetchCurrentInfo();
            }
        }, [currentUser])

        const handleSave = async () => {
            // makes a post request to update user's info
            const updatedInfo = inputRef.current.value;
            console.log(`value inside textinput: ${updatedInfo}`);
            setSaveButtonDisabled(true);

            try {
                const response = await fetch('http://localhost:5000/account-update', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username: currentUser.username, heading: heading, updatedInfo: updatedInfo }),
                });
    
                const data = await response.json();
                if (!response.ok) {
                    const message = data.error;
                    alert(message);
                    return;
                }
                setInputPlaceholder(updatedInfo);
                alert(`successfully updated ${heading} info: ${updatedInfo}`);
            } catch (error) {
                console.error(`Error in updating info: ${error}`)
            }
        }

        const handleFocus = () => {
            // when the textinput gets focused.
            setSaveButtonDisabled(false);
        }

        return <div className="userinfo-card">
            <h3>{props.heading}</h3>
            
            <div style={{display:'flex'}}>
                <input style={{backgroundColor: 'white', color:'black'}} 
                    type={props.type} 
                    name={props.heading}
                    placeholder={inputPlaceholder || 'Enter your email'}
                    ref={inputRef}
                    onFocus={handleFocus}
                    />

                <button id="account-save-button" onClick={handleSave} disabled={saveButtonDisabled} >save</button>
            </div>
        </div>
    }

    const handleLogout = () => {
        console.log('log out button is pressed');
        console.log(`logging ${currentUser.username} out`);
        setCurrentUser(null);
    }

    useEffect(() => {
        if (!currentUser) {
            console.log('successfully logged out user');
            console.log(`current user: ${currentUser}`);
            navigate("/")
        }
    }, [currentUser])

    const NameCard = (props) => {
        // card to display username.
        return <div className="userinfo-card">
            <h3>{props.heading}</h3>
            
            <div>
                <input style={{backgroundColor: 'white'}} 
                    type={props.type} 
                    name={props.heading}
                    aria-label="disabled input"
                    placeholder={props.info} 
                    disabled
                    />
            </div>
        </div>
    }

    return <div className="route-page" id="account-page">
        <TopNavBar />

        <h1 className="main-title-2">ACCOUNT</h1>
        
        <div id="user-info">
            <NameCard heading="Name" info={currentUser?.username} type='text'/>
            <UserInfoCard heading="Email" type='text'/>
        </div>

        <button id='logout-button' className="pico-background-violet-650" onClick={handleLogout}>Log Out</button>
    </div>
}

export default Account