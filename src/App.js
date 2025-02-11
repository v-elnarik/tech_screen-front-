// src/App.js
import React from "react";
import { Container, Typography, CssBaseline, Tabs, Tab, Box } from "@mui/material";
import ResultsTable from "./ResultsTable";
import QuestionsAdmin from "./QuestionsAdmin";

function App() {
  const [tabIndex, setTabIndex] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  return (
    <Container>
      <CssBaseline />
      <Typography variant="h4" align="center" gutterBottom>
        HR Панель
      </Typography>
      <Tabs value={tabIndex} onChange={handleTabChange} centered>
        <Tab label="Результаты тестирования" />
        <Tab label="Управление вопросами" />
      </Tabs>
      <Box mt={2}>
        {tabIndex === 0 && <ResultsTable />}
        {tabIndex === 1 && <QuestionsAdmin />}
      </Box>
    </Container>
  );
}

export default App;
