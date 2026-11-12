const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default async function handler(request, response) {
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return response.status(405).json({ error: "Method not allowed." });
  }

  const { email, website } = request.body || {};
  const normalizedEmail = typeof email === "string" ? email.trim().toLowerCase() : "";

  if (website) {
    return response.status(200).json({ ok: true });
  }

  if (!EMAIL_PATTERN.test(normalizedEmail) || normalizedEmail.length > 254) {
    return response.status(400).json({ error: "Enter a valid email address." });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const audienceId = process.env.RESEND_AUDIENCE_ID;

  if (!apiKey || !audienceId) {
    console.error("Waitlist is not configured: missing Resend environment variables.");
    return response.status(503).json({ error: "The waitlist is temporarily unavailable." });
  }

  let resendResponse;
  try {
    resendResponse = await fetch(
      `https://api.resend.com/audiences/${encodeURIComponent(audienceId)}/contacts`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: normalizedEmail, unsubscribed: false }),
      },
    );
  } catch (error) {
    console.error("Could not reach Resend:", error);
    return response.status(502).json({ error: "We couldn't save your email. Please try again." });
  }

  if (resendResponse.ok || resendResponse.status === 409) {
    return response.status(200).json({ ok: true });
  }

  console.error("Resend rejected waitlist contact:", await resendResponse.text());
  return response.status(502).json({ error: "We couldn't save your email. Please try again." });
}
