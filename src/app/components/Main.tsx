"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { Loader } from "lucide-react";

export default function Main() {
  return (
    <div className="py-4 bg-main dark:bg-main">
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-4">
          <MainHeader />
          <MainContent />
        </div>
      </div>
    </div>
  );
}

function MainHeader() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search") || "";

  const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;

    const params = new URLSearchParams(searchParams.toString());
    params.set("search", value);

    router.push(`${window.location.pathname}?${params.toString()}`);
  };

  return (
    <div className="flex items-center justify-between">
      <input
        type="text"
        onChange={handleInputChange}
        name="search"
        className="text-black dark:text-[#fff] bg-background px-7 py-3 outline-none"
        placeholder="Search for a country ..."
        defaultValue={searchQuery}
      />
    </div>
  );
}

function MainContent() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/countries?search=${searchQuery}`);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchQuery]);

  if (loading)
    return (
      <div className="self-center">
        <Loader className="animate-spin" />
      </div>
    );
  if (error) return <div>Error: {error}</div>;
  interface Country {
    name: string;
    topLevelDomain: string[];
    alpha2Code: string;
    alpha3Code: string;
    callingCodes: string[];
    capital: string;
    altSpellings: string[];
    subregion: string;
    region: string;
    population: number;
    latlng: [number, number];
    demonym: string;
    area: number;
    timezones: string[];
    borders?: string[];
    nativeName: string;
    numericCode: string;
    flags: {
        svg: string;
        png: string;
    };
    currencies: {
        code: string;
        name: string;
        symbol: string;
    }[];
    languages: {
        iso639_1: string;
        iso639_2: string;
        name: string;
        nativeName: string;
    }[];
    translations: {
        [key: string]: string;
    };
    flag: string;
    regionalBlocs?: {
        acronym: string;
        name: string;
    }[];
    cioc?: string;
    independent: boolean;
}

  return (
    <div>
      {data.length === 0 ? (
        <p>No results found.</p>
      ) : (
        <ul className="grid grid-cols-2 gap-4 md:grid-cols-4 sm:grid-cols-3">
          {data.map((item: Country) => (
            <li
              key={item.name}
              className="bg-[#fff] flex flex-col dark:bg-background"
            >
              <div className="w-full">
                <Image
                  width={100}
                  height={100}
                  alt="Country Image"
                  className="w-full"
                  src={item.flag}
                />
              </div>
              <div className="p-4">
                <h1 className="mb-3 text-xl">{item.name}</h1>
                <div className="flex flex-col gap-2">
                  <h3 className="text-sm">population: {item.population}</h3>
                  <h3 className="text-sm">region: {item.region}</h3>
                  <h3 className="text-sm">capital: {item.capital}</h3>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
