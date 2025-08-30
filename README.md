# React Performance task

This project is a React application that visualizes CO2 emissions data by countries.  
Users can filter, search, sort countries, and view detailed yearly statistics with customizable columns.

## Features

- Fetch and display CO2 data (~100MB JSON)
- React Suspense with loading spinner
- Country list with name, population, ISO code
- Year selector with data highlight
- Search, filter, and sorting functionality
- Performance optimization with useMemo, useCallback, React.memo

## Performance Profiling

### Before Optimization

- Commit duration: ~119.1ms
- Render Duration (CountryTable): ~101.3ms
- Layout effects: <0.1 ms
- Passive effects: 0.3 ms
- Profiler Before:\
  <img width="771" height="205" alt="image" src="https://github.com/user-attachments/assets/a17729d7-ffcc-4aca-9c72-cc0c9d6e1889" />

### After Optimization (useMemo, useCallback, React.memo)
