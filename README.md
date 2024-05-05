## Weekday Job Portal Assignment

### Prerequisites

- Node JS - v18 or above

### Run locally

- Navigate to Project Directory in terminal.
- Run `npm i` to install dependencies.
- Create a `.env` file at the root of the project as per the `.env.example` file, Value should be https://api.weekday.technology
- Run `npm run dev` to start the development server.
- Application should be running in http://localhost:3000

### Tech stack

- ReactJs
- Redux
- CSS
- Material UI

### Requirements

1. Job Cards: Each job listing should be displayed as a card containing the following information:

   - Job title
   - Company name
   - Location
   - Job description (limited to a certain number of characters with an option to expand)
   - Experience required
   - Apply button/link

2. Filters: Implement filters to allow users to refine the job listings based on:

   - Min experience
   - Company name
   - Location
   - Remote/on-site
   - Tech stack
   - Role
   - Min base pay

3. Infinite Scroll: Implement infinite scroll to load additional job listings as the user scrolls down the page. The platform should fetch and display more jobs automatically without requiring the user to click on a "Load More" button.

4. Responsive Design: Ensure that the platform is responsive and works well on different screen sizes, including mobile devices (Optional)

### Some Remarks

- Some of the search filters for eg: `Tech stack`, `No of Employees` - is not implemented as the API response was not having data to filter it. Rest of the filters are implemented.

- Only the Timestamp in Job card is hardcoded as the data was unavailable in API response.