import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";

const HomePage = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch(`https://api.avavion.ru/api/products`)
            .then((r) => r.json())
            .then((data) => setProducts(data.data));
    }, []);

    const [query, setQuery] = useState("");
    let searchProducts = products.filter((item) => item.name.toLowerCase().includes(query));

    const onChangeQuery = (e) => {
        setQuery(e.target.value.toLowerCase());
    }

    const sortProducts = (e) => {
        const type = e.target.options[e.target.selectedIndex].value;

        switch (type) {
            case "ASC":
                setProducts([...products.sort((a, b) => a.price - b.price)])
                break;

            case "DESC":
                setProducts([...products.sort((a, b) => b.price - a.price)])

                break;
        }
    }

    const tag = useParams();

    const [tags, setTags] = useState([]);

    const fetchTags = async () => {
        const response = await fetch('https://api.avavion.ru/api/tags');
        const data = await response.json();

        setTags(data.data);
    }

    useEffect(() => {
        fetchTags();
    }, []);

    if(tag.name !== undefined){
        searchProducts = products.filter((item) => item.tag === tag.name)
    }

    return (
        <section>
            <div className="container">
                <div className="wrapper">
                    <div className="section-header">
                        <h2 className="title">Каталог</h2>

                        <form>
                            <select onChange={sortProducts.bind(this)}>
                                <option value="NONE" disabled>Выбрать сортировку</option>
                                <option value="ASC">от меньшего к большему</option>
                                <option value="DESC">от большего к меньшему</option>
                            </select>
                        </form>
                    </div>

                    <nav>
                        <a href="/" className="active">Все</a>
                        {
                            tags.map((tag) => {
                                return (
                                    <NavLink to={`/tags/${tag.name}`} key={tag.id}>{tag.name}</NavLink>
                                )
                            })
                        }
                    </nav>

                    <form className="search-form">
                        <input type="text" placeholder="Поиск" value={query} onChange={(e) => onChangeQuery(e)} />
                    </form>

                    <div className="products-list">
                        {
                            searchProducts.map((product) => {
                                const price = product.price - (product.price / 100 * product.discount);
                                return (
                                    <div className="products-item" key={product.id}>
                                        <div className="products-image">
                                            <div className="image">
                                                <img src={product.image_url} alt="" />
                                            </div>
                                        </div>

                                        <div className="info">
                                            <h3 className="name">{product.name}</h3>
                                            <p className="price">{Math.round(price)} ₽</p>
                                            <NavLink to={`/products/${product.id}`} className="btn">Перейти</NavLink>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HomePage;