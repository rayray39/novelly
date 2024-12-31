import { useRef, useState } from "react";
import TopNavBar from "./TopNavBar"
import { useUser } from "./UserContext";

function Account() {
    const {currentUser} = useUser();
    const [birthDate, setBirthDate] = useState('');
    const [email, setEmail] = useState('');

    const UserInfoCard = (props) => {
        const [saveButtonDisabled, setSaveButtonDisabled] = useState(true);
        const inputRef = useRef(null);

        const getTextInputContent = () => {
            console.log(`value inside textinput: ${inputRef.current.value}`);
        }

        const SaveButton = (props) => {
            console.log(`value of saveButtonDisabled: ${saveButtonDisabled}`);
            return <>
                {saveButtonDisabled ?
                    <button id="account-save-button" disabled onClick={props.clickHandler}>save</button> :
                    <button id="account-save-button" >save</button>
                }
            </>
        }

        const handleFocus = () => {
            console.log('text input has been clicked');
            setSaveButtonDisabled(false);
        }

        const handleBlur = () => {
            setSaveButtonDisabled(true);
        }

        // card to display editable info.
        return <div className="userinfo-card">
            <h3>{props.heading}</h3>
            
            <div style={{display:'flex'}}>
                <input style={{backgroundColor: 'white', color:'black'}} 
                    type={props.type} 
                    name={props.heading}
                    placeholder={props.info}
                    ref={inputRef}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    />

                <SaveButton clickHandler={getTextInputContent}/>
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