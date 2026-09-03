# 🌱 AI Plant Doctor

![AI Plant Doctor](https://img.shields.io/badge/Status-Active-brightgreen)
![React](https://img.shields.io/badge/React-19.1.1-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue)
![Vite](https://img.shields.io/badge/Vite-6.2-purple)

### 🌐 Live Demo
Check out the live project here: [https://ai-plant-doctore.onrender.com](https://ai-plant-doctore.onrender.com)

**AI Plant Doctor** is an intelligent botanical health and diagnosis web application. It serves as your personal botanist, helping you identify plant diseases, track your plant's recovery, calculate care requirements, and chat with an AI assistant.

## ✨ Features

- **🔍 Flagship AI Scanner**: Diagnose plant issues instantly by uploading a photo or taking a picture.
- **🏥 Botanical Sickbay**: A dedicated hospital & recovery tracker for your ailing plants. Keep track of watering, medication, and recovery progress.
- **📖 Plant Pathology Encyclopedia**: An extensive database of common plant diseases, their symptoms, and treatment protocols.
- **🧮 Care Calculators**: Precision tools to calculate optimal light, watering schedules, and soil mix ratios for different types of plants.
- **💬 Live AI Botanist Chat**: Get instant, personalized consultation and care advice from our AI Botanist.
- **❓ Botanical FAQs**: Quick answers to the most common plant care questions.

## 🛠️ Tech Stack

- **Core Framework**: [React](https://react.dev/) (v19)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animations**: Canvas Confetti

## 🚀 Getting Started

Follow these steps to set up the project locally on your machine.

### Prerequisites

- [Node.js](https://nodejs.org/en/) (v18 or higher recommended)
- `npm` or `yarn` installed

### Installation & Running

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd AI-Plant-Doctore-main
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   Open `http://localhost:5173` (or the URL provided in your terminal) to view the app in the browser.

## 📂 Project Structure

```text
.
├── components/          # Reusable UI components and main sections
│   ├── sections/        # Main feature sections (Scanner, Sickbay, etc.)
│   ├── Navbar.tsx       # Navigation component
│   ├── Footer.tsx       # Footer component
│   └── Toast.tsx        # Toast notification system
├── App.tsx              # Root React component containing the main layout
├── constants.tsx        # Hardcoded data and initial states
├── types.ts             # TypeScript interface definitions
├── index.html           # Main HTML entry point
├── index.tsx            # React entry point
└── package.json         # Project metadata and dependencies
```

## 🤝 Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request if you'd like to improve the app.

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
