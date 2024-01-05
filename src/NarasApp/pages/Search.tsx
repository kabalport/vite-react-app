import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchSearchResults } from "../api";
import Searchbar from "./../components/Searchbar";
import CountryList from "./../components/CountryList";
import style from "./Search.module.css";

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

export default function Search() {
    const [searchParams] = useSearchParams();
    const q = searchParams.get("q") || ""; // q가 null일 수 있으므로 기본값을 제공합니다.

    const [countries, setCountries] = useState<Country[]>([]);

    useEffect(() => {
        // 즉시 실행 함수를 사용하여 비동기 로직 처리
        (async () => {
            try {
                const data = await fetchSearchResults(q);
                setCountries(data);
            } catch (error) {
                console.error('Error fetching search results:', error);
            }
        })();
    }, [q]);

    return (
        <div className={style.container}>
            <Searchbar q={q} />
            <div>
                <b>{q}</b> 검색 결과
            </div>
            <CountryList countries={countries} />
        </div>
    );
}
