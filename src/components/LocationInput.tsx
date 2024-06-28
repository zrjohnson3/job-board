// Custom input component for location search - this is a controlled component that calls the onLocationSelected callback whenever the input value changes.
import React, { useMemo, useState } from 'react'
import { forwardRef } from 'react'
import { Input } from './ui/input';
import citiesList from '../lib/cities-list';

interface LocationInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    onLocationSelected: (location: string) => void;
}

export default forwardRef<HTMLInputElement, LocationInputProps>(
    function LocationInput({ onLocationSelected, ...props }, ref) {

        const [locationSearchInput, setLocationSearchInput] = useState("");

        const cities = useMemo(() => {
            if (!locationSearchInput) return [];

            const searchWords = locationSearchInput.split(" ");

            return citiesList
                .map(
                    (city) => `${city.name}, ${city.subcountry}, ${city.country}`,
                )
                .filter((city) =>
                    city.toLowerCase().startsWith(searchWords[0].toLowerCase()) &&
                    searchWords.every((word) =>
                        city.toLowerCase().includes(word.toLowerCase()),
                    ),
                )
                .slice(0, 5)
        }, [locationSearchInput]);

        return (
            <div>
                <Input
                    ref={ref}
                    placeholder="Location"
                    {...props}
                    onChange={(e) => setLocationSearchInput(e.target.value)}
                    value={locationSearchInput}
                />
                <div className='absolute w-auto z-20 divide-y bg-slate-100 shadow-xl '>
                    {/* {JSON.stringify(cities)} */}
                    {locationSearchInput.trim() && (
                        <div>
                            {!cities.length && <p className='p-3'>No Results</p>}
                            {cities.map((city) => (
                                <button key={city} className='block w-full text-start p-2 z-auto border-b border-x'>
                                    {city}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

        )
    })
