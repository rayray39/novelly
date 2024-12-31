import { useState } from "react";
import TopNavBar from "./TopNavBar"
import { useUser } from "./UserContext";

function Account() {
    const {currentUser} = useUser();
    const [saveButtonDisabled, setSaveButtonDisabled] = useState(true);
    const [birthDate, setBirthDate] = useState('');
    const [email, setEmail] = useState('');

    const UserInfoCard = (props) => {
        // card to display editable info.
        return <div className="userinfo-card">
            <h3>{props.heading}</h3>
            
            <div style={{display:'flex'}}>
                <input style={{backgroundColor: 'white'}} 
                    type={props.type} 
                    name={props.heading}
                    value={props.value}
                    onChange={props.onChange}
                    placeholder={props.info}
                    onFocus={cardInputClick}
                    />

                <SaveButton />
            </div>
        </div>
    }

    const cardInputClick = () => {
        console.log('text input has been clicked')
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

    const SaveButton = () => {
        console.log(`value of saveButtonDisabled: ${saveButtonDisabled}`);
        return <>
            {saveButtonDisabled ?
                <button id="account-save-button" disabled>save</button> :
                <button id="account-save-button" >save</button>
            }
        </>
    }

    const getBirthDate = (event) => {
        setBirthDate(event.target.value)
    }

    const getEmail = (event) => {
        setEmail(event.target.value)
    }

    return <div className="route-page" id="account-page">
        <TopNavBar />

        <h1 className="main-title-2">ACCOUNT</h1>
        
        <div id="user-info">
            <NameCard heading="Name" info={currentUser.username} type='text'/>
            <UserInfoCard heading="Date Of Birth" info={birthDate} type='date' value={birthDate} onChange={getBirthDate}/>
            <UserInfoCard heading="Email" info={email} type='text' value={email} onChange={getEmail}/>
        </div>
    </div>
}

export default Account