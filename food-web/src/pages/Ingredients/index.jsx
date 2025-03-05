import "../../styles/Ingredients.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "../../setup/axios.jsx";
import { toast } from "react-toastify";


const cleanString = (str) => {
    return str.trim().replace(/\s*[,\.]+$/, '').replace(/^[,\.]+\s*/, '').replace(/,\s*,/g, ',');
}

const Index = () => {
    const [name, setName] = useState("");
    const [aliases, setAliases] = useState("");
    const [imgUrl, setImgUrl] = useState("");
    const [invalidObject, setInvalidObject] = useState({
        invalidName: false,
        invalidUnit: false,
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
        if (!aliases) {
            setInvalidObject({ ...invalidObject, invalidImgUrl: true });
            return true;
        }

        return false;
    }

    const handleAddOne = async () => {

        if (!checkInValidInput()) {
            try {
                const str = cleanString(aliases);
                const payload = {
                    name: name,
                    aliases: str.split(",").map(it => it.trim())
                    ,
                    imgUrl: imgUrl
                }
                console.log(payload);
                const response = await axios.post("/ingredients", payload);
                console.log("aa", response);
            } catch (e) {
                console.log(e);
            }
        }
        else {
            toast.error("Empty field");
        }
    }

    return (
        <div className="ingredients-container d-flex flex-col items-center justify-center align-items-center px-4 py-4">
            <div className="row d-flex flex-col items-center justify-center align-items-center gap-2">
                <h1 className="text-4xl font-bold mb-4">ADD INGREDIENT</h1>
                <input className={invalidObject.invalidName ? "form-control" : "form-control"}
                    type="text" placeholder="Name ingredient" value={name} onChange={(e) => setName(e.target.value)} />
                <div className="d-flex flex-row justify-center align-items-center w-50">
                    <img style={{ width: "100px", height: "100px" }} src={imgUrl} alt={imgUrl} />
                </div>
                <input className={invalidObject.invalidImgUrl ? "form-control" : "form-control"}
                    type="text" placeholder="Paste link image ingredient" value={imgUrl} onChange={(e) => setImgUrl(e.target.value)} />
                <input className={invalidObject.invalidUnit ? "form-control" : "form-control"}
                    type="text" placeholder="aliases ingredient separate by (,)" value={aliases} onChange={(e) => setAliases(e.target.value)} />
                <div className=" d-flex flex-row justify-content-between">
                    <button className="btn btn-success w-25" onClick={() => handleAddOne()}>
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