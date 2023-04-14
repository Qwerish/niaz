import { useState } from "react";
import { createContext } from "react";
import Header from "../components/Header/Header";
import { Outlet } from "react-router-dom";
import Modal from "../components/Modal/Modal";

export const ModalContext = createContext(null);

const Root = () => {
    const [modal, setModal] = useState(false);

    const toggleModal = setModal.bind(this, !modal)

    return(
        <ModalContext.Provider value={{modal, toggleModal}} >
            <Modal/>
            <Header/>
            <Outlet/>
        </ModalContext.Provider >
    )
}

export default Root;