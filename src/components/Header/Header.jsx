import { useContext } from "react";
import { ModalContext } from "../../pages/Root";

const ModalButton = () => {
    const {toggleModal} = useContext(ModalContext);

    return (
        <button onClick={toggleModal}>Заявка</button>
    )
}

const Header = () => {
    return(
        <header>
            <div className="container">
                <div className="header-wrapper">
                   

                    <ModalButton />
                </div>
            </div>
        </header>
    )
}

export default Header;