import { useEffect, useState } from "react";
import {useNavigate, useParams} from "react-router-dom";
import { fetchCountry } from "../api.ts";
import style from "./Country.module.css";

// useParams의 반환 타입 정의
type Params = {
    code: string;
};

// Country 타입 정의
type CountryType = {
    code: string;
    commonName: string;
    officialName: string;
    flagEmoji: string;
    flagImg: string;
    capital: string[];
    region: string;
    googleMapURL: string;
};

export default function Country() {
    const params = useParams<Params>();
    const [country, setCountry] = useState<CountryType | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        // 즉시 실행 함수를 사용하여 비동기 처리
        (async () => {
            if (!params.code) {
                navigate('/naras');
                return;
            }
            try {
                const data = await fetchCountry(params.code);
                setCountry(data);
            } catch (error) {
                console.error('Error fetching country data:', error);
                // 에러 처리 로직을 추가할 수 있습니다.
            }
        })();
    }, [params.code, navigate]);

    if (!country) {
        return <div>Loading ...</div>;
    }

    return (
        <div className={style.container}>
            <div className={style.header}>
                <div className={style.commonName}>
                    {country.flagEmoji}&nbsp;{country.commonName}
                </div>
                <div className={style.officialName}>
                    {country.officialName}
                </div>
            </div>
            <img
                src={country.flagImg}
                alt={`${country.commonName}의 국기 이미지입니다`}
            />
            <div className={style.body}>
                <div>
                    <b>코드 :</b>&nbsp;{country.code}
                </div>
                <div>
                    <b>수도 :</b>&nbsp;{country.capital.join(", ")}
                </div>
                <div>
                    <b>지역 :</b>&nbsp;{country.region}
                </div>
                <div>
                    <b>지도 :</b>&nbsp;
                    <a target="_blank" href={country.googleMapURL}>
                        {country.googleMapURL}
                    </a>
                </div>
            </div>
        </div>
    );
}
