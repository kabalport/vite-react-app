//CountryItem.tsx
import style from "./CountryItem.module.css";
import { useNavigate } from "react-router-dom";

type CountryItemProps = {
    code: string;
    commonName: string;
    flagEmoji: string;
    flagImg: string;
    population: number;
    region: string;
    capital: string[];
};

const CountryItem = ({
                         code,
                         commonName,
                         flagEmoji,
                         flagImg,
                         population,
                         region,
                         capital
                     }: CountryItemProps) => {
    const nav = useNavigate();

    const onClickItem = () => {
        nav(`/country/${code}`);
    };

    return (
        <div onClick={onClickItem} className={style.container}>
            <img className={style.flag_img} src={flagImg} alt={`${commonName} flag`} />
            <div className={style.content}>
                <div className={style.name}>
                    {flagEmoji} {commonName}
                </div>
                <div>지역 : {region}</div>
                <div>수도 : {capital.join(", ")}</div>
                <div>인구 : {population.toLocaleString()}</div>
            </div>
        </div>
    );
};

export default CountryItem;
