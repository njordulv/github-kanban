## GitHub Kanban Board

### Description

This project implements a Kanban board for viewing GitHub repository issues. It allows users to manage issues through a visual interface that categorizes issues into three columns based on their status: ToDo, In Progress, and Done. Users can drag and drop issues between columns to update their status and organize their workflow efficiently.

### Features

1. URL Input: Users can enter a GitHub repository URL to load all open issues.
2. Dynamic Issue Loading: Utilizes the GitHub API to fetch issues for a specified repository.
3. Kanban Columns: Issues are displayed in three columns:
4. ToDo: Contains new issues.
5. In Progress: Contains open issues that have an assignee.
6. Done: Contains closed issues.
7. Drag-and-Drop: Users can drag and drop issues between columns to update their status.
8. Persistence: The state of the board (column and order of issues) is saved across browser sessions.
9. Navigation Links: Users can access the GitHub profile of the repository owner and visit the repository directly from the app.

### Technologies

- Frontend library: React ^18
- State Management: Redux Toolkit, Redux Persist
- UI design system: Chakra UI
- Languages: TypeScript
- Libraries: React Beautiful DnD
- Testing: React Testing Library

### Installation

1. Clone the repository:

git clone https://github.com/njordulv/github-kanban.git
cd github-kanban

2. Install dependencies:

yarn install

3. Set up the GitHub API key:

- To ensure the app functions properly, you need to add a GitHub API key to the REACT_APP_GITHUB_API_KEY environment variable. Create a .env file in the project's root directory with the following content:
- REACT_APP_GITHUB_API_KEY = 'your_github_api_key_here'
- Replace 'your_github_api_key_here' with your actual GitHub API key. If you don't have a key, you can generate one in your GitHub account settings.

4. Start the application:

yarn start

5. Open your web browser and navigate to [http://localhost:3000](http://localhost:3000) to access the app.

### Usage

To use the application, enter the URL of a GitHub repository at the top of the page and press "Load Issues". The application will fetch and display the new open issues in the respective Kanban columns. Drag and drop issues to update their status and order.

### Configuration

No additional configuration is needed to run the application under normal circumstances. However, you may need to configure your GitHub API access token if you encounter rate limits.

### Contributing

Contributions are welcome! Please fork the repository and submit pull requests to the develop branch. For substantial changes, please open an issue first to discuss what you would like to change. Ensure to update tests as appropriate.

### License

This project is licensed under the [MIT License](LICENSE).

This project was bootstrapped with
[Create React App](https://github.com/facebook/create-react-app).
