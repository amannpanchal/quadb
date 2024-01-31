import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const MovieDetails = ({ movie }) => {
    const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    movieName: "",
    name: "",
    email: "", 
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("bookingData", JSON.stringify(formData));
    setFormData({
      movieName: "",
      name: "",
      email: ""
    });
    alert('Ticket booked')
    navigate('/')
  };

  return (
    <div>
      {!showForm ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <h1> Movie Details</h1>
            <img
              className="movie-image"
              src={movie?.show?.image?.medium}
              alt={movie?.show?.name}
            />

            <div>
              <strong>Name :</strong> {movie?.show?.name}
            </div>
            <div>
              <strong>Runtime:</strong> {movie?.show?.runtime} minutes
            </div>
            <div>
              <strong>Premiered:</strong> {movie?.show?.premiered}
            </div>

            <p dangerouslySetInnerHTML={{ __html: movie?.show?.summary }} />

            <div>
              <strong>Official Site:</strong>{" "}
              <Link href={movie?.show?.officialSite}>
                {movie?.show?.officialSite}
              </Link>
            </div>
          </div>

          <button  style = {{ margin : "30px"}}
            onClick={() => {
              setShowForm(!showForm);
            }}
          >
            Book
          </button>
        </div>
      ) : (
        <div>
          <h1
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "20px",
            }}
          >
            Book Movie Ticket
          </h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="movieName"
              value={movie?.show?.name}
              placeholder="Movie"
            />
            <br />

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name here ...."
            />

            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email here...."
            />
            <br />

            <button type="submit">Book Ticket</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default MovieDetails;
