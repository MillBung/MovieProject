import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import styles from "./Detail.module.css";

function Detail() {
    const {id} = useParams();
    const [movie, setMovie] = useState(
        {
            id: 0,
            title: "",
            year: 0,
            runtime: 0,
            generes: [],
            like_count: 0,
            description_intro: "",
            background_image: "",
            medium_cover_image: ""
        });
    const [loading, setLoading] = useState(true);
    const getMovie = async () => {
        const json = await (
            await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
            ).json();
        setMovie(
            {
                title: json.data.movie.title,
                year: json.data.movie.year,
                runtime: json.data.movie.runtime,
                genres: json.data.movie.genres,
                like_count: json.data.movie.like_count,
                description_intro: json.data.movie.description_intro,
                background_image: json.data.movie.background_image,
                medium_cover_image: json.data.movie.large_cover_image
            });
        setLoading(false);
    };
    useEffect(() => {
        getMovie();
    }, []);
    return (
        <div className={styles.detailContainer}
             style={{backgroundImage: `url(${movie.background_image}`}}>
            {loading ? (
                    <div className={styles.loader}>
                        <span>Loading...</span>
                    </div>
                )
                :
                (
                    <div className={styles.detailContent}>
                        <img className={styles.coverImage} src={movie.medium_cover_image} alt={"Movie Cover"}/>
                        <div className={styles.textContent}>
                            <div>{movie.title} ({movie.year})</div>
                            <div className={styles.detailGenres}>
                                {movie.genres.map((g, index) => (
                                    <div key={index} className={styles.genre}>{g}</div>
                                ))}
                            </div>
                            <p className={styles.detailDescription}>{movie.description_intro.length > 1300 ? `${movie.description_intro.slice(0,1300)}...` : movie.description_intro}</p>
                        </div>
                    </div>
                )}
        </div>
    );
}

export default Detail;