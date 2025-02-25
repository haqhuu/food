
import { useEffect, useState } from "react";
import axios from "../setup/axios.jsx";

// const data = ["Apple", "Banana", "Cherry", "Date", "Grape", "Mango", "Orange", "Pineapple", "Strawberry"];
let data = [];
function IngredientForm({ setRecipes, setCount }) {
    const [ingredients, setIngredients] = useState([""]); // Initial ingredient
    const [activeIndex, setActiveIndex] = useState(null); // Track which input is active


    const getData = async () => {
        try {
            const response = await axios.get("/ingredients");
            if (response) {
                response.map((item) => {
                    data.push({ name: item.name.join("/"), imgUrl: item.imgUrl });
                });
            }
            console.log("ehe: ", data);

        } catch (e) {
            console.log(e);
        }
    }
    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        handleOnClickSearch();
    }, [ingredients]);


    const removeIngredient = (index) => {
        setIngredients(ingredients.filter((_, i) => i !== index)); // Remove ingredient
    };

    const addIngredient = () => {
        setIngredients([...ingredients, ""]); // Add new empty input
    };

    const updateIngredient = (index, value) => {
        const updated = [...ingredients];
        updated[index] = value;
        setIngredients(updated);

        setQuery(value);

        // Filter suggestions
        if (value.length > 0) {
            const filtered = data.filter((item) =>
                item.name.toLowerCase().includes(value.toLowerCase())
            );
            setSuggestions(filtered);
        } else {
            setSuggestions([]);
        }
    };

    const handleOnClickSearch = async () => {
        console.log(ingredients);

        let payload = ingredients.join("/");
        payload = payload.split("/");
        console.log(payload);
        const response = await axios.post("/recipes/search", payload);
        console.log("ress", response);

        // const result = response.filter(item => item.freq !== 0);
        setRecipes(response);
        setCount(response.length);
    }
        ;;;;
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);

    // Handle click on suggestion
    const handleSelect = (index, value) => {
        const updated = [...ingredients];
        updated[index] = value.name;
        setIngredients(updated);

        setSuggestions([]);
    };

    return (
        <div className="search-container">
            {ingredients.map((ingredient, index) => (
                <div key={index} style={{ width: "250px", margin: "20px auto", textAlign: "left" }}>
                    <input
                        type="text"
                        value={ingredient}
                        onChange={(e) => updateIngredient(index, e.target.value)}
                        placeholder="Enter ingredient"
                        onFocus={() => setActiveIndex(index)}
                        onBlur={() => setTimeout(() => setActiveIndex(null), 200)} // Close on blur
                        style={{
                            width: "100%",
                            padding: "8px",
                            borderRadius: "4px",
                            border: "1px solid #ccc",
                        }}
                    />
                    {ingredients.length > 0 && (
                        <button className='btn btn-secondary' onClick={() => removeIngredient(index)}>-</button>
                    )}
                    {activeIndex === index && <ul style={{ listStyleType: "none", padding: 0, margin: 0 }}>
                        {suggestions.map((item, indexIt) => (
                            <li
                                key={indexIt}
                                onClick={() => handleSelect(index, item)}
                                style={{
                                    padding: "8px",
                                    cursor: "pointer",
                                    backgroundColor: "#f1f1f1",
                                    borderBottom: "1px solid #ccc",
                                }}>
                                {item.name}
                                <img style={{ width: "50px", height: "50px" }} src={item.imgUrl} alt="" />
                            </li>
                        ))}
                    </ul>
                    }
                </div>
            ))}
            <button className='btn btn-white' onClick={handleOnClickSearch}> 🔎 </button>
            <button
                className='btn btn-secondary'
                onClick={addIngredient}>
                Add an ingredient +
            </button>
        </div>
    );
}

export default IngredientForm;
