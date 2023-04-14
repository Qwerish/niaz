import { useContext } from "react";
import { ModalContext } from "../../pages/Root";

const ModalButton = () => {
    const {toggleModal} = useContext(ModalContext);

    return (
        <button onClick={toggleModal}>Отправить заявку</button>
    )
}

const Header = () => {
    return(
        <header>
            <div className="container">
                <div className="header-wrapper">
                    <a href="/" className="header-logo">WeAreBuilding</a>

                    <ModalButton />
                </div>
            </div>
        </header>
    )
}

export default Header;