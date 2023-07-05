# Question Vault

## Introduction

Question Vault is a web platform designed to facilitate the exchange of knowledge and information through question and answer interactions. It provides users with a centralized hub to ask questions, receive answers, and engage in discussions on a wide range of topics. Whether you are seeking information, sharing your expertise, or simply exploring new ideas, Question Vault offers a collaborative environment to connect with a community of users from diverse backgrounds.

## Features

### For Visitors

- **Clear Value Proposition**: The homepage of Question Vault presents a user-friendly and visually appealing interface that effectively communicates the purpose and benefits of the platform.
- **Intuitive Registration**: Visitors can create an account quickly and easily through a straightforward registration process.
- **Robust Search Functionality**: A powerful search feature enables users to find relevant questions and answers by using keywords, categories, or tags.
- **Comprehensive Question Details**: Visitors can access in-depth information about selected questions, including the answers provided.

### For Registered Users

- **Personalized Dashboard**: Registered users have access to a personalized dashboard that offers a clear overview of their submitted questions, answers, and interactions.
- **Structured Q&A Format**: Users can submit questions in a clear and structured format, ensuring the information provided is organized and easy to understand.
- **Timely Notifications**: Registered users receive timely notifications about new answers, comments, or updates related to their questions or topics of interest.
- **Engage in Discussions**: Users can leave comments on questions and answers to provide additional insights or ask for clarifications, actively engaging in discussions.
- **Bookmark and Save**: Registered users can bookmark or save questions and answers for future reference and easy access.
- **Personalized Feed**: Users can follow specific topics of interest and have a personalized feed that displays relevant questions and answers.
- **Collaborative Editing**: Registered users can collaborate with others to edit or improve existing questions and answers, fostering a collective knowledge-building environment.
- **Voting System**: Users can upvote or downvote questions and answers to indicate their usefulness or relevance.
- **User Reputation**: User reputation and expertise are built based on contributions and interactions on the platform.
- **User Profile**: Each registered user has a dedicated profile showcasing their expertise, activity history, badges, and achievements.
- **Connect and Network**: Users can connect and network with other users, follow their profiles, and engage in professional discussions.
- **Multi-Language Support**: The platform supports multiple languages to facilitate global participation and diverse user interactions.

### For Administrators

- **Admin Panel**: Administrators have access to a secure and accessible admin panel for efficient moderation and content management.
- **User Management**: Administrators can effectively handle user accounts and their permissions.
- **Content Moderation**: Administrators can review and moderate questions, answers, comments, and user-reported content to maintain a positive and respectful community environment.
- **Metadata Management**: Administrators can manage categories, tags, and other metadata to ensure proper organization and searchability of questions and answers.
- **Analytics and Reporting**: Comprehensive analytics and reporting functionality provide insights into platform usage, trends, and user engagement.
- **Dispute Resolution**: Administrators have tools for managing and resolving disputes, handling abusive or inappropriate behavior, and ensuring platform integrity.

## Technologies Used

- Backend: Express.js
- Frontend: React

## Installation and Setup

To run Question Vault locally on your machine, follow these steps:

1. Clone the repository from GitHub: `git clone https://github.com/tnowad/question-vault.git`
2. Navigate to the project directory: `cd question-vault`
3. Make sure you have Docker and Docker Compose installed on your machine.
4. Copy the .env.example file to .env in `backend` by running the following command: `cp .env.example .env`
5. Open the .env file and configure the environment variables according to your setup and preferences.
6. Build and start the Docker containers using Docker Compose: `docker-compose up`
7. Access the backend container by running the following command in a separate terminal window: `docker-compose exec backend sh`
8. Once inside the backend container, generate the Prisma client by running: `prisma migrate dev`
9. The backend server and Prisma client will now be up and running.
10. Access the application in your web browser at http://localhost.

## Contribution

We welcome contributions to enhance and improve Question Vault. If you would like to contribute, please follow these guidelines:

1. Fork the repository on GitHub.
2. Create a new branch with a descriptive name: `git checkout -b feature/my-feature`.
3. Make changes and additions to the codebase.
4. Test your changes to ensure they work as intended.
5. Commit your changes: `git commit -am 'type(scope): commit message'`.
6. Push the branch to your forked repository: `git push origin feature/my-feature`.
7. Open a pull request on the main repository's branch explaining your changes.

## License

This project is licensed under the [MIT License](LICENSE).

## Contact

If you have any questions, suggestions, or feedback, please feel free to reach out to us at [tnowad@gmail.com](mailto:tnowad@gmail.com).
