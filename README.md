# Interactive Table Demo Built with React

[View Live Demo](https://jpingr222.github.io/table-demo)

This project is a single page application which has a table to show survey data.
In this demo, the data is from [Stack Overflow Annual Developer Survey 2022](https://www.kaggle.com/datasets/dheemanthbhat/stack-overflow-annual-developer-survey-2022)

## Features

- Fixed column width for clean layout
- Different background color for the row you are pointing at, so you can easily
  browsing data
- Always on top headings, always know the cell title
- Only preview data in table, view detail data in a dialog box
- Use Pagination to only load part of the data

## Libraries

- create-react-app
- TypeScript
- styled-components

## Run the Project Locally

Clone this project

    git clone https://github.com/jpingr222/table-demo.git

Install dependencies

    npm install

Run the project

    npm start

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Test the Project

Run all tests in watch mode

    npm test

Run single test file

    npm test <filename>

## Folder Structure

All components and functions are in `/src`.

    /src
    ├── components
    │   ├── Button
    │   ├── Modal
    │   ├── Pagination
    │   └── Table
    │       └── TableBodyRow
    ├── data
    │   ├── survey_results_data_part.json
    │   └── survey_results_schema.json
    ├── types
    │   ├── index.ts
    │   ├── SurveyResult.ts
    │   ├── SurveySchema.ts
    │   └── Table.ts
    ├── utils
    │   ├── api.ts
    │   ├── dataTransformer.test.ts
    │   └── dataTransformer.ts
    ├── App.css
    ├── App.test.tsx
    ├── App.tsx
    ├── index.css
    └── index.tsx

- `/components` All components in this project, grouping by component
- `/data` Data for table content, one is for table head, another is table body
- `/types` Type definations
- `/utils` Helper functions e.g. function for api calls, api response
  transformers
