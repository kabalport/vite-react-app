// routes.tsx
import TarotMateMainPage from "../pages/gpt/TarotMateMainPage";
import AboutPage from "../pages/gpt/AboutPage/AboutPage";
import TarotDetail from "../pages/gpt/TarotComponent/TarotDetail";
import MainPage from "../pages/MainPage";
import MainLayout from "../layouts/MainLayout/MainLayout";
import TarotLayout from "../layouts/TarotMate/MainLayout/TarotLayout";
import SimpleCounterApp from "../pages/SimpleCounter/components/templates/SimpleCounterApp";
import TodoApp from "../pages/TodoApp/TodoApp";
import NotFoundPage from "../pages/errorPage/NotFoundPage/NotFoundPage.tsx";
import Search from "../NarasApp/pages/Search.tsx";
import Country from "../NarasApp/pages/Country.tsx";
import NarasApp from "../NarasApp/NarasApp.tsx";
import NarasLayout from "../NarasApp/layouts/NarasLayout.tsx";

export const HOME = "/";


interface RouteProps {
    path: string;
    component: React.ReactNode;
    layout?: any;
    exact?: boolean;
}


const mainRoutes: Array<RouteProps> = [
    { path: "/", component: <MainPage />, layout: MainLayout },
    { path: "/tarot", component: <TarotMateMainPage />, layout: TarotLayout },
    { path: "/tarot/about", component: <AboutPage /> },
    { path: "/tarot/detail", component: <TarotDetail />},
    { path: "/simplecounter", component: <SimpleCounterApp />},
    { path: "/todo", component: <TodoApp />},
    { path: "/search", component: <Search />, layout: NarasLayout },
    { path: "/country/:code", component: <Country />, layout: NarasLayout },
    { path: "/naras", component: <NarasApp />, layout: NarasLayout },
    { path: "*", component: <NotFoundPage />},
];



export const allRoutes = [
    ...mainRoutes
];
