import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import Card from "../Card/Card";
import * as actions from "../../redux/actions"
import styles from "./Home.module.css"
import Paginate from "../Paginate/Paginate";


export default function Home() {
    const dispatch = useDispatch()
    const videogames = useSelector(state => state.videogames);
    const genres = useSelector(state => state.genres);
    const [currentPage, setCurrentPage] = useState(1);
    const [videogamesPerPage, setVideogamesPerPage] = useState(15)
    const indexOfLastVideogame = currentPage * videogamesPerPage;
    const indexOfFirstVideogame = indexOfLastVideogame - videogamesPerPage;
    const currentVideogames = videogames.slice(indexOfFirstVideogame, indexOfLastVideogame)

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber)
    }


    useEffect(() => {
        if (!videogames.length) dispatch(actions.getAllVideogames());
        dispatch(actions.getGenresDb());
    }, [])

    function handleOrderByName(event) {
        dispatch(actions.orderByName(event.target.value))

    }
    function handleOrderByRating(event) {
        dispatch(actions.orderByRating(event.target.value))
    }

    function handleFilterByLocation(event) {
        dispatch(actions.filterByLocation(event.target.value))
    }

    function handleFilterByGenres(event) {
        dispatch(actions.filterByGenres(event.target.value))
    }


    return (
        <div>
            <div>
                <select name="orderByName" onChange={handleOrderByName}>
                    <option value="defaulValue" disabled="disabled" selected="defaultValue">Order by name...</option>
                    <option value="Ascendente">Ascendente</option>
                    <option value="Descendente">Descendente</option>
                </select>
                <select name="orderByRating" onChange={handleOrderByRating}>
                    <option value="defaulValue" disabled="disabled" selected="defaultValue">Order by rating...</option>
                    <option value="Ascendente">Ascendente</option>
                    <option value="Descendente">Descendente</option>
                </select>
                <select name="gender" onChange={handleFilterByGenres}>
                    <option value="defaulValue" disabled="disabled" selected="defaultValue">Filter by genres...</option>
                    <option value="all">All</option>
                    {
                        genres ?
                            genres.map((genre, index) => {
                                return (
                                    <option key={index} value={genre}>{genre}</option>
                                )
                            }) : null
                    }
                </select>
                <select name="location" onChange={handleFilterByLocation}>
                    <option value="defaulValue" disabled="disabled" selected="defaultValue">Filter by location...</option>
                    <option value="all">All</option>
                    <option value="database">Database</option>
                    <option value="api">API</option>
                </select>
            </div>
            <div>
                <Paginate
                    videogamesPerPage={videogamesPerPage}
                    videogames={videogames.length}
                    paginate={paginate}
                />
            </div>
            <div className={styles.container}>
                {
                    currentVideogames.length ? (
                        currentVideogames.map((game, index) => {
                            console.log(game.genres);
                            return (
                                <Card
                                    key={index}
                                    id={game.id}
                                    name={game.name}
                                    image={game.background_image}
                                    genres={game.genres.join(", ")}
                                />
                            )
                        })
                    ) : <h1>LOADING...</h1>
                }
            </div>
        </div>
    )
}