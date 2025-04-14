import React, { useEffect, useState } from "react";
import axios from "axios";

interface Country {
  name: {
    common: string;
  };
  capital?: string[];
  region: string;
  population: number;
  flags: {
    png: string;
  };
}

const App: React.FC = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    axios
      .get<Country[]>("https://restcountries.com/v3.1/all")
      .then((response) => {
        setCountries(response.data.slice(0, 6)); // Display first 6 countries
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching countries:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-center mb-6">
        🌍 Country Information
      </h1>

      {loading ? (
        <p className="text-center text-gray-600">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {countries.map((country, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition"
            >
              <img
                src={country.flags.png}
                alt={`Flag of ${country.name.common}`}
                className="h-32 w-full object-contain mb-4"
              />
              <h2 className="text-lg font-semibold mb-1">
                {country.name.common}
              </h2>
              <p className="text-sm text-gray-700 mb-1">
                Capital: {country.capital ? country.capital[0] : "N/A"}
              </p>
              <p className="text-sm text-gray-700 mb-1">
                Region: {country.region}
              </p>
              <p className="text-sm text-gray-700">
                Population: {country.population.toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
