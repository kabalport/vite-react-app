import { useSearchParams } from "react-router-dom";

export default function Search() {
    const [searchParams] = useSearchParams();

    return <div>Search {searchParams.get("q")}</div>;
}