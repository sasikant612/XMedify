import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchMedicalCenters } from "../utils/api";
import HospitalCard from "../components/HospitalCard/HospitalCard";
import SearchBar from "../components/SearchBar/SearchBar";
import FAQs from "../components/Sections/FAQs/FAQs";
import DownloadApp from "../components/Sections/DownloadApp/DownloadApp";
import "bootstrap-icons/font/bootstrap-icons.css";

const Search = () => {
  const [params] = useSearchParams();
  const [centers, setCenters] = useState([]);
  const [loading, setLoading] = useState(true);

  const state = params.get("state");
  const city = params.get("city");

  useEffect(() => {
    if (state && city) {
      setLoading(true);
      fetchMedicalCenters(state, city).then((data) => {
        setCenters(data);
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [state, city]);

  return (
    <>
      <SearchBar />
      <div className="container my-4">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <h1>
              {centers.length} medical centers available in{" "}
              {city?.toLowerCase() || ""}
            </h1>

            {centers.length === 0 ? (
              <p>
                No medical centers found in {city}, {state}.
              </p>
            ) : (
              <ul>
                {centers.map((center) => (
                  <li key={center.id}>
                    <h3>{center["Hospital Name"]}</h3>
                    <div>
                      <HospitalCard data={center} />
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </div>

      <FAQs />
      <DownloadApp />
    </>
  );
};

export default Search;