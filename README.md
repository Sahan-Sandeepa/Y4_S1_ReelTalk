# Family-Oriented Social Networking Platform with Movie Streaming

A React-based social networking platform integrated with movie streaming, designed to strengthen family connections within Sri Lankan households. This platform provides culturally relevant, family-oriented features with a focus on safe and controlled media consumption. The project aims to promote family engagement, offering users a space to interact, share experiences, and enjoy family-friendly content.

Additionally, a machine learning model has been integrated into the platform to ensure safe communication within family groups by detecting and filtering inappropriate language.

## Key Features

- **Family-Oriented Social Networking**: Facilitates a cohesive user experience with features specifically designed for family members. Users can share content, communicate, and interact in a family-safe environment.
  
- **Movie Streaming**: Provides access to culturally relevant, family-friendly movies and TV shows. Content is carefully curated to ensure it aligns with family values.
  
- **Parental Controls**: Enables parents to monitor and filter content to ensure safe consumption for younger audiences. Parents can set content restrictions and receive activity reports.
  
- **Bad Word Detection**: Implements a **machine learning model** built with Python and a **RandomForest algorithm** to detect and filter inappropriate language, ensuring a safe and respectful communication environment.
  
- **Activity Monitoring and Reporting**: Tracks user interactions and engagement within family groups, providing reports for parents to manage the activity on the platform.

## Tech Stack

### Frontend
- **React**: A JavaScript library for building user interfaces, allowing the development of interactive and dynamic web pages.
- **Vite**: A next-generation, fast build tool for modern web projects, improving the development experience with instant hot reloading and optimized builds.
- **Material UI (MUI)**: A popular React UI framework that provides pre-designed, customizable components to create an aesthetically pleasing and functional UI.

### Backend
- **Node.js**: A runtime environment for executing JavaScript code server-side, allowing us to build scalable and efficient backend services.
- **Express.js**: A minimal and flexible Node.js web application framework used to set up routes, handle HTTP requests, and manage server-side logic.

### Machine Learning
- **Python**: The core language for implementing the **RandomForest algorithm** used for detecting inappropriate language in user interactions. This ensures the safety of communication in the platform.
- **Scikit-learn**: A Python library used to implement and train the machine learning model for language detection.

### State Management
- **Redux Toolkit**: A modern approach to state management in React applications, providing an efficient way to manage global state and side effects.
  
### Real-time Communication
- **Socket.io-client**: A library for enabling real-time, bidirectional communication between clients and servers, facilitating instant notifications and chat functionality.

### Utilities
- **Lodash**: A JavaScript utility library that helps with handling arrays, objects, and functions more efficiently.
- **Framer Motion**: A popular React animation library for creating smooth transitions and interactive animations.
- **React Helmet**: A library used for managing changes to the document head, such as meta tags, to improve SEO and accessibility.

### Charting
- **Chart.js & react-chartjs-2**: Libraries for rendering interactive and responsive charts and graphs for visualizing platform usage and user engagement.

### Date Management
- **dayjs** and **moment**: JavaScript libraries for parsing, validating, and manipulating dates, ensuring accurate date handling across the platform.

## Research

The project is backed by qualitative research conducted to analyze family dynamics and digital usage patterns within Sri Lankan households. The research aimed to address societal challenges caused by digital media consumption and explore technological solutions tailored to cultural contexts. Key aspects of the research included:

- **Parental Control and Content Management**: Understanding how parents manage their children's media consumption and how to integrate these controls into the platform.
- **Machine Learning for Content Moderation**: Exploring the use of machine learning to detect and filter inappropriate content, ensuring a safe space for family communication.

## Installation and Setup

### Steps to Get Started

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Sahan-Sandeepa/Y4_S1_ReelTalk/tree/main
   cd Y4_S1_ReelTalk
2. **Install dependencies: After cloning the repository, install the required dependencies using npm:**
   ```bash
   npm install
3. **Run the development server: Start the development server to run the application locally:**
   ```bash
   npm run build
