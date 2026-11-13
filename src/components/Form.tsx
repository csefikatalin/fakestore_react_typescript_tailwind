import React, { useState, type ChangeEvent, type FormEvent } from 'react'
import type { NewProductType } from '../types/ProductType';
import { useProductContext } from '../contexts/ProductContext';

function Form() {
    const { addProduct } = useProductContext()
    const [product, setProduct] = useState<NewProductType>({
        title: "",
        price: 10,
        description: "",
        category: "",
        image: ""
    });
    function handleChange(
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) {
        const { name, value, type } = e.target;

        setProduct({
            ...product,
            [name]: type === "number" ? Number(value) : value
        });

    }


    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        addProduct(product);
        setProduct({
            title: "",
            price: 10,
            description: "",
            category: "",
            image: ""
        })
    }
    const inputStyle =
        "w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500";

    return (
        <form onSubmit={handleSubmit}

            className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-md space-y-4"
        >
            <h2 className="text-2xl font-bold text-gray-800">
                Új termék felvétele
            </h2>

            <div>
                <label htmlFor="title" className="block mb-1 font-medium">
                    Termék neve
                </label>
                <input
                    id="title"
                    name="title"
                    type="text"
                    required
                    value={product.title}
                    onChange={handleChange}
                    className={inputStyle}
                />
            </div>

            <div>
                <label htmlFor="price" className="block mb-1 font-medium">
                    Ár ($)
                </label>
                <input
                    id="price"
                    name="price"
                    type="number"
                    min="0"
                    step="1"
                    required
                    value={product.price}
                    onChange={handleChange}
                    className={inputStyle}
                />
            </div>

            <div>
                <label htmlFor="category" className="block mb-1 font-medium">
                    Kategória
                </label>
                <input
                    id="category"
                    name="category"
                    type="text"
                    required
                    value={product.category}
                    onChange={handleChange}
                    className={inputStyle}
                />
            </div>

            <div>
                <label htmlFor="description" className="block mb-1 font-medium">
                    Leírás
                </label>
                <textarea
                    id="description"
                    name="description"
                    required
                    rows={4}
                    value={product.description}
                    onChange={handleChange}
                    className={inputStyle}
                />
            </div>

            <div>
                <label htmlFor="image" className="block mb-1 font-medium">
                    Kép URL-címe
                </label>
                <input
                    id="image"
                    name="image"
                    type="url"
                    required
                    value={product.image}
                    onChange={handleChange}
                    className={inputStyle}
                />
            </div>



            <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 cursor-pointer"
            >
                Termék hozzáadása
            </button>
        </form>
    )
}

export default Form