import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";

const SinglePage = () => {
    const params = useParams();
    const [product, setProduct] = useState({});

    useEffect(() => {
        fetch(`https://flowers.avavion.ru/api/products/${params.id}`)
            .then((r) => r.json())
            .then((data) => setProduct(data.data));
    }, []);

    const price = product.price - (product.price / 100 * product.discount);

    return (
        <section>
            <div className="cont-two">
            <div className="container">
                <div className="wrapper">
                    <div className="product-item" key={product.id}>
                        <div className="product-images">
                            <div className="product-image">
                                <img src={product.preview_image} alt="Фотография отсутствует" />
                            </div>
                        </div>

                        <div className="product-info">
                            <h3 className="name">{product.name}</h3>
                            <p className="price">{product.tag}</p>

                            <p>{product.short_text}</p>
                            <p>{product.text}</p>
                            <p className="price">{Math.round(price)} руб</p>

                            <NavLink className="back" to={`/`}>Назад</NavLink>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </section>
    )
}

export default SinglePage;