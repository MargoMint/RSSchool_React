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

1. Sorting countries by population.
   Commit Duration: 109.2 ms
   Render Duration (CountryTable): ~89.4 ms
   Description: When sorting, the entire table of countries is recalculated and redrawn.
   <img width="688" height="200" alt="image" src="https://github.com/user-attachments/assets/d2b5d5a5-793c-47d3-b098-395c2e259b57" />
   <img width="693" height="153" alt="image" src="https://github.com/user-attachments/assets/3fbf8142-f1ff-422e-8d9f-743446c16959" />

2. Searching country by name.
   Commit Duration: ~108.2 ms
   Render Duration (CountryTable): ~90.2 ms
   Description: When you enter each character in the search, the table is fully rendered.
   <img width="690" height="197" alt="image" src="https://github.com/user-attachments/assets/bc431afb-916a-41a8-815f-72545684cb6f" />
   <img width="690" height="145" alt="image" src="https://github.com/user-attachments/assets/9553350d-dbba-4e0c-ae42-43fe098ea9e7" />

3. Changing year and re-rendering data.
   Commit Duration: ~117 ms
   Render Duration (CountryTable): ~98.5 ms
   Description: When the year changes, all the changed values are displayed again.
   <img width="692" height="206" alt="image" src="https://github.com/user-attachments/assets/b96f0ece-034a-48f9-8bb0-f4e1c243bbb6" />
   <img width="701" height="163" alt="image" src="https://github.com/user-attachments/assets/f97b9c68-218b-4c18-a2c5-0082a28b6625" />

### After Optimization (useMemo, useCallback, React.memo)

1. Sorting countries by population.
   Commit Duration: 192.3 ms
   Render Duration (CountryTable): ~20.6 ms
   Description: When sorting, the entire table of countries is recalculated and redrawn.
   <img width="690" height="203" alt="image" src="https://github.com/user-attachments/assets/0b08815c-6431-4f55-b6f6-634c33ca1be5" />
   <img width="697" height="454" alt="image" src="https://github.com/user-attachments/assets/179a5f08-627b-4332-b6a2-e81559595f05" />

2. Searching country by name.
   Commit Duration: ~181.3 ms
   Render Duration (CountryTable): ~19.5 ms
   Description: When you enter each character in the search, the table is fully rendered.
   <img width="691" height="204" alt="image" src="https://github.com/user-attachments/assets/b940bdc5-e18e-4a33-bb1b-cac42ad21ea1" />
   <img width="692" height="640" alt="image" src="https://github.com/user-attachments/assets/8c26ac06-6c35-4f5d-99cc-0c22572ce0cd" />

3. Changing year and re-rendering data.
   Commit Duration: ~185.8 ms
   Render Duration (CountryTable): ~19.4 ms
   Description: When the year changes, all the changed values are displayed again.
   <img width="695" height="202" alt="image" src="https://github.com/user-attachments/assets/173f9177-7fd8-4611-a94f-a60c9f59a77a" />
   <img width="690" height="593" alt="image" src="https://github.com/user-attachments/assets/0f8e42a6-5c01-4109-a320-ea1900e05e75" />
