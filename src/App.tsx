import React from 'react';
import Grid from '@mui/material/Grid';
import ContentView from './components/ContentView';
import TocComponent from './components/TOC';
import Header from './components/Header';

function App() {
  return (
    <div>
      <Header />
      <Grid container padding={2} spacing={2}>
        <Grid item xs={3}>
          <TocComponent />
        </Grid>
        <Grid item xs={9}>
          <ContentView />
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
