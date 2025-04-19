<div align="center">
  <img src="/public/arena-pulse-logo.png" alt="Arena Pulse Logo" width="200" />
  <h1>Arena Pulse</h1>
  <p>AI-powered stadium management system for modern venues</p>
  
  <p>
    <a href="#features">Features</a> •
    <a href="#tech-stack">Tech Stack</a> •
    <a href="#ai-capabilities">AI Capabilities</a> •
    <a href="#getting-started">Getting Started</a> •
    <a href="#internationalization">Internationalization</a> •
    <a href="#screenshots">Screenshots</a>
  </p>
  
  <p>
    <img src="https://img.shields.io/badge/Next.js-13.5+-000000?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" />
    <img src="https://img.shields.io/badge/React-18.0+-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
    <img src="https://img.shields.io/badge/Tailwind-3.0+-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind" />
    <img src="https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  </p>
</div>

## 🌟 Overview

**Arena Pulse** is a comprehensive stadium management system designed to monitor, analyze, and optimize operations in large venues like sports stadiums. The platform leverages AI and real-time analytics to provide actionable insights for stadium operators, enhancing safety, efficiency, and the overall spectator experience.

## ✨ Features

### 🏟️ Stadium Monitoring
- **Real-time crowd density heatmaps** with AI-powered analytics
- **Gate management** with automated control systems
- **Interactive stadium blueprint** with zone-specific insights

### 📹 Video Surveillance
- **AI-powered camera feeds** with anomaly detection
- **Sentiment analysis** of crowd emotions
- **Lost person tracking** capabilities

### 🚗 Parking Management
- **Real-time parking capacity** monitoring
- **AI-driven recommendations** for traffic flow optimization
- **Entry/exit operations** management

### 🔮 Predictive Analytics
- **Crowd flow predictions** to anticipate bottlenecks
- **Resource allocation recommendations**
- **Custom prediction models** with adjustable parameters

### 🌐 Multilingual Support
- **Full Arabic localization** with RTL layout support
- **Seamless language switching** throughout the application

## 🛠️ Tech Stack

- **Frontend Framework**: Next.js 13+ (App Router)
- **UI Library**: React 18+
- **Styling**: Tailwind CSS with shadcn/ui components
- **Language**: TypeScript
- **State Management**: React Context API
- **Data Visualization**: Recharts
- **Internationalization**: Custom language context

## 🤖 AI Capabilities

Arena Pulse integrates advanced AI throughout the platform:

### Computer Vision
- Crowd density analysis through camera feeds
- Anomaly detection for unusual behavior
- Lost person tracking capabilities
- Sentiment analysis of crowds

### Predictive Analytics
- Crowd flow predictions to anticipate bottlenecks
- Resource allocation recommendations
- Parking optimization suggestions
- Event attendance forecasting

### Real-time Processing
- Audio analysis for sentiment and anomaly detection
- Speech recognition for detecting keywords in crowds
- Pattern recognition for identifying potential security issues

## 🚀 Getting Started

### Prerequisites

- Node.js 18.0+
- npm or yarn

### Installation

1. Clone the repository
\`\`\`bash
git clone https://github.com/your-username/arena-pulse.git
cd arena-pulse
\`\`\`

2. Install dependencies
\`\`\`bash
npm install
# or
yarn install
\`\`\`

3. Run the development server
\`\`\`bash
npm run dev
# or
yarn dev
\`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Environment Variables

Create a `.env.local` file in the root directory with the following variables:

\`\`\`
NEXT_PUBLIC_API_URL=your_api_url
\`\`\`

## 🌍 Internationalization

Arena Pulse supports both English and Arabic languages with full RTL layout support for Arabic.

### Language Switching

The language can be switched using the language switcher component in the header. The application will automatically adjust the layout direction (LTR/RTL) based on the selected language.

### Adding New Languages

To add a new language:

1. Add the language to the `Language` type in `contexts/language-context.tsx`
2. Add translations for the new language in the `translations` object
3. Update the language switcher component to include the new language

## 📸 Screenshots

<div align="center">
  <img src="/public/screenshots/dashboard.png" alt="Dashboard" width="80%" />
  <p><em>Main Dashboard with Real-time Analytics</em></p>
  
  <img src="/public/screenshots/crowd-density.png" alt="Crowd Density" width="80%" />
  <p><em>Crowd Density Heatmap</em></p>
  
  <img src="/public/screenshots/camera-feeds.png" alt="Camera Feeds" width="80%" />
  <p><em>AI-Powered Camera Surveillance</em></p>
  
  <img src="/public/screenshots/parking.png" alt="Parking Management" width="80%" />
  <p><em>Parking Management System</em></p>
</div>

## 📁 Project Structure

\`\`\`

arena-pulse/
├── app/                  # Next.js App Router pages
│   ├── ai-predictions/   # AI predictions page
│   ├── cameras/          # Camera surveillance page
│   ├── gate-overview/    # Gate management page
│   ├── parking-management/ # Parking management page
│   └── ...
├── components/           # React components
│   ├── ai-predictions/   # AI prediction components
│   ├── cameras/          # Camera components
│   ├── dashboard/        # Dashboard components
│   ├── gate-overview/    # Gate management components
│   ├── parking-management/ # Parking components
│   └── ...
├── contexts/             # React contexts
│   └── language-context.tsx # Internationalization context
├── public/               # Static assets
└── 

\`\`\`

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgements

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Recharts](https://recharts.org/)
- [Lucide Icons](https://lucide.dev/)
