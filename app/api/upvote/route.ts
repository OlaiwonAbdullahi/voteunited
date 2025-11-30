import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    console.log("Upvote request body:", body);

    const response = await fetch("https://www.admin.voteunited.com/api/upvote-member", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(body),
    });

    console.log("Upvote response status:", response.status);
    
    const data = await response.json();
    console.log("Upvote response data:", data);

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("Upvote error:", error);
    return NextResponse.json(
      { error: "Server error", details: String(error) },
      { status: 500 }
    );
  }
}