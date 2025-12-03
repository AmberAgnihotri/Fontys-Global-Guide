import studentsImg from '../assets/students.png';
import girlPicture from '../assets/girl-with-books.jpg';
import graduationPic from '../assets/graduation.jpg';
import "../styles/Home.css";

export default function Home() {
    return (
        <div className="home-page">

            <img
                src={studentsImg}
                alt="Students"
                className="home-image full-width"
            />

            <div className="home-text">
                <h1>Welcome to <br /> Fontys Global Guide</h1>
                <p>
                    The all-in-one app for international students at Fontys.
                    We help you with housing, administration, exploring the city
                    and connecting with other students — all in one place.
                </p>
            </div>

            <img
                src={girlPicture}
                alt="Student with books"
                className="home-image rounded"
            />

            <div className="home-text">
                <h2>Our Mission</h2>
                <p>
                    Starting your studies in a new country can feel overwhelming.
                    Fontys Global Guide is here to support international students
                    with clear information, helpful tools and a strong community.
                    Everything you need for a smooth start, all in one app.
                </p>
            </div>

            <img
                src={graduationPic}
                alt="Graduation"
                className="home-image rounded"
            />

            <div className="home-text">
                <h2>Building Your Future Together</h2>
                <p>
                    We believe students succeed best when they feel supported and connected.
                    With Fontys Global Guide, we aim to improve the student experience,
                    strengthen the international community and help you grow during
                    your time at Fontys.
                </p>
            </div>

        </div>
    );
}
