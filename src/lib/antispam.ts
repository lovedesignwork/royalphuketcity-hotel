/**
 * Anti-spam utilities for form submissions.
 *
 * Multiple layers of protection:
 * 1. Honeypot field detection
 * 2. Minimum submission time (bots submit instantly)
 * 3. Content pattern analysis (excessive URLs, spam keywords)
 */

export interface AntiSpamResult {
  passed: boolean;
  reason?: string;
}

interface AntiSpamPayload {
  honeypot?: string;
  formLoadedAt?: number;
  message?: string;
  email?: string;
  name?: string;
}

/**
 * Check message content for spam patterns.
 */
function hasSpamPatterns(content: string): boolean {
  if (!content) return false;

  const lowerContent = content.toLowerCase();

  // Count URLs (more than 3 is suspicious)
  const urlCount = (content.match(/https?:\/\//gi) || []).length;
  if (urlCount > 3) return true;

  // Spam keywords commonly found in form spam
  const spamKeywords = [
    "buy now",
    "click here",
    "free money",
    "bitcoin",
    "cryptocurrency",
    "investment opportunity",
    "earn money fast",
    "work from home",
    "lottery winner",
    "nigerian prince",
    "claim your prize",
    "act now",
    "limited time offer",
    "viagra",
    "cialis",
    "casino",
    "poker online",
    "slot machine",
    "xxx",
    "porn",
    "sex video",
  ];

  for (const keyword of spamKeywords) {
    if (lowerContent.includes(keyword)) return true;
  }

  // Check for excessive repetition (spam often has repeated chars)
  if (/(.)\1{10,}/.test(content)) return true;

  // Check for too many special characters (often spam)
  const specialCharRatio = (content.match(/[^\w\s]/g) || []).length / content.length;
  if (content.length > 50 && specialCharRatio > 0.3) return true;

  return false;
}

/**
 * Check email for suspicious patterns.
 */
function hasSpamEmail(email: string): boolean {
  if (!email) return false;

  const lowerEmail = email.toLowerCase();

  // Disposable email domains (common in spam)
  const disposableDomains = [
    "tempmail.com",
    "throwaway.email",
    "guerrillamail.com",
    "10minutemail.com",
    "mailinator.com",
    "yopmail.com",
    "temp-mail.org",
    "fakeinbox.com",
    "trashmail.com",
  ];

  const domain = lowerEmail.split("@")[1];
  if (domain && disposableDomains.some((d) => domain.includes(d))) return true;

  // Suspicious patterns (random strings)
  const localPart = lowerEmail.split("@")[0];
  if (localPart && /^[a-z0-9]{15,}$/.test(localPart)) return true;

  return false;
}

/**
 * Validate a form submission against spam.
 */
export async function validateAntiSpam(payload: AntiSpamPayload): Promise<AntiSpamResult> {
  // 1. Honeypot check - should be empty
  if (payload.honeypot && payload.honeypot.trim() !== "") {
    console.log("Anti-spam: Honeypot triggered");
    return { passed: false, reason: "Invalid submission" };
  }

  // 2. Minimum time check - form should take at least 3 seconds to fill
  if (payload.formLoadedAt) {
    const submissionTime = Date.now() - payload.formLoadedAt;
    const minTime = 3000; // 3 seconds
    if (submissionTime < minTime) {
      console.log(`Anti-spam: Too fast submission (${submissionTime}ms)`);
      return { passed: false, reason: "Please take your time filling out the form" };
    }
  }

  // 3. Content pattern check
  if (payload.message && hasSpamPatterns(payload.message)) {
    console.log("Anti-spam: Spam patterns detected in message");
    return { passed: false, reason: "Your message was flagged as potential spam" };
  }

  // 4. Email check
  if (payload.email && hasSpamEmail(payload.email)) {
    console.log("Anti-spam: Suspicious email detected");
    return { passed: false, reason: "Please use a valid email address" };
  }

  // 5. Name check (should have at least 2 characters, not just numbers)
  if (payload.name) {
    const cleanName = payload.name.trim();
    if (cleanName.length < 2 || /^\d+$/.test(cleanName)) {
      console.log("Anti-spam: Invalid name");
      return { passed: false, reason: "Please enter a valid name" };
    }
  }

  return { passed: true };
}
