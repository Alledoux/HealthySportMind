# HealthySportMind

Welcome to the HealthySportMind repository! This project is a comprehensive wellness and performance tracking platform designed for athletes. It consists of a React Native (Expo) frontend and a Django backend that is hosted on Google Cloud.

## Features

- **Athlete Profiles**: Customized tracking based on sport, experience level, and preferred communication tone.
- **Daily Check-Ins**: Log daily health metrics including mood, stress, energy, and sleep hours.
- **Performance Tracking**: Track training sessions with performance ratings and contextual comments.
- **Data Visualization**: View performance and check-in trends over time with beautiful, interactive graphs.
- **AI-Assisted Feedback**: Receive customized short-term and long-term actionable feedback generated from your check-ins and performance logs.

## Technology Stack

- **Frontend**: React Native, Expo, React Navigation, Axios, React Native Gifted Charts.
- **Backend**: Python, Django, Celery (task scheduling).
- **Infrastructure**: Google Cloud (Hosting).

---

## Getting Started

### 1. Frontend Setup (React Native / Expo)

The frontend is an Expo project. Its dependencies (including drawing and chart libraries) are tracked in `package.json`.

1. Open a terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install the Node modules:
   ```bash
   npm install
   ```
3. Ensure your environment variables are configured to point to the Google Cloud backend URL. (You may need to update the `API_URL` variables in the `frontend/services/api/` folders or within a `.env` file).
4. Start the Expo development server:
   ```bash
   npx expo start -c
   ```

### 2. Backend Setup (Local Development)

While the production backend operates on Google Cloud, you can run the Django API locally for further development:

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Create and activate a Virtual Environment:
   ```bash
   # Windows
   python -m venv venv
   .\venv\Scripts\activate

   # Mac/Linux
   python3 -m venv venv
   source venv/bin/activate
   ```
3. Install the dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Apply the database schema (such as the `PerformanceLog` and `CheckIn` models):
   ```bash
   python manage.py makemigrations api
   python manage.py migrate
   ```
5. Start the backend development server:
   ```bash
   python manage.py runserver
   ```

## Project Structure

```text
HealthySportMind/
├── backend/                  # Django backend
│   ├── api/                  # Main API app (urls, views, models, etc.)
│   ├── project/              # Django project config (settings, asgi)
│   └── requirements.txt      # Python dependencies
├── frontend/                 # React Native / Expo application
│   ├── app/                  # Expo Router navigation framework
│   ├── components/           # Reusable UI components
│   ├── services/             # API services
│   └── package.json          # Node dependencies
└── README.md
```

## Deployment Instructions

The backend of this application is deployed using Google Cloud. If you are updating the deployment:

1. Install and authenticate the [Google Cloud SDK](https://cloud.google.com/sdk/docs/install).
2. Navigate to your backend directory:
   ```bash
   cd backend
   ```
3. Deploy the application to App Engine (or your specified Cloud Run instance):
   ```bash
   gcloud app deploy
   ```
4. Once deployed, verify the generated Google Cloud URL works and update it in your frontend environments (`EXPO_PUBLIC_API_URL` / `API_URL`) so that your mobile application continues talking to the cloud endpoint.
