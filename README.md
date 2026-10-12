# THINGS I KEEP SAYING

**21 Phrases From One Month of My Life**

Live website:
https://luyufan2026.github.io/cart/

## Project Overview

“Things I Keep Saying” is a personal data visualization project based on 21 phrases that I repeatedly used over the course of one month, from September 5 to October 5, 2026.

The project looks at repeated language as a form of personal data. Instead of using a large public dataset, I created a small dataset based on phrases connected to my everyday life, including school, relationships, smoking, entertainment, daily routines, and emotional reactions.

The goal is not only to show which phrases appear most frequently, but also to explore when they appear and how different types of language change over time.

## Dataset

The dataset contains 21 phrases.

Each phrase includes:

- phrase
- category
- note
- daily occurrence counts

The main categories are:

- School / Work
- Daily Life
- Smoking
- Relationships
- Entertainment
- Emotion / Inner World

The monthly total for each phrase is calculated automatically from the daily occurrence data rather than being stored separately.

The dataset is a personal reconstructed / self-tracked dataset and is intended as a creative visualization of language habits rather than a scientific sample.

## Visualization

The main visualization shows the phrases across a one-month timeline.

Visual variables include:

- **Circle size** = total number of times a phrase appeared during the month
- **Line thickness** = how many times the phrase appeared on a specific day
- **Dot size** = total activity for a category on a specific day
- **Color** = phrase category

A second visualization shows category activity across the month.

Together, the two visualizations show both individual phrase frequency and broader patterns in daily language.

## Interaction

The website includes several interactive features:

- Hover over a phrase to highlight its timeline
- Click a phrase to keep it selected
- Filter phrases by category
- Hover over category data points to view daily activity
- View phrase frequency, category, notes, and active days
- Reset the visualization to view all data

The interactions are designed to make relationships between phrase, date, frequency, and category easier to understand.

## Technology

This project was built with:

- HTML
- CSS
- JavaScript
- Chart.js
- SVG

Chart.js is used for the quantitative charts, while SVG is used for the curved phrase timeline and connection lines.

The project is published with GitHub Pages.

## File Structure

- `index.html` — page structure
- `style.css` — visual styling and responsive layout
- `data.js` — phrase data and daily occurrence data
- `script.js` — data processing, interaction, SVG generation, and Chart.js setup
- `vendor/chart.umd.min.js` — local Chart.js library
- `README.md` — project documentation

## Design Process

I initially explored several ways of visualizing the dataset, including bar charts, architectural diagrams, and spatial visualizations.

During the design process, I realized that the architectural approach was visually interesting but made the data less important.

I changed the final direction so that the phrases, frequency, time, and categories became the main focus.

The final design is influenced by hand-drawn research diagrams, personal archives, data journals, and annotated information graphics.

## External Resources and AI Tools

### Chart.js

Chart.js was used to create the quantitative data visualizations.

Website:
https://www.chartjs.org/

### ChatGPT

I used ChatGPT during the concept development and design process.

It helped me with:

- interpreting the assignment requirements
- organizing the dataset structure
- developing different visualization ideas
- refining the relationship between phrase frequency, time, and category
- debugging and explaining JavaScript / Chart.js concepts
- developing interaction ideas
- reviewing the visual hierarchy of the project

Example prompts included:

- “How can I visualize the 21 phrases I say most often in one month?”
- “How can I make phrase frequency, date, and category visible in the same visualization?”
- “How can I make this project more focused on data instead of the architectural design?”
- “How can I use Chart.js together with a custom SVG timeline?”

### Cursor

I used Cursor as my code editor and AI-assisted development tool.

Cursor was used to help:

- write and organize HTML, CSS, and JavaScript
- implement Chart.js
- build SVG timeline interactions
- create category filtering
- refine hover and click interactions
- debug layout and JavaScript issues
- organize the project files

AI-generated code was reviewed and modified during the development process rather than being used without changes.

## Reflection

This project made me think about personal language as measurable data.

The phrases themselves are ordinary, but when they are collected, counted, categorized, and placed on a timeline, they begin to form a portrait of a specific period of my life.

The final visualization is meant to function as both a data visualization and a personal archive.
