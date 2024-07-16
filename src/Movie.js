function Movie ({coverImg, title, summary, genres}){
    return <div>
        <img src={coverImg} alt={title}/>
        <h2>{title}</h2>
        <p>{summary}</p>
        <ul>
            {genres&&genres.map((genere) => <li key={genere}>{genere}</li>)}
        </ul>
    </div>;
}

export default Movie;
