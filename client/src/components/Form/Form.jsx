import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Form.module.css";
import validation from "./validation";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../redux/actions";


export default function Form() {
    const [videogame, setVideogame] = useState({
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
    const genresOptions = [];
    const platforms = [];

    useEffect(() => {
        dispatch(actions.getGenresDb())
    }, [dispatch]);


    function handleSubmit(event) {
        event.preventDefault();
        const errorsArray = Object.values(errors);
        if (errorsArray.length) window.alert("You must complete all fields.");
        else {

            axios.post("http://localhost:3001/videogames", videogame)

            setErrros({
                name: "",
                description: "",
                image: "",
                platforms: "",
                rating: "",
                released: "",
                genres: "",
            });
            setVideogame({
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

    function handleGenres(event) {
        genresOptions.push(event.target.value);
        setVideogame({
            ...videogame,
            genres: genresOptions
        });
    };

    function handlePlatforms(event) {
        platforms.push(event.target.value)
        setVideogame({
            ...videogame,
            platforms: platforms

        })

    }

    function handleChange(event) {
        if (event.target.name !== "platforms" || event.target.name !== "genres") {
            setVideogame({
                ...videogame,
                [event.target.name]: event.target.value
            })

        };

        setErrros(
            validation({
                ...videogame,
                [event.target.name]: event.target.value
            })
        );
    };

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <label>Name:</label>
                <input autoComplete="off" name="name" value={videogame.name} onChange={handleChange} placeholder="name..." type="" />
                {errors.name !== "" && <p className={styles.danger}>{errors.name}</p>}

                <label>Image</label>
                <input autoComplete="off" name="image" value={videogame.image} onChange={handleChange} placeholder="" type="URL image..." />
                {errors.image !== "" && <p className={styles.danger}>{errors.image}</p>}

                <label>Description</label>
                <textarea autoComplete="off" name="description" value={videogame.description} onChange={handleChange} placeholder="description..." type="" />
                {errors.description !== "" && <p className={styles.danger}>{errors.description}</p>}

                <label>Platforms</label>
                <p>Add one by one</p>
                <input autoComplete="off" name="platforms" value={videogame.platforms} onChange={handleChange} placeholder="platforms..." type="" />
                {errors.platforms !== "" && <p className={styles.danger}>{errors.platforms}</p>}
                <button onClick={handlePlatforms} className={styles.addButton}>Add</button>

                <select name="gender" onChange={handleGenres}>
                    <option value={null} disabled="disabled" selected="selected">Select genres...</option>
                    {
                        genres ?
                            genres.map((genre, index) => {
                                return (
                                    <option key={index} value={genre}>{genre}</option>
                                )
                            }) : null
                    }
                </select>
                <label>Released</label>
                <input autoComplete="off" name="released" value={videogame.released} onChange={handleChange} placeholder="released..." type="date" />
                {errors.released !== "" && <p className={styles.danger}>{errors.released}</p>}

                <label>Rating</label>
                <input autoComplete="off" name="rating" value={videogame.rating} onChange={handleChange} placeholder="rating..." type="" />
                {errors.rating !== "" && <p className={styles.danger}>{errors.rating}</p>}

                <button className={styles.createButton} type="submit">Create</button>
            </form>

        </div>
    )
}