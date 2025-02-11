// src/ResultsTable.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Typography, CircularProgress } from "@mui/material";
import Filters from "./Filters.js";


const ResultsTable = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({});

  const API_URL = "http://127.0.0.1:8000";

  const fetchResults = async (filterParams = {}) => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/results`, {
        params: filterParams,
      });
      const dataWithId = response.data.map((item) => ({
        ...item,
        id: item.id,
      }));
      setResults(dataWithId);
    } catch (err) {
      setError(err);
      console.error("Ошибка при получении данных:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResults(filters);
  }, [filters]);

  const handleFilter = (newFilters) => {
    setFilters(newFilters);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Typography color="error">Ошибка загрузки данных: {error.message}</Typography>;
  }

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "user_id", headerName: "User ID", width: 130 },
    { field: "q1", headerName: "Q1", width: 130 },
    { field: "q2", headerName: "Q2", width: 130 },
    { field: "q3", headerName: "Q3", width: 130 },
    { field: "score", headerName: "Score", width: 90 },
    {
      field: "timestamp",
      headerName: "Timestamp",
      width: 200,
      valueFormatter: (params) => new Date(params.value).toLocaleString(),
    },
  ];

  return (
    <Box mt={4} mx={2}>
      <Typography variant="h5" gutterBottom>
        Результаты тестирования
      </Typography>
      <Filters onFilter={handleFilter} />
      <Box style={{ height: 500, width: "100%" }}>
        <DataGrid
          rows={results}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10, 20, 50]}
          disableSelectionOnClick
        />
      </Box>
    </Box>
  );
};

export default ResultsTable;
