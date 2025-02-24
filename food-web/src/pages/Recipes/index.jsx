import "../../styles/Ingredients.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "../../setup/axios.jsx";
import { toast } from "react-toastify";

const Index = () => {
    const [name, setName] = useState("");
    const [time, setTime] = useState("");
    const [energy, setEnergy] = useState("");
    const [description, setDescription] = useState("");
    const [ingredient, setIngredient] = useState("");
    const [imgUrl, setImgUrl] = useState("");
    const [instruction, setInstruction] = useState("");
    const [invalidObject, setInvalidObject] = useState({
        invalidName: false,
        invalidImgUrl: false,
    });

    const checkInValidInput = () => {
        if (!name) {
            setInvalidObject({ ...invalidObject, invalidName: true });

            return true;
        }
        if (!imgUrl) {
            setInvalidObject({ ...invalidObject, invalidImgUrl: true });
            return true;
        }

        return false;
    }


    const handleAddOne = async () => {

        if (!checkInValidInput()) {
            try {
                const payload = {
                    name: name,
                    imgUrl: imgUrl,
                    time: time,
                    energy: energy,
                    ingredient: ingredient,
                    description: description,
                    instruction: instruction
                }
                const response = await axios.post("/recipes", payload);
                console.log("aa", response);
            } catch (e) {
                console.log(e);
            }
        }
        else {
            toast.error("Empty field");
            // setInvalidObject({
            //     invalidName: false,
            //     invalidUnit: false,
            //     invalidImgUrl: false,
            // });
        }
    }

    return (
        <div className="recipes-container d-flex flex-col items-center justify-center align-items-center px-4 py-4">
            <div className="row d-flex flex-col items-center justify-center align-items-center gap-2">
                <h1 className="text-4xl font-bold mb-4">CREATE RECIPE</h1>
                <input className={invalidObject.invalidName ? "form-control" : "form-control"}
                    type="text" placeholder="Name Recipe"
                    value={name} onChange={(e) => setName(e.target.value)} />
                <div className="d-flex flex-row justify-center align-items-center w-50">
                    <img style={{ width: "100px", height: "100px" }} src={imgUrl} alt={imgUrl} />
                </div>

                <input
                    className={invalidObject.invalidImgUrl ? "form-control" : "form-control"}
                    type="text" placeholder="Paste link image recipe"
                    value={imgUrl} onChange={(e) => setImgUrl(e.target.value)} />
                <input
                    className={invalidObject.invalidUnit ? "form-control" : "form-control"}
                    type="text" placeholder="Time cooking"
                    value={time} onChange={(e) => setTime(e.target.value)} />
                <input
                    className={invalidObject.invalidImgUrl ? "form-control" : "form-control"}
                    type="text" placeholder="Calories"
                    value={energy} onChange={(e) => setEnergy(e.target.value)} />
                <textarea
                    className="form-control" placeholder="Ingredients here" rows="3"
                    value={ingredient}
                    onChange={(e) => setIngredient(e.target.value)} >
                </textarea>
                <textarea
                    className="form-control" placeholder="Description here" rows="2"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)} >
                </textarea>
                <textarea
                    className="form-control" placeholder="Instruction here" rows="3"
                    value={instruction}
                    onChange={(e) => setInstruction(e.target.value)}>
                </textarea>
                <div className=" d-flex flex-row justify-content-between">
                    <button className="btn btn-success" onClick={() => handleAddOne()}>
                        Add
                    </button>
                    <Link
                        to="/"
                        className="btn btn-dark">
                        Return home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Index;