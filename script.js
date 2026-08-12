/*
  Reincarted landing page behavior
  - Countdown timer until launch
  - Email waitlist submit to Supabase
  - Friendly inline status updates + success portal animation
*/

// TODO: Replace with your Supabase project URL.
const SUPABASE_URL = "https://YOUR_PROJECT.supabase.co";

// TODO: Replace with your Supabase anon/public key.
const SUPABASE_ANON_KEY = "YOUR_SUPABASE_ANON_KEY";

// Set this to your real launch date/time (ISO 8601 format is easiest to maintain).
const LAUNCH_DATE = "2026-12-01T17:00:00Z";

// Used to track where signups come from for ad attribution.
const SIGNUP_SOURCE = "tiktok-landing-page";

const { createClient } = window.supabase;
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const form = document.getElementById("waitlist-form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const honeypotInput = document.getElementById("website");
const formStatus = document.getElementById("form-status");
const joinButton = document.getElementById("join-button");
const portalBurst = document.getElementById("portal-burst");
const countdownTimer = document.getElementById("countdown-timer");
const yearNode = document.getElementById("year");

yearNode.textContent = String(new Date().getFullYear());

function setStatus(message, type) {
  formStatus.textContent = message;
  formStatus.classList.remove("error", "success");

  if (type === "error" || type === "success") {
    formStatus.classList.add(type);
  }
}

function isValidEmail(email) {
  // Light, practical email check; browser validation also runs on type="email".
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function launchPortalBurst() {
  portalBurst.classList.add("active");
  window.setTimeout(() => {
    portalBurst.classList.remove("active");
  }, 1000);
}

async function submitWaitlist(event) {
  event.preventDefault();

  const name = nameInput.value.trim();
  const email = emailInput.value.trim().toLowerCase();
  const honeypot = honeypotInput.value.trim();

  if (honeypot !== "") {
    // Silent bot trap: pretend success but do not store anything.
    setStatus("You've been reincarted! Check your inbox soon.", "success");
    return;
  }

  if (!isValidEmail(email)) {
    setStatus("Please enter a valid email address.", "error");
    emailInput.focus();
    return;
  }

  joinButton.disabled = true;
  setStatus("Summoning your launch invite...", "");

  try {
    const { error } = await supabase.from("waitlist").insert({
      email,
      name: name || null,
      source: SIGNUP_SOURCE
    });

    if (error) {
      throw error;
    }

    setStatus("You've been reincarted! Check your inbox soon.", "success");
    launchPortalBurst();
    form.reset();
  } catch (err) {
    console.error("Waitlist signup error:", err);
    // Friendly inline error; do not clear fields so users keep what they typed.
    setStatus("That portal glitched. Please try again in a moment.", "error");
  } finally {
    joinButton.disabled = false;
  }
}

function updateCountdown() {
  const launchTime = new Date(LAUNCH_DATE).getTime();
  const now = Date.now();
  const timeLeft = launchTime - now;

  if (Number.isNaN(launchTime)) {
    countdownTimer.textContent = "Set a valid LAUNCH_DATE in script.js";
    return;
  }

  if (timeLeft <= 0) {
    countdownTimer.textContent = "The portal is open now!";
    return;
  }

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
  const seconds = Math.floor((timeLeft / 1000) % 60);

  countdownTimer.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

form.addEventListener("submit", submitWaitlist);
updateCountdown();
window.setInterval(updateCountdown, 1000);
