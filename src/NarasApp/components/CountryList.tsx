//CountryList.tsx
import CountryItem from "./CountryItem";
import style from "./CountryList.module.css";

// Country 타입 정의
type Country = {
    code: string;
    commonName: string;
    flagEmoji: string;
    flagImg: string;
    population: number;
    region: string;
    capital: string[];
};

type CountryListProps = {
    countries: Country[];
};

const CountryList = ({ countries }: CountryListProps) => {
    return (
        <div className={style.container}>
            {countries.map((country) => (
                <CountryItem key={country.code} {...country} />
            ))}
        </div>
    );
};

CountryList.defaultProps = {
    countries: [],
};

export default CountryList;
