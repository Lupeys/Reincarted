// Reincarted — "Join the Cycle" email capture.
// Zero-dependency version: posts straight to the Supabase REST (PostgREST)
// endpoint with fetch(), so no third-party CDN script can fail to load and
// silently break the form. The publishable key below is safe to expose:
// Row Level Security on email_captures allows anonymous INSERTs only.

(function () {
  "use strict";

  var SUPABASE_URL = "https://lqqxazmmhkylwyrgyhmb.supabase.co";
  var SUPABASE_PUBLISHABLE_KEY = "sb_publishable_rx7R2aUW05Ez18mTLPd7ZQ_PTiPImkW";
  var ENDPOINT = SUPABASE_URL + "/rest/v1/email_captures";

  var form = document.getElementById("waitlist-form");
  if (!form) {
    return;
  }

  var emailInput = document.getElementById("email");
  var honeypotInput = document.getElementById("website");
  var statusEl = document.getElementById("form-status");
  var submitButton = form.querySelector('button[type="submit"]');

  var STATUS_COLORS = {
    error: "#ff8aa8",
    pending: "#c7cdef",
    success: "#7affc7",
  };

  function setStatus(message, kind) {
    statusEl.textContent = message;
    statusEl.style.color = STATUS_COLORS[kind] || STATUS_COLORS.success;
  }

  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    var email = emailInput.value.trim();
    var honeypot = honeypotInput ? honeypotInput.value.trim() : "";

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
      var response = await fetch(ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: SUPABASE_PUBLISHABLE_KEY,
          Authorization: "Bearer " + SUPABASE_PUBLISHABLE_KEY,
          Prefer: "return=minimal",
        },
        body: JSON.stringify({ email: email, source: "landing-hero" }),
      });

      if (response.ok) {
        setStatus("You're in the Cycle. Welcome back to the world.", "success");
        form.reset();
        return;
      }

      var errorBody = null;
      try {
        errorBody = await response.json();
      } catch (parseError) {
        // Non-JSON error response; fall through to the generic message.
      }

      if (errorBody && errorBody.code === "23505") {
        // Unique violation: this email is already signed up.
        setStatus("This soul is already in the Cycle — you're on the list.", "success");
      } else if (errorBody && errorBody.code === "23514") {
        // Check violation: failed the database email format check.
        setStatus("That soul mail doesn't look right. Check the spelling.", "error");
      } else {
        setStatus("The portal hiccuped. Try again in a moment.", "error");
      }
    } catch (networkError) {
      setStatus("The portal hiccuped. Try again in a moment.", "error");
    } finally {
      submitButton.disabled = false;
    }
  });
})();
