import { Link } from "react-router-dom";
import { useUser } from "./UserContext";

function TopNavBar() {
    const {currentUser} = useUser();

    return <>
        <nav id="top-nav-bar">
            <ul>
                <li><strong>NOVELLY</strong></li>
            </ul>
            <ul>
                <li><Link to='/catalogue' className="contrast">catalogue</Link></li>
                <li><Link to='/borrowed' className="contrast">borrowed</Link></li>
                <li><Link to='/wishlist' className="contrast">wish list</Link></li>
                <li><Link to='/account' className="contrast">account</Link></li>
            </ul>
        </nav>
    </>
}

export default TopNavBar