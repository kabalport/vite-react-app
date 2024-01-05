import React from "react";
import style from "./NarasLayout.module.css";
import {useNavigate} from "react-router-dom";

type LayoutProps = {
    children: React.ReactNode;
};

export default function NarasLayout({ children }: LayoutProps) {
    const nav = useNavigate();

    const onClickHeader = () => {
        nav(`/naras`);
    };
    return (
        <div className={style.container}>
            <header onClick={onClickHeader} className={style.header}>
                <div>🌏 NARAS</div>
            </header>
            <main className={style.main}>{children}</main>
            <footer className={style.footer}>
                <div>© 2024 NARAS. All rights reserved.</div>
            </footer>
        </div>
    );
}
