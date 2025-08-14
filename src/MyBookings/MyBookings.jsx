import React, { useState, useEffect } from "react";

const formatDate = (dateStr) => {
  if (!dateStr) return "N/A";
  const options = { year: "numeric", month: "long", day: "numeric" };
  const d = new Date(dateStr);
  return d.toLocaleDateString(undefined, options);
};

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    // Load bookings on mount
    const saved = JSON.parse(localStorage.getItem("bookings") || "[]");
    setBookings(saved);

    // Listen for storage changes (optional for SPA updates)
    const handleStorageChange = () => {
      const updated = JSON.parse(localStorage.getItem("bookings") || "[]");
      setBookings(updated);
    };
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <div className="container my-4">
      <h1>My Bookings</h1>
      {bookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        bookings.map((b, i) => {
          const center = b.center || b;
          const bookingDate = formatDate(b.bookingDate || b.date);
          const bookingTime = b.bookingTime || b.time || "N/A";

          return (
            <div key={i} className="border p-3 mb-3 rounded">
              <h3>{center["Hospital Name"] || "Unknown Hospital"}</h3>
              <p>
                {center.Address || "No address"},{" "}
                {center.City || "Unknown city"},{" "}
                {center.State || "Unknown state"}
              </p>
              <p>
                <strong>Date:</strong> {bookingDate}
              </p>
              <p>
                <strong>Time:</strong> {bookingTime}
              </p>
            </div>
          );
        })
      )}
    </div>
  );
};

export default MyBookings;
