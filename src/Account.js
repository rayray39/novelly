import TopNavBar from "./TopNavBar"
import { useUser } from "./UserContext";

function Account() {
    const {currentUser} = useUser();

    const UserInfoCard = (props) => {
        return <div className="userinfo-card">
            <h2>{props.heading}</h2>
            {props.info}
        </div>
    }

    return <div className="route-page" id="account-page">
        <TopNavBar />

        <h1 className="main-title-2">ACCOUNT</h1>
        
        <div id="user-info">
            <UserInfoCard heading="Name" info="Here is your name"/>
            <UserInfoCard heading="Date Of Birth" info="this is your birth date"/>
            <UserInfoCard heading="Email" info="this is your email"/>
        </div>
    </div>
}

export default Account