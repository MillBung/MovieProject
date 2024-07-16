import {useParams, useState} from "react-router-dom";
import {useEffect} from "react";
function Detail() {
    const {id} = useParams();
    const [movie, setMovie] = useState("");
    const [loading, setLoading] = useState(true);
    const getMovie = async () => {
        const json = await (
            await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
            ).json();
        setMovie(json);
    };
    useEffect(() => {
        getMovie();
    }, []);
    return <h1>Detail</h1>;
}

export default Detail;