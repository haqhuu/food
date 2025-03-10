import { createContext, useContext, useState } from "react";

const CloseOpenContext = createContext(null);

export const CloseOpenProvider = ({ openSide, setOpenSide, children }) => {
    // const [openSide, setOpenSide] = useState(true);
    console.log("ctx:: ", openSide)
    return (
        <CloseOpenContext.Provider
            value={{ openSide, setOpenSide }}
        >
            {children}
        </CloseOpenContext.Provider>
    );
}

export const useCloseOpen = () => {
    return useContext(CloseOpenContext);
}