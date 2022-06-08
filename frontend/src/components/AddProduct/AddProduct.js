import React from 'react';
import './AddProduct.scss';
import { AddProductSerivce } from './AddProduct.service';

const AddProduct = () => {
    const formRef = React.createRef();

    const submit = (e) => {
        e.preventDefault();

        const form = formRef.current;

        const name = form[0].value;
        const desc = form[1].value;
        const price = form[2].value;

        const product = { name, desc, price };

        AddProductSerivce.add(product)
        .then((response) => {
            if (response.data.success) {
                formRef.current.reset();
            } 
        });
    };

    return (
        <div className="add-product-container">
            <h3>Dodaj produkt</h3>
            <form ref={formRef}>
                <input type="text" placeholder="Nazwa" />
                <input type="text" placeholder="Opis" />
                <input type="text" placeholder="Cena" />
                <button onClick={(e) => submit(e)}>Zapisz</button>
            </form>
        </div>
    );
};

export default AddProduct;
