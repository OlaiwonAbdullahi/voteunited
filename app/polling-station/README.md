# Polling Station Lookup Feature

## Overview

The polling station lookup feature allows users to find their polling location by entering their ZIP code. It uses the Google Civic Information API to retrieve real-time polling location data.

## Features

- **ZIP Code Search**: Simple input for users to enter their 5-digit ZIP code
- **Polling Locations**: Displays polling place address, hours, and notes
- **Early Voting Sites**: Shows available early voting locations
- **Directions**: Direct links to Google Maps for navigation
- **Responsive Design**: Works on all devices
- **Dark Mode Support**: Fully compatible with dark mode

## Setup Instructions

### Option 1: Use Mock Data (No API Key Required)

The feature works out of the box with sample data for demonstration purposes. No setup required!

### Option 2: Configure Google Civic Information API

To get real polling location data:

1. **Get a Google Civic Information API Key**:

   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select an existing one
   - Enable the "Google Civic Information API"
   - Go to "Credentials" and create an API key
   - Copy your API key

2. **Add API Key to Your Project**:

   **Method A: Environment Variable (Recommended)**

   Create or update `.env.local` file in your project root:

   ```
   GOOGLE_CIVIC_API_KEY=your_api_key_here
   ```

   **Method B: Direct Configuration**

   Edit `app/api/polling-location/route.ts` and replace:

   ```typescript
   const API_KEY = process.env.GOOGLE_CIVIC_API_KEY || "YOUR_API_KEY_HERE";
   ```

   with:

   ```typescript
   const API_KEY = "your_actual_api_key_here";
   ```

3. **Restart Your Development Server**:
   ```bash
   npm run dev
   ```

## Usage

1. Navigate to `/polling-station` in your browser
2. Enter a valid 5-digit ZIP code
3. Click "Search"
4. View your polling location and early voting sites
5. Click "Get Directions" to open Google Maps

## Important Notes

- **Election Data Availability**: The Google Civic Information API provides data closer to election dates. Outside of election periods, you may see limited or no data.
- **API Quotas**: Google provides free API usage with quotas. Check your [Google Cloud Console](https://console.cloud.google.com/) for usage limits.
- **ZIP Code Validation**: Only valid 5-digit US ZIP codes are accepted.

## Troubleshooting

### "No Polling Data Available"

- This is normal outside of election periods
- The API updates data closer to election dates
- Try again closer to an upcoming election

### "API key error"

- Verify your API key is correct
- Ensure the Google Civic Information API is enabled in your Google Cloud project
- Check that your API key has the correct permissions

### "Invalid ZIP code"

- Ensure you're entering a valid 5-digit US ZIP code
- Remove any spaces or special characters

## Alternative Solutions

If you prefer not to use the Google Civic Information API, you can:

1. **Embed Vote.org Widget**: Add Vote.org's polling place lookup widget
2. **State-Specific Links**: Link to individual state election websites
3. **Hybrid Approach**: Combine multiple data sources

## API Reference

### Endpoint

`GET /api/polling-location?zipCode={zipCode}`

### Response Format

```json
{
  "pollingLocations": [
    {
      "address": {
        "locationName": "Polling Place Name",
        "line1": "123 Main St",
        "city": "City",
        "state": "ST",
        "zip": "12345"
      },
      "pollingHours": "7:00 AM - 8:00 PM",
      "notes": "Additional information"
    }
  ],
  "earlyVoteSites": [...],
  "electionName": "Election Name",
  "electionDay": "2025-11-04"
}
```

## Resources

- [Google Civic Information API Documentation](https://developers.google.com/civic-information)
- [Vote.org](https://www.vote.org/)
- [USA.gov Voting Information](https://www.usa.gov/how-to-vote)
