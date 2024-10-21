"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function Main() {
    return (
        <div className="py-4 bg-slate-200">
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
    const searchQuery = searchParams.get('search') || '';

    const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value;
        router.push({
            pathname: router.pathname,
            query: { ...Object.fromEntries(searchParams.entries()), search: value },
        });
    };

    return (
        <div className="flex items-center justify-between">
            <input
                type="text"
                onChange={handleInputChange}
                name="search"
                className="px-7 py-3 outline-none"
                placeholder="Search for a country ..."
                defaultValue={searchQuery}
            />
        </div>
    );
}

function MainContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const searchQuery = searchParams.get('search') || '';
    const [data, setData] = useState<any[]>([]);
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
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [searchQuery]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            {data.length === 0 ? (
                <p>No results found.</p>
            ) : (
                <ul>
                    {data.map((item) => (
                        <li key={item.id}>{item.name}</li>
                    ))}
                </ul>
            )}
        </div>
    );
}