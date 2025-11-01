import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import MovieList from "../components/movieList";
import Spinner from "../components/spinner";
import { TextField, Container, Typography } from "@mui/material";
import { searchMovies } from "../api/tmdb-api";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const { data, isLoading } = useQuery({
    queryKey: ["searchMoives", { query }],
    queryFn: searchMovies,
    enabled: !!query,
  });
  

  return (
    <Container sx={{ mt: 3 }}>
      <Typography variant="h5" gutterBottom>Search Movies</Typography>
      <TextField
        label="Search for a movie..."
        fullWidth
        variant="outlined"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        sx={{ mb: 3 }}
      />
      {isLoading && <Spinner />}
      {data?.results && <MovieList movies={data.results} />}
    </Container>
  );
}
