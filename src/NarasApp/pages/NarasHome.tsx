import { useEffect, useState } from "react";
import { fetchCountries } from "../api.ts";
import CountryList from "../components/CountryList.tsx";
import Searchbar from "../components/Searchbar.tsx";
import style from "./NarasHome.module.css";
import {useSearchParams} from "react-router-dom";

// Country 타입 정의
type Country = {
    code: string;
    commonName: string;
    flagEmoji: string;
    flagImg: string;
    capital: string[];
    region: string;
    population: number;
};

export default function NarasHome() {
    const [searchParams] = useSearchParams();
    const [countries, setCountries] = useState<Country[]>([]);
    const searchQuery = searchParams.get("q") || ""; // URL에서 검색 쿼리를 가져옴

    const setInitData = async () => {
        const data = await fetchCountries();
        setCountries(data);
    };

    useEffect(() => {
        setInitData();
    }, []);

    return (
        <div className={style.container}>
            <Searchbar q={searchQuery} />
            <CountryList countries={countries} />
        </div>
    );
}
