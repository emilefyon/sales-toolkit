# Sales Toolkit

<p align="center">
  <img src="public/favicon.svg" alt="Sales Toolkit Logo" width="100" height="100" />
</p>

<p align="center">
  A modern, intuitive suite of data cleaning and formatting tools designed for sales professionals.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Vue.js-3.3.4-42b883" alt="Vue 3.3.4" />
  <img src="https://img.shields.io/badge/Tailwind-3.3.3-38bdf8" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Vite-4.4.9-646cff" alt="Vite 4.4.9" />
</p>

<p align="center">
  <a href="https://github.com/emilefyon/sales-toolkit" target="_blank">
    <strong>📂 GitHub Repository: github.com/emilefyon/sales-toolkit</strong>
  </a>
</p>

<p align="center">
  This is an open-source project! We welcome contributions, feedback, and suggestions.<br>
  Feel free to open issues, submit pull requests, or fork the repository to create your own version.
</p>

## ✨ Features

Sales Toolkit offers a collection of powerful, easy-to-use tools to help sales teams clean, format, and standardize their data:

### 📱 Phone Number Cleaner
- Standardize phone numbers to E.164 format
- Add leading apostrophes for Excel compatibility
- Configure country codes and default regions
- Parse international formats with libphonenumber-js

### 👤 Name Formatter
- Format names in Title Case, UPPERCASE, or Last, First format
- Intelligently handle name prefixes and honorifics
- Process compound last names correctly
- Support batch processing for multiple names

### 🔤 Text Tools
- Transform case (lowercase, uppercase, title case)
- Remove duplicates from lists
- Sort lines alphabetically
- Trim whitespace
- Count and number lines
- Process batch operations quickly and efficiently

## 🚀 Live Demo

Access the Sales Toolkit at: [https://sales-toolkit-production.up.railway.app](https://sales-toolkit-production.up.railway.app)

## 🔧 Installation

Clone the repository and install dependencies:

```bash
# Clone the repository
git clone https://github.com/yourusername/sales-toolkit.git
cd sales-toolkit

# Install dependencies
npm install

# Start the development server
npm run dev
```

## 💻 Usage

1. **Open the application** in your browser at `http://localhost:5173/`
2. **Select a tool** from the sidebar navigation
3. **Input your data** in the provided text area
4. **Configure options** as needed for your specific task
5. **View the processed output** in real-time
6. **Copy the results** to clipboard with one click

## 🛠️ Technology Stack

- **Frontend Framework**: Vue.js 3 with Composition API
- **State Management**: Pinia
- **Routing**: Vue Router
- **Styling**: Tailwind CSS with custom design system
- **Build Tool**: Vite
- **Icons**: Material Icons
- **Notifications**: Vue3-Toastify
- **Phone Parsing**: libphonenumber-js
- **Utility Functions**: VueUse

## 🔄 Dark Mode

Sales Toolkit supports both light and dark modes that automatically adapt to user preferences. The theme can be toggled manually from the sidebar.

## 📱 Responsive Design

The application is fully responsive, working seamlessly on desktop, tablet, and mobile devices with an adaptive sidebar navigation.

## 🔍 Data Privacy

All data processing happens entirely in the browser. No data is ever sent to a server or stored anywhere outside your device, ensuring complete privacy and security.

## 📋 Planned Features

- Export functionality (CSV, Excel)
- User-defined text transformation rules
- Address formatting and standardization
- CRM data import/export integrations
- Custom presets and templates

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

<p align="center">
  Made with ❤️ for sales teams everywhere
</p>
