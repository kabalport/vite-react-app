// routes.tsx
import TarotMateMainPage from "../../pages/TarotMainPage/TarotMateMainPage";
import AboutPage from "../../pages/AboutPage/AboutPage";
import TarotDetail from "../../pages/TarotMainPage/TarotComponent/TarotDetail";
import MainPage from "../../pages/MainPage/MainPage";
import MainLayout from "../../layouts/MainLayout/MainLayout";
import TarotLayout from "../../layouts/TarotMate/MainLayout/TarotLayout";

export const HOME = "/";


interface RouteProps {
    path: string;
    component: React.ReactNode;
    layout?: React.ComponentType;
    exact?: boolean;
}


const mainRoutes: Array<RouteProps> = [
    { path: "/", component: <MainPage />, layout: MainLayout },
    { path: "/tarot", component: <TarotMateMainPage />, layout: TarotLayout },
    { path: "/tarot/about", component: <AboutPage /> }, // No layout specified
    { path: "/tarot/detail", component: <TarotDetail />, layout: MainLayout }
];



export const allRoutes = [
    ...mainRoutes
];
