// routes.tsx
import TarotMateMainPage from "../../pages/TarotMate/MainPage/TarotMateMainPage";
import AboutPage from "../../pages/TarotMate/AboutPage/AboutPage";
import TarotDetail from "../../pages/TarotMate/MainPage/TarotComponent/TarotDetail";
import MainPage from "../../pages/TarotMate/MainPage/MainPage";

export const HOME = "/";


interface RouteProps {
    path: string
    component: any
    exact?: boolean
}


const mainRoutes: Array<RouteProps> = [
    { path: "/", component: <MainPage /> },
    { path: "/tarot", component: <TarotMateMainPage /> },
    { path: "/tarot/about", component: <AboutPage /> },
    { path: "/tarot/detail", component: <TarotDetail /> }
]



export const allRoutes = [
    ...mainRoutes
];
