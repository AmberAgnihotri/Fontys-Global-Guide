import studentsImg from '../assets/students.png';
import girlPicture from '../assets/girl-with-books.jpg';
import graduationPic from '../assets/graduation.jpg';
import "../styles/Home.css";

import { useTranslation } from "react-i18next";

export default function Home() {
    const { t } = useTranslation();

    return (
        <div className="home-page">

            <img
                src={studentsImg}
                alt="Students"
                className="home-image full-width"
            />

            <div className="home-text">
                <h1>{t("home.title")}</h1>
                <p>{t("home.intro")}</p>
            </div>

            <img
                src={girlPicture}
                alt="Student with books"
                className="home-image rounded"
            />

            <div className="home-text">
                <h2>{t("home.missionTitle")}</h2>
                <p>{t("home.missionText")}</p>
            </div>

            <img
                src={graduationPic}
                alt="Graduation"
                className="home-image rounded"
            />

            <div className="home-text">
                <h2>{t("home.futureTitle")}</h2>
                <p>{t("home.futureText")}</p>
            </div>

        </div>
    );
}
