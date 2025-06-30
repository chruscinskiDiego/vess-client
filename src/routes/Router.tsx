import { Navigate, Route, Routes } from "react-router-dom"
import { AboutPage } from "../pages/AboutPage"
import { LoginPage } from "../pages/LoginPage"
import { RegisterPage } from "../pages/RegisterPage"
import { useContext } from "react"
import { UserContext } from "../contexts/UserContext"
import { HomePage } from "../pages/HomePage"
import { AvaliationsPage } from "../pages/AvaliationsPage"
import { ConfigsPage } from "../pages/ConfigsPage"
import { AvaliationsHistory } from "../pages/AvaliationsHistory"
import { NewAvaliation } from "../pages/NewAvaliation"
import { ResumeOfAvaliation } from "../pages/ResumeOfAvaliation"

export const Router: React.FC = () => {
    const { isAuthenticated } = useContext(UserContext)!;

    return (
        <Routes>

            {!isAuthenticated && (
                <>
                    <Route path="/" element={<AboutPage />} />
                    <Route path="/signin" element={<LoginPage />} />
                    <Route path="/signup" element={<RegisterPage />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </>
            )}

            {isAuthenticated && (
                <>

                    <Route path="/" element={<Navigate to="/home" replace />} />

                    <Route path="/home" element={<HomePage />} />

                    <Route path="/avaliations" element={<AvaliationsPage/>}/>

                    <Route path="/avaliations-history" element={<AvaliationsHistory/>}/>

                    <Route path="/new-avaliation" element={<NewAvaliation/>}/>

                    <Route path="/resume-of-avaliation/:id" element={<ResumeOfAvaliation/>}/>

                    <Route path="/configs" element={<ConfigsPage/>}/>

                    <Route path="*" element={<Navigate to="/home" replace />} />

                </>
            )}
        </Routes>
    );
};