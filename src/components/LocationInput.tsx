// Custom input component for location search - this is a controlled component that calls the onLocationSelected callback whenever the input value changes.
import React, { useMemo, useState } from 'react'
import { forwardRef } from 'react'
import { Input } from './ui/input';
import citiesList from '../lib/cities-list';

interface LocationInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    onLocationSelected: (location: string) => void;
}

// LocationInput component that takes an onLocationSelected callback prop and calls it whenever the input value changes.
export default forwardRef<HTMLInputElement, LocationInputProps>(
    function LocationInput({ onLocationSelected, ...props }, ref) {

        // State Variables
        const [locationSearchInput, setLocationSearchInput] = useState("");
        const [hasFocus, setHasFocus] = useState(false);

        // Memoized cities list
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
                    placeholder="Search for a city"
                    type='search'
                    {...props}
                    onChange={(e) => setLocationSearchInput(e.target.value)}
                    onFocus={() => setHasFocus(true)}
                    onBlur={() => setHasFocus(false)}
                    value={locationSearchInput}
                />
                <div className='absolute w-auto z-20 divide-y bg-slate-100 shadow-xl '>
                    {/* {JSON.stringify(cities)} */}
                    {locationSearchInput.trim() && hasFocus && (
                        <div>
                            {!cities.length && <p className='p-3'>No Results</p>}
                            {cities.map((city) => (
                                <button
                                    key={city}
                                    className='block w-full text-start p-2 z-auto border-b border-x'
                                    onMouseDown={(e) => {
                                        e.preventDefault();
                                        onLocationSelected(city);
                                        // Set the input value to the selected city (for display purposes) 
                                        // setLocationSearchInput(city);
                                        setLocationSearchInput(""); // Clear the input value after selecting a city because we dispalying values below the input
                                    }}
                                >
                                    {city}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

        )
    })
