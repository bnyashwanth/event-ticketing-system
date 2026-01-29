# Ticketeer - Mini Event Ticketing App

A MERN stack-based Event Ticketing application where organizers can manage events and registrations, and users can register to get tickets instantly.

## Features

### Organizer Flow
- **Authentication**: Sign up and Login securely.
- **Event Management**: Create events with details (Title, Date, Venue, Ticket Limit).
- **Approval Modes**:
  - **Auto**: Tickets are issued immediately.
  - **Manual**: Registrations remain pending until approved by the organizer.
- **Dashboard**: View list of created events.
- **Registration Management**: View attendees, Approve/Reject registrations.

### User Flow
- **Public Registration**: Simple public link to register for an event.
- **Ticketing**: 
  - Instant digital ticket generation upon approval.
  - QR Code visualization (simulated).
  - Download/Print ticket option.
- **Status Updates**: View pending status if manual approval is required.

## Tech Stack
- **Frontend**: React (Vite), Tailwind CSS, Lucide Icons, Axios, React Router.
- **Backend**: Node.js, Express.js, MongoDB (Mongoose), JSON Web Token (JWT).

## Setup Instructions

### Prerequisites
- Node.js installed.
- MongoDB installed locally or a MongoDB Atlas connection string.

### 1. Backend Setup
```bash
cd backend
npm install
```
- Create a `.env` file in `backend/` directory:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/event-app
JWT_SECRET=your_jwt_secret
FRONTEND_URL=http://localhost:5173
```
- Start the server:
```bash
npm run dev
```
(Server runs on http://localhost:5000)

### 2. Frontend Setup
```bash
cd frontend
npm install
```
- Start the development server:
```bash
npm run dev
```
(Client runs on http://localhost:5173)

## Usage
1. Open the frontend URL.
2. Sign up as an organizer.
3. Create an event -> Copy the "Public Page" link from the dashboard card.
4. Open the link in an incognito window to simulate a user registering.
