import { NextRequest, NextResponse } from "next/server";

// Google Civic Information API endpoint
const CIVIC_API_URL = "https://www.googleapis.com/civicinfo/v2/voterinfo";

// You can set your API key here or use environment variable
const API_KEY = process.env.GOOGLE_CIVIC_API_KEY || "YOUR_API_KEY_HERE";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const zipCode = searchParams.get("zipCode");

    if (!zipCode) {
      return NextResponse.json(
        { error: "ZIP code is required" },
        { status: 400 }
      );
    }

    // Validate ZIP code format
    if (!/^\d{5}$/.test(zipCode)) {
      return NextResponse.json(
        { error: "Invalid ZIP code format. Please enter a 5-digit ZIP code." },
        { status: 400 }
      );
    }

    // Check if API key is configured
    if (API_KEY === "YOUR_API_KEY_HERE") {
      // Return mock data for demonstration purposes
      return NextResponse.json({
        kind: "civicinfo#voterInfoResponse",
        election: {
          id: "2000",
          name: "VIP Test Election",
          electionDay: "2025-11-04",
        },
        pollingLocations: [
          {
            address: {
              locationName: "Sample Polling Location",
              line1: "123 Main Street",
              city: "Sample City",
              state: "CA",
              zip: zipCode,
            },
            pollingHours: "7:00 AM - 8:00 PM",
            notes:
              "This is sample data. Please configure your Google Civic Information API key to get real polling location data.",
          },
        ],
        earlyVoteSites: [
          {
            address: {
              locationName: "Early Voting Center",
              line1: "456 Oak Avenue",
              city: "Sample City",
              state: "CA",
              zip: zipCode,
            },
            pollingHours: "Monday-Friday: 9:00 AM - 5:00 PM",
          },
        ],
        electionName: "VIP Test Election",
        electionDay: "2025-11-04",
      });
    }

    // Make request to Google Civic Information API
    const apiUrl = `${CIVIC_API_URL}?key=${API_KEY}&address=${encodeURIComponent(
      zipCode
    )}`;

    const response = await fetch(apiUrl);
    const data = await response.json();

    if (!response.ok) {
      // Handle specific API errors
      if (response.status === 400) {
        return NextResponse.json(
          {
            error:
              data.error?.message ||
              "No election data available for this location at this time.",
          },
          { status: 404 }
        );
      }

      if (response.status === 403) {
        return NextResponse.json(
          {
            error:
              "API key error. Please check your Google Civic Information API configuration.",
          },
          { status: 500 }
        );
      }

      throw new Error(data.error?.message || "Failed to fetch polling data");
    }

    // Transform the response to match our interface
    const transformedData = {
      pollingLocations: data.pollingLocations || [],
      earlyVoteSites: data.earlyVoteSites || [],
      electionName: data.election?.name,
      electionDay: data.election?.electionDay,
    };

    return NextResponse.json(transformedData);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Polling location API error:", error);
    return NextResponse.json(
      {
        error:
          error.message ||
          "Unable to fetch polling location data. Please try again later.",
      },
      { status: 500 }
    );
  }
}
