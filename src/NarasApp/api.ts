// api/api.ts
import axios from "axios";

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

// DetailedCountry 타입 정의
type DetailedCountry = Country & {
    officialName: string;
    googleMapURL: string;
};

export async function fetchCountries(): Promise<Country[]> {
    try {
        const response = await axios.get<Country[]>("https://naras-api.vercel.app/all");
        return response.data;
    } catch (e) {
        return [];
    }
}

export async function fetchSearchResults(q: string): Promise<Country[]> {
    try {
        const response = await axios.get<Country[]>(`https://naras-api.vercel.app/search?q=${q}`);
        return response.data;
    } catch (e) {
        return [];
    }
}

export async function fetchCountry(code: string): Promise<DetailedCountry | null> {
    try {
        const response = await axios.get<DetailedCountry>(`https://naras-api.vercel.app/code/${code}`);
        return response.data;
    } catch (e) {
        return null;
    }
}
