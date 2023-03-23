import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";

export default function Detail() {
    const [videogame, setVideogame] = useState({});
    const { id } = useParams();


    useEffect(() => {
        fetch(`http://localhost:3001/videogames/${id}`)
            .then(response => response.json())
            .then(data => {
                if (data) {
                    data.genres = data.genres.join(", ");
                    data.platforms = data.platforms.join(", ")
                    setVideogame(data);
                }
            })
    }, [id])

    return (
        <div>
            {
                videogame.id ? (
                    <div>
                        <h1>{videogame.name}</h1>
                        <img src={videogame.image} alt={videogame.name} width={"300px"} />
                        <h4>ID:{videogame.id}</h4>
                        <h4>Genres: {videogame.genres}</h4>
                        <h4>Platforms: {videogame.platforms}</h4>
                        <h5>Released: {videogame.released}</h5>
                        <h5>Rating: {videogame.rating}</h5>
                        {videogame.description}
                    </div>) :
                    <h1>LOADING...</h1>
            }
        </div>
    )
}