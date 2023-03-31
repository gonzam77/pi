import React from "react";
import styles from "./Paginate.module.css"

export default function Paginate({ videogamesPerPage, videogames, paginate }) {
    
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(videogames / videogamesPerPage); i++) {
        pageNumbers.push(i);
    }
    return (
        <div className={styles.container}>
            <ul className="">
                {pageNumbers &&
                    pageNumbers.map((number, index) => {
                        return (
                            <li key={index} className={styles.pagination}>
                                <a className={styles.page} href onClick={() => paginate(number)}>{number}</a>
                            </li>

                        )
                    })}
            </ul>
        </div>
    )
}