// import { useContext, useEffect, useRef, useState } from "react";
import { useContext, useEffect, useRef, useState } from "react";
import { ModalContext } from "../../pages/Root";

function Modal() {
    const { modal, toggleModal } = useContext(ModalContext);

    const overlayRef = useRef();

    const close = (e) => {
        if (e.target === overlayRef.current) {
            toggleModal();
        }
    }

    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch(`https://flowers.avavion.ru/api/products`)
            .then((r) => r.json())
            .then((data) => setProducts(data.data));
    }, []);

    const [form, setForm] = useState({
        first_name: "",
        last_name: "",
        message: "",
        product_id: 1,
        email: ""
    });

    const onChangeForm = (e) => {
        setForm((prevState) => {
            prevState = { ...prevState };

            prevState[e.target.name] = e.target.value.trim();

            return prevState;
        })
    }

    const onSubmitHandle = (event) => {
        event.preventDefault();
    }

    const sendRequest = async (body) => {
        const response = await fetch("https://flowers.avavion.ru/api/applications/create", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify(body),
        });

        const data = await response.json();
    }

    const onClickHandle = (event) => {
        event.preventDefault();

        sendRequest(form);
    }

    const onChangeSelectForm = (event) => {
        setForm((prevState) => {
            prevState = { ...prevState };

            prevState[event.target.name] = event.target.options[event.target.selectedIndex].value;

            return prevState;
        });
    }

    return (
        <div className={`overlay ${modal ? "active" : ""}`} ref={overlayRef} onClick={(e) => close(e)}>
            <div className="modal">
                <div className="modal-content">
                    <h2 className="title">Форма отправка заявки</h2>

                    <form onSubmit={onSubmitHandle.bind(this)}>
                        <div className="form-field">
                            <label htmlFor="first_name">Имя</label>
                            <input onChange={onChangeForm.bind(this)} value={form.first_name} type="text" placeholder="Имя" id="first_name" name="first_name" />
                        </div>


                        <div className="form-field">
                            <label htmlFor="message">Описание товара</label>
                            <textarea onChange={onChangeForm.bind(this)} value={form.message} name="message" id="message" cols="30" rows="10"></textarea>
                        </div>

                        <div className="form-field">
                            <label htmlFor="service">Выберите цветы</label>

                            <select name="service_id" id="service" onChange={onChangeSelectForm.bind(this)}>
                                {
                                    products.map((product) => {
                                        return (
                                            <option value={product.id} key={product.id}>{product.name}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>

                        <button onClick={onClickHandle.bind(this)}>Отправить сообщение</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Modal;