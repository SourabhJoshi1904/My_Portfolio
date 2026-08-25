import { NextResponse } from "next/server";

/**
 * Contact form API endpoint forwarding directly to Formspree endpoint.
 * Formspree Endpoint: https://formspree.io/f/mkjwvdyz
 */
export async function POST(request: Request) {
  const formspreeEndpoint = process.env.FORMSPREE_URL || "https://formspree.io/f/mkjwvdyz";

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const { name, email, type, message } = body as {
    name?: string;
    email?: string;
    type?: string;
    message?: string;
  };

  if (!name || !email || !message) {
    return NextResponse.json({ ok: false, error: "Missing required fields" }, { status: 400 });
  }

  try {
    const res = await fetch(formspreeEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        type: type ?? "Web Application",
        message,
        _subject: `New Portfolio Inquiry from ${name} (${type})`,
      }),
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      return NextResponse.json({ ok: false, error: errData.error || "Formspree submission failed" }, { status: res.status });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Failed to send message" }, { status: 500 });
  }
}
