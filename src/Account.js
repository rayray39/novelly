import { useRef, useState } from "react";
import TopNavBar from "./TopNavBar"
import { useUser } from "./UserContext";

function Account() {
    const {currentUser} = useUser();
    const [birthDate, setBirthDate] = useState('');
    const [email, setEmail] = useState('');

    const UserInfoCard = (props) => {
        // card to display editable info.
        const [saveButtonDisabled, setSaveButtonDisabled] = useState(true);     // sets save button to be disabled or not
        const inputRef = useRef(null);

        const heading = props.heading;

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
                    placeholder={props.info}
                    ref={inputRef}
                    onFocus={handleFocus}
                    />

                <button id="account-save-button" onClick={handleSave} disabled={saveButtonDisabled} >save</button>
            </div>
        </div>
    }


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
            <NameCard heading="Name" info={currentUser.username} type='text'/>
            <UserInfoCard heading="Date Of Birth" info={birthDate} type='date'/>
            <UserInfoCard heading="Email" info={email} type='text'/>
        </div>
    </div>
}

export default Account