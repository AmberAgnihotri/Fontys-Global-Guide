import studentsImg from '../assets/students.png';
import "../styles/Home.css";

export default function Home() {
    return (
        <div className="home-page">
            <img
                src={studentsImg}
                alt="Students"
                className="home-image"
            />

            <div className="home-text">
                <h1>Welcome, <br /> to Fontys Global Guide</h1>

                <p>
                    Hier op komt de informatie die je kunt gebruiken op de app beter te begrijpen + checklist
                </p>
            </div>
        </div>
    );
}
