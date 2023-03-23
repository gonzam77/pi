import { useState, useEffect } from "react";
import styles from "./Form.module.css";
import validation from "./validation";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../redux/actions";


export default function Form() {
    const [inputs, setInputs] = useState({
        name: "",
        description: "",
        image: "",
        platforms: [],
        rating: "",
        released: "",
        genres: [],
    });

    const [errors, setErrros] = useState({
        name: "",
        description: "",
        image: "",
        platforms: "",
        rating: "",
        released: "",
        genres: "",
    });
    
    const dispatch = useDispatch();
    const genres = useSelector(state => state.genres);
    
    useEffect(()=>{
        dispatch(actions.getGenres())
        console.log(genres);
    },[]);

    function handleSubmit(event) {
        event.preventDefault();
        const errorsArray = Object.values(errors);
        if (errorsArray.length) window.alert("You must complete all fields.");
        else {
            setErrros({
                name: "",
                description: "",
                image: "",
                platforms: "",
                rating: "",
                released: "",
                genres: "",
            });
            setInputs({
                name: "",
                description: "",
                image: "",
                platforms: [],
                rating: "",
                released: "",
                genres: [],
            });
        };
    };

    function handleGenres() {

    };

    function handleChange(event) {
        setInputs({
            ...inputs,
            [event.target.name]: event.target.value
        })

        setErrros(
            validation({
                ...inputs,
                [event.target.name]: event.target.value
            })
        )
    };

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <label>Name:</label>
                <input name="name" value={inputs.name} onChange={handleChange} placeholder="name..." type="" />
                {errors.name !== "" && <p className={styles.danger}>{errors.name}</p>}

                <label>Image</label>
                <input name="image" value={inputs.image} onChange={handleChange} placeholder="" type="URL image..." />
                {errors.image !== "" && <p className={styles.danger}>{errors.image}</p>}

                <label>Description</label>
                <textarea name="description" value={inputs.description} onChange={handleChange} placeholder="description..." type="" />
                {errors.description !== "" && <p className={styles.danger}>{errors.description}</p>}

                <label>Platforms</label>
                <input name="platforms" value={inputs.platforms} onChange={handleChange} placeholder="platforms..." type="" />
                {errors.platforms !== "" && <p className={styles.danger}>{errors.platforms}</p>}
                
                <select name="gender" onChange={handleGenres}>
                    <option value="genres" disabled="disabled" selected>Select genres...</option>
                    { genres ? 
                        genres.map((genre,index) => {
                            return (
                                <option key={index} value={genre.id}>{genre.name}</option>
                            )
                        }) : null
                    }
                </select>
                {/* {errors.genres !== "" && <p className={styles.danger}>{errors.genres}</p>} */}

                <label>Released</label>
                <input name="released" value={inputs.released} onChange={handleChange} placeholder="released..." type="" />
                {errors.released !== "" && <p className={styles.danger}>{errors.released}</p>}

                <label>Rating</label>
                <input name="rating" value={inputs.rating} onChange={handleChange} placeholder="rating..." type="" />
                {errors.rating !== "" && <p className={styles.danger}>{errors.rating}</p>}

                <button className={styles.createButton} type="submit">Create</button>
            </form>

        </div>
    )
}