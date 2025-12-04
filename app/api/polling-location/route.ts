/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";

// Google Civic Information API endpoint
const CIVIC_API_URL = "https://www.googleapis.com/civicinfo/v2/voterinfo";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const address = searchParams.get("address") || searchParams.get("zipCode");

    if (!address) {
      return NextResponse.json(
        { error: "Address or ZIP code is required" },
        { status: 400 }
      );
    }

    const apiKey = "AIzaSyCQpGVyZs7utzMX0cKchTMPCtU6pQmYtwk";

    if (!apiKey) {
      return NextResponse.json(
        {
          error:
            "Google Civic API key is not configured. Please add NEXT_PUBLIC_GOOGLE_CIVIC_API_KEY to your .env.local file",
        },
        { status: 500 }
      );
    }

    // Make request to Google Civic Information API with all available data
    const apiUrl = `${CIVIC_API_URL}?key=${apiKey}&address=${encodeURIComponent(
      address
    )}&electionId=2000&officialOnly=false`;

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

    // Transform the response to include all relevant information
    const transformedData = {
      // Election Information
      election: data.election || null,

      // Polling Locations (Election Day)
      pollingLocations: data.pollingLocations || [],

      // Early Vote Sites
      earlyVoteSites: data.earlyVoteSites || [],

      // Drop-off Locations
      dropOffLocations: data.dropOffLocations || [],

      // Contests (Races/Ballot Items)
      contests: data.contests || [],

      // State Information
      state: data.state || [],

      // Election Officials
      electionOfficials: extractElectionOfficials(data.state),

      // Normalized Input Address
      normalizedInput: data.normalizedInput || null,
    };

    return NextResponse.json(transformedData);
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

// Helper function to extract election officials from state data
function extractElectionOfficials(stateData: any[]) {
  if (!stateData || !Array.isArray(stateData)) {
    return [];
  }

  const officials: any[] = [];

  stateData.forEach((state) => {
    // Local jurisdiction officials
    if (state.local_jurisdiction?.electionAdministrationBody) {
      const admin = state.local_jurisdiction.electionAdministrationBody;
      officials.push({
        type: "Local Election Official",
        name: state.local_jurisdiction.name,
        ...extractAdminInfo(admin),
      });
    }

    // State-level officials
    if (state.electionAdministrationBody) {
      officials.push({
        type: "State Election Official",
        name: state.name,
        ...extractAdminInfo(state.electionAdministrationBody),
      });
    }
  });

  return officials;
}

// Helper function to extract administration information
function extractAdminInfo(admin: any) {
  return {
    electionInfoUrl: admin.electionInfoUrl,
    electionRegistrationUrl: admin.electionRegistrationUrl,
    electionRegistrationConfirmationUrl:
      admin.electionRegistrationConfirmationUrl,
    absenteeVotingInfoUrl: admin.absenteeVotingInfoUrl,
    votingLocationFinderUrl: admin.votingLocationFinderUrl,
    ballotInfoUrl: admin.ballotInfoUrl,
    correspondenceAddress: admin.correspondenceAddress,
    physicalAddress: admin.physicalAddress,
    electionOfficials: admin.electionOfficials || [],
    voter_services: admin.voter_services || [],
    hoursOfOperation: admin.hoursOfOperation,
  };
}
