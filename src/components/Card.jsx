export default function Card(props) {
    return (
        <div className="card">
            <img src={props.image} alt="" />
            <div className="info">
                <p className="about">{props.source}</p>
                <p className="about">{props.date}</p>
            </div>
            <div className="text">
                <h4>{props.title}</h4>
                <p>{props.preview}</p>
            </div>
            <button>Skaityti daugiau</button>
        </div>
    )
}