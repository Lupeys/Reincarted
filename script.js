// Reincarted — "Join the Cycle" email capture.
// Inserts signups into the public.email_captures table in Supabase.
// The publishable key below is safe to expose: Row Level Security on the
// table allows anonymous INSERTs only, so nobody can read or change the list.

const SUPABASE_URL = "https://lqqxazmmhkylwyrgyhmb.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_rx7R2aUW05Ez18mTLPd7ZQ_PTiPImkW";

const { createClient } = window.supabase;
const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

const form = document.getElementById("waitlist-form");
const emailInput = document.getElementById("email");
const honeypotInput = document.getElementById("website");
const statusEl = document.getElementById("form-status");
const submitButton = form.querySelector('button[type="submit"]');

const STATUS_COLORS = {
  error: "#ff8aa8",
  pending: "#c7cdef",
  success: "#7affc7",
};

function setStatus(message, kind) {
  statusEl.textContent = message;
  statusEl.style.color = STATUS_COLORS[kind] || STATUS_COLORS.success;
}

async function submitWaitlist(event) {
  event.preventDefault();

  const email = emailInput.value.trim();
  const honeypot = honeypotInput ? honeypotInput.value.trim() : "";

  // Silent bot trap: pretend success but do not store anything.
  if (honeypot !== "") {
    setStatus("You're in the Cycle. Welcome back to the world.", "success");
    form.reset();
    return;
  }

  if (email === "") {
    setStatus("Enter your soul mail to join the Cycle.", "error");
    return;
  }

  submitButton.disabled = true;
  setStatus("Sealing your soul into the ledger…", "pending");

  try {
    const { error } = await supabase.from("email_captures").insert({
      email,
      source: "landing-hero",
    });

    if (error) {
      if (error.code === "23505") {
        // Unique violation: this email is already signed up.
        setStatus("This soul is already in the Cycle — you're on the list.", "success");
      } else if (error.code === "23514") {
        // Check violation: failed the database email format check.
        setStatus("That soul mail doesn't look right. Check the spelling.", "error");
      } else {
        setStatus("The portal hiccuped. Try again in a moment.", "error");
      }
      return;
    }

    setStatus("You're in the Cycle. Welcome back to the world.", "success");
    form.reset();
  } catch (unexpectedError) {
    setStatus("The portal hiccuped. Try again in a moment.", "error");
  } finally {
    submitButton.disabled = false;
  }
}

form.addEventListener("submit", submitWaitlist);
