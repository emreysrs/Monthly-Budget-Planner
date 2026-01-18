# 💰 Monthly Budget Dashboard

A beautiful, intuitive budget tracking application with a pastel aesthetic design. Track your income, expenses, bills, and savings with real-time calculations and automatic local storage.

![Monthly Budget Dashboard](https://img.shields.io/badge/React-18.3.1-61dafb?logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.3-38bdf8?logo=tailwindcss)
![Recharts](https://img.shields.io/badge/Recharts-2.10.3-8884d8)
![License](https://img.shields.io/badge/License-MIT-green)

## ✨ Features

### 🎨 Beautiful UI/UX
- **Pastel Aesthetic Design** - Inspired by Google Sheets with soft, professional colors
- **Clean Typography** - Using Inter font with spaced-out uppercase headers
- **Responsive Layout** - Works perfectly on desktop and tablet devices
- **Spreadsheet-like Tables** - Familiar and intuitive data entry

### 💾 Smart Data Management
- **Auto-Save** - All changes are automatically saved to browser's LocalStorage
- **Persistent Data** - Your data remains even after closing the browser
- **Privacy First** - All data is stored locally on your device only
- **Reset Option** - Clear all data and start fresh with confirmation

### 📊 Real-Time Calculations
- **Live Updates** - Dashboard updates instantly as you edit values
- **Dynamic Charts** - Donut chart visualizes spending in real-time
- **Automatic Progress** - Progress percentages calculated automatically
- **Smart Totals** - All totals update across all sections simultaneously

### 🛠️ Full Editing Capabilities
- ✅ **Edit Item Names** - Customize category names to your needs
- ✅ **Edit Planned Amounts** - Set your budget targets
- ✅ **Edit Actual Amounts** - Record real spending
- ✅ **Toggle Items** - Include/exclude items with checkboxes
- ✅ **Month & Year Selection** - Track budgets across different periods

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd expense-tracker
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

4. **Open in browser**
```
http://localhost:5173
```

## 📦 Tech Stack

| Technology | Purpose |
|------------|---------|
| **React 18.3.1** | UI Framework with Hooks |
| **Tailwind CSS 3.4.3** | Utility-first styling |
| **Recharts 2.10.3** | Beautiful donut charts |
| **Lucide React** | Modern icon library |
| **Vite 5.3.1** | Fast build tool |

## 📁 Project Structure

```
expense-tracker/
├── src/
│   ├── App.jsx          # Main application component
│   ├── main.jsx         # Application entry point
│   └── index.css        # Global styles
├── public/
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

## 🎯 How to Use

### 1. **Dashboard Overview**
The top section shows four summary cards:
- **Income** - Total income from all sources
- **Expenses** - Daily spending and purchases
- **Bills** - Regular monthly bills
- **Savings** - Money set aside

### 2. **Donut Chart**
- Displays remaining budget visually
- Shows spent vs. remaining amounts
- Updates in real-time as you edit

### 3. **Editing Data**
- **Click any field** to edit
- **Type new values** directly in the tables
- **Check/uncheck** items to include/exclude from totals
- **Changes save automatically** - no save button needed!

### 4. **Month Selection**
- Choose month and year from dropdowns
- LocalStorage saves your selection
- Each month can have different budget data

### 5. **Reset Data**
- Click "Reset Data" button in top-right
- Confirms before deleting
- Restores default values

## 💡 Budget Categories

### Income
Track all sources of income:
- Paychecks
- Side income
- Other earnings

### Expenses
Daily and variable spending:
- Eating out
- Groceries
- Gas/Transportation
- Entertainment
- Pet supplies
- Clothing

### Bills
Fixed monthly obligations:
- Electricity
- Internet
- Water
- Phone/Insurance
- Rent/Mortgage
- Car insurance

### Savings
Money you're setting aside:
- Emergency fund
- Retirement accounts
- Investment accounts
- Special occasions
- Checking account balance

## 🔒 Privacy & Security

- **100% Local Storage** - No server, no database
- **Your Data Stays Private** - Only stored in your browser
- **No Tracking** - No analytics or data collection
- **Multi-User Safe** - Each browser/device has separate data

## 🌐 Deployment

### Deploy to Vercel

1. **Push to GitHub**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-repo-url>
git push -u origin main
```

2. **Deploy on Vercel**
- Go to [vercel.com](https://vercel.com)
- Import your GitHub repository
- Vercel auto-detects Vite configuration
- Click "Deploy"

### Deploy to Netlify

1. **Build the project**
```bash
npm run build
```

2. **Deploy on Netlify**
- Go to [netlify.com](https://netlify.com)
- Drag and drop the `dist` folder
- Or connect your GitHub repository

## 🎨 Color Palette

```css
Pastel Blue Header:  #dae3f3
Light Blue Table:    #c5d9f1
Pastel Yellow:       #fff2cc
Light Yellow:        #ffe699
Purple Chart:        #b4a7d6
Pink Chart:          #d5a6bd
```

## 🛠️ Customization

### Add New Categories
Edit `defaultBudgetData` in `App.jsx`:
```javascript
const defaultBudgetData = {
  // Add your custom category here
  customCategory: {
    items: [
      { id: 1, name: 'Item 1', planned: 0, actual: 0, checked: true }
    ]
  }
}
```

### Change Colors
Modify Tailwind classes in component JSX or add custom colors in `tailwind.config.js`

### Modify Data Structure
Update the `budgetData` state structure and corresponding calculations

## 📱 Browser Support

- ✅ Chrome (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ⚠️ LocalStorage must be enabled

## 🐛 Troubleshooting

**Data not saving?**
- Check if LocalStorage is enabled in browser
- Clear browser cache and reload
- Check browser console for errors

**Charts not displaying?**
- Ensure all dependencies installed correctly
- Run `npm install` again
- Clear node_modules and reinstall

**Numbers not calculating?**
- Make sure values are valid numbers
- Check browser console for errors
- Try resetting data

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests

## 👨‍💻 Author

Built with ❤️ using React, Tailwind CSS, and Recharts

## 🙏 Acknowledgments

- Design inspired by Google Sheets budget templates
- Icons from Lucide React
- Charts powered by Recharts

---

**Happy Budgeting! 💰✨**

If you find this project useful, please consider giving it a ⭐ on GitHub!
