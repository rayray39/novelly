import { createContext, useContext, useState } from "react";


const UserContext = createContext();

export const UserProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null);

    return (
        <UserContext.Provider value={{ currentUser, setCurrentUser }}>
            {children}
        </UserContext.Provider>
    );
}

// custom hook to use UserContext
export const useUser = () => useContext(UserContext);