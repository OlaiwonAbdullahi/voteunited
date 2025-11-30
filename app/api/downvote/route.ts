import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    console.log("Downvote request body:", body);

    const response = await fetch("https://www.admin.voteunited.com/api/downvote-member", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(body),
    });

    console.log("Downvote response status:", response.status);
    
    const data = await response.json();
    console.log("Downvote response data:", data);

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("Downvote error:", error);
    return NextResponse.json(
      { error: "Server error", details: String(error) },
      { status: 500 }
    );
  }
}