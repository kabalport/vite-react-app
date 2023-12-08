// routes.tsx
import TarotMateMainPage from "../../pages/TarotMate/MainPage/TarotMateMainPage";
import AboutPage from "../../pages/TarotMate/AboutPage/AboutPage";
import TarotDetail from "../../pages/TarotMate/MainPage/TarotComponent/TarotDetail";

export const HOME = "/";


interface RouteProps {
    path: string
    component: any
    exact?: boolean
}


const mainRoutes: Array<RouteProps> = [
    { path: "/", component: <TarotMateMainPage /> },
    { path: "/about", component: <AboutPage /> },
    { path: "/tarot/detail", component: <TarotDetail /> }
]



export const allRoutes = [
    ...mainRoutes
];
