// routes.tsx
import TarotMateMainPage from "../pages/gpt/TarotMateMainPage";
import AboutPage from "../pages/gpt/AboutPage/AboutPage";
import TarotDetail from "../pages/gpt/TarotComponent/TarotDetail";
import MainPage from "../pages/MainPage";
import MainLayout from "../layouts/MainLayout/MainLayout";
import TarotLayout from "../layouts/TarotMate/MainLayout/TarotLayout";
import SimpleCounterApp from "../pages/SimpleCounter/components/templates/SimpleCounterApp";

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
    { path: "/tarot/about", component: <AboutPage /> },
    { path: "/tarot/detail", component: <TarotDetail />, layout: MainLayout },
    { path: "/simplecounter", component: <SimpleCounterApp />}
];



export const allRoutes = [
    ...mainRoutes
];
