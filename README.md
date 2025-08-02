# Mini Bhagavatam - Facebook-like Dashboard

A modern, responsive Facebook-style social media dashboard built with React and deployed on Firebase.

## 🌐 Live Demo

**Live URL:** [https://mysupernews.web.app](https://mysupernews.web.app)

## ✨ Features

- **Facebook-style UI**: Complete replica of Facebook's homepage design
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Interactive Components**:
  - Header with navigation and search
  - Left sidebar with menu and shortcuts
  - Main feed with post creator and sample posts
  - Right sidebar with contacts and suggestions
  - Interactive like, comment, and share buttons
- **Modern React**: Built with React 19 and functional components
- **Firebase Hosting**: Deployed on Google Firebase with global CDN

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Firebase CLI (for deployment)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/saivanamala714/minibhagavatam.git
cd minibhagavatam
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## 📁 Project Structure

```
src/
├── components/
│   ├── Header.js & Header.css          # Top navigation bar
│   ├── LeftSidebar.js & LeftSidebar.css # Left navigation menu
│   ├── MainFeed.js & MainFeed.css      # Central feed area
│   ├── PostCreator.js & PostCreator.css # Post creation component
│   ├── Post.js & Post.css              # Individual post component
│   └── RightSidebar.js & RightSidebar.css # Right sidebar with contacts
├── App.js                              # Main app component
├── App.css                             # Global app styles
├── index.js                            # App entry point
└── index.css                           # Global CSS reset
```

## 🛠 Available Scripts

### `npm start`
Runs the app in development mode at [http://localhost:3000](http://localhost:3000)

### `npm test`
Launches the test runner in interactive watch mode

### `npm run build`
Builds the app for production to the `build` folder

### `npm run eject`
**Note: This is a one-way operation!** Ejects from Create React App

## 🚀 Deployment

### Firebase Hosting

1. Install Firebase CLI:
```bash
npm install -g firebase-tools
```

2. Login to Firebase:
```bash
firebase login
```

3. Build the project:
```bash
npm run build
```

4. Deploy to Firebase:
```bash
firebase deploy --only hosting
```

## 🎨 Components Overview

### Header Component
- Facebook logo and branding
- Search bar functionality
- Navigation icons (Home, Friends, Watch, etc.)
- User profile and notification icons

### Left Sidebar
- User profile section
- Navigation menu (Friends, Groups, Marketplace, etc.)
- Shortcuts to favorite pages/groups

### Main Feed
- Post creation box with "What's on your mind?" prompt
- Sample posts with user information
- Interactive like, comment, and share buttons
- Responsive post layout

### Right Sidebar
- Sponsored content section
- Suggested groups and pages
- Contacts list with online status indicators

## 🔧 Technologies Used

- **React 19** - Frontend framework
- **CSS3** - Styling and animations
- **Firebase Hosting** - Deployment and hosting
- **Create React App** - Project bootstrapping
- **Git & GitHub** - Version control

## 📱 Responsive Design

The dashboard is fully responsive and adapts to different screen sizes:
- **Desktop**: Full layout with all sidebars visible
- **Tablet**: Optimized layout with adjusted spacing
- **Mobile**: Simplified layout with hidden sidebars for better mobile experience

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Sai Vanamala**
- GitHub: [@saivanamala714](https://github.com/saivanamala714)
- Email: saiv714@gmail.com

---

Built with ❤️ using React and Firebase