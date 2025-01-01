
function UserCard() {
    return <div id="admin-card">
        this is a card
    </div>
}

function AdminPage() {

    return <>
        <div className="route-page" id="admin-page">
            <nav id="top-nav-bar">
                <ul>
                    <li><strong>NOVELLY</strong></li>
                </ul>
            </nav>
        </div>

        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <UserCard />
            <UserCard />
        </div>
    </>
}

export default AdminPage;