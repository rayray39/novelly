import TopNavBar from "./TopNavBar"
import { useUser } from "./UserContext";

function Account() {
    const {currentUser} = useUser();

    const UserInfoCard = (props) => {
        return <div className="userinfo-card">
            <h3>{props.heading}</h3>
            
            <div style={{display:'flex'}}>
            <input style={{backgroundColor: 'white'}} type="text" name={props.heading} aria-label="disabled input" placeholder={props.info} disabled/>
            <button id="account-save-button" disabled>save</button>
            </div>
        </div>
    }

    return <div className="route-page" id="account-page">
        <TopNavBar />

        <h1 className="main-title-2">ACCOUNT</h1>
        
        <div id="user-info">
            <UserInfoCard heading="Name" info={currentUser.username}/>
            <UserInfoCard heading="Date Of Birth" info="this is your birth date"/>
            <UserInfoCard heading="Email" info="this is your email"/>
        </div>
    </div>
}

export default Account