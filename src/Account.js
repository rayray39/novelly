import TopNavBar from "./TopNavBar"
import { useUser } from "./UserContext";

function Account() {
    const {currentUser} = useUser();

    const UserInfoCard = () => {
        return <div className="userinfo-card">
            <h2>{currentUser.username}</h2>
            this represents some info about the user.
        </div>
    }

    return <div className="route-page" id="account-page">
        <TopNavBar />

        <h1 className="main-title-2">ACCOUNT</h1>
        
        <div id="user-info">
            <UserInfoCard />
            <UserInfoCard />
            <UserInfoCard />
        </div>
    </div>
}

export default Account