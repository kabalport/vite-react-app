import { useEffect, useState, ChangeEvent, KeyboardEvent } from "react";
import style from "./Searchbar.module.css";
import { useNavigate } from "react-router-dom";

type SearchbarProps = {
    q: string;
};

const Searchbar = ({ q }: SearchbarProps) => {
    const [search, setSearch] = useState<string>(q);
    const nav = useNavigate();

    useEffect(() => {
        setSearch(q);
    }, [q]);

    const onChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onClickSearch();
        }
    };

    const onClickSearch = () => {
        if (search !== "") {
            nav(`/search?q=${search}`);
        }
    };

    return (
        <div className={style.container}>
            <input
                value={search}
                onKeyDown={onKeyDown}
                onChange={onChangeSearch}
                placeholder="검색어를 입력하세요..."
            />
            <button onClick={onClickSearch}>검색</button>
        </div>
    );
};

export default Searchbar;
