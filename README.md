# Availability Calendar

A modern web application for coordinating availability with friends and family. Create shared calendars, add your availability, and find the perfect time to meet up with your group.

## Features

- 🗓️ **Easy Calendar Creation** - Create a calendar in seconds with a name and description
- 🔗 **Shareable Links** - Get a unique link to share with friends (no accounts required)
- 📅 **Interactive Calendar** - Visual calendar interface with date selection
- 📅 **Date Range Selection** - Select individual dates or date ranges with all dates in between included
- 👥 **Group Coordination** - See everyone's availability in one place
- 📱 **Responsive Design** - Works great on desktop and mobile devices
- 🎨 **Modern UI** - Clean, intuitive interface with smooth animations
- ⚡ **One-Click Adding** - Enter your name once, then just click dates to add availability automatically
- 🎨 **Color-Coded Participants** - Each person gets a unique color with dots on calendar dates to easily identify who's available

## How It Works

1. **Create a Calendar** - Set up a new availability calendar with a name and description
2. **Share the Link** - Copy the generated share link and send it to your friends
3. **Add Availability** - Friends click the link and add their available dates and times
4. **Coordinate** - Everyone can see when people are available to meet

## Quick Start

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. **Clone or download the project**
   ```bash
   git clone <repository-url>
   cd AvailabilityCalender
   ```

2. **Install server dependencies**
   ```bash
   npm install
   ```

3. **Install client dependencies**
   ```bash
   cd client
   npm install
   cd ..
   ```

4. **Start the development server**
   ```bash
   # Start the backend server (from the root directory)
   npm run dev
   
   # In a new terminal, start the frontend (from the root directory)
   npm run client
   ```

5. **Open your browser**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## Usage

### Creating a Calendar

1. Go to the home page and click "Create New Calendar"
2. Enter a name for your calendar (e.g., "Weekend Trip Planning")
3. Add an optional description
4. Click "Create Calendar"
5. Copy the share link and send it to your friends

### Adding Availability

1. **First Time**: Enter your name when prompted (this is saved for future use)
2. Click on a share link from a friend
3. **Just click dates** on the calendar - your availability is added automatically!
4. You can select individual dates or date ranges (all dates in between are included)

### Viewing Availability

- **Color-coded dots** on calendar dates show who's available
- Each participant gets a unique color that's consistent across the calendar
- **Hover over dots** to see participant names
- The availability summary shows all participants with their color indicators
- You can easily see who has added their availability and when they're free

## Project Structure

```
AvailabilityCalender/
├── server.js              # Express server with API endpoints
├── package.json           # Server dependencies
├── client/                # React frontend
│   ├── public/           # Static files
│   ├── src/              # React components
│   │   ├── components/   # React components
│   │   ├── App.js        # Main app component
│   │   └── index.js      # React entry point
│   └── package.json      # Client dependencies
└── README.md             # This file
```

## API Endpoints

- `POST /api/calendars` - Create a new calendar
- `GET /api/calendars/:id` - Get calendar by ID
- `GET /api/share/:shareId` - Get calendar by share ID
- `POST /api/calendars/:id/availability` - Add availability to calendar
- `GET /api/calendars` - Get all calendars (for demo)

## Technologies Used

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Web framework
- **CORS** - Cross-origin resource sharing
- **UUID** - Unique identifier generation
- **Moment.js** - Date manipulation

### Frontend
- **React** - UI library
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **React Calendar** - Calendar component
- **React Hot Toast** - Toast notifications
- **Lucide React** - Icons
- **Moment.js** - Date manipulation

## Deployment

### Local Development
```bash
npm run dev        # Start backend with nodemon
npm run client     # Start React development server
```

### Production Build
```bash
npm run build      # Build React app for production
npm start          # Start production server
```

## Customization

### User Experience
- **Name Persistence**: Users only need to enter their name once when first visiting the app
- **Automatic Adding**: Once a name is set, clicking dates automatically adds availability without additional clicks
- **Date Selection**: The calendar supports both single date selection and date range selection. When selecting a range, all dates between the start and end dates are automatically included.

### Styling
Modify CSS variables in `client/src/index.css` to customize colors and styling.

### Calendar Range
Change the `minDate` prop in the Calendar component to allow selection of past dates.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

If you encounter any issues or have questions, please open an issue on the repository.

---

**Happy scheduling! 🎉** 