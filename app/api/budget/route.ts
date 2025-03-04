import { NextRequest, NextResponse } from "next/server";
import { createBudget } from "@/services/budget";

export async function POST(req: NextRequest) {
  try {
    // Get raw body text first
    const rawBody = await req.text();

    // Log raw body for debugging
    console.log("Raw body:", rawBody);

    // Parse JSON
    let body;
    try {
      body = JSON.parse(rawBody);
    } catch (parseError) {
      console.error("JSON parsing error:", parseError);
      return NextResponse.json(
        { error: "Invalid JSON in request body" },
        { status: 400 }
      );
    }

    // Validate input
    console.log("Parsed body:", body);
    const response = await createBudget(body);

    return NextResponse.json(
      {
        message: "Budget updated successfully",
        response,
      },
      { status: 201 }
    );
  } catch (error) {
    try {
      console.error(
        "Unexpected error:",
        error instanceof Error
          ? {
              message: error.message,
              name: error.name,
              stack: error.stack,
            }
          : "Non-Error object caught"
      );
    } catch (logError) {
      // If even logging fails, use a fallback
      console.error("Failed to log error", logError);
    }

    // Safe error message extraction
    const errorMessage =
      error instanceof Error
        ? error.message
        : typeof error === "string"
        ? error
        : "An unexpected error occurred";

    // Ensure we always return a response
    return NextResponse.json(
      {
        error: "Error updating budget",
        details: errorMessage,
      },
      { status: 500 }
    );
  }
}
