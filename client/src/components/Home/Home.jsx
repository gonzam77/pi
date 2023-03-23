import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import Card from "../Card/Card";
import * as actions from "../../redux/actions"
import styles from "./Home.module.css"


export default function Home() {

    const dispatch = useDispatch()
    const videogames = useSelector(state => state.videogames);

    useEffect(() => {
        if(!videogames.length)
        dispatch(actions.getAllVideogames())
    }, [])

    return (
        <div className={styles.container}>
            {
                videogames.length ? (
                    videogames[0].map(game => {
                        return (
                            <Card
                                key={game.id}
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
    )
}