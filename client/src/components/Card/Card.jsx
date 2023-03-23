import styles from "./Card.module.css";
import { Link } from "react-router-dom";

export default function Card({id, name, image, genres}) {
    
    return (
        <div className={styles.card}>
            <Link to={`/detail/${id}`} >
                <h3>{name}</h3>
            </Link>
            <img src={image} alt={name} width={"300px"} />
            <h4>Genero: {genres}</h4>
        </div>
    )
}