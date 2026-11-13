// OpenAI Ads "Portfolio Lead Generation" conversion (base event: Lead created).
// The pixel is installed once in index.html; this module only sends the event.

const STORAGE_KEY = 'oaiq_leads_sent';
const sentThisPage = new Set();

function readSent() {
  try {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
}

function rememberSent(leadId) {
  sentThisPage.add(leadId);
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify([...readSent(), leadId].slice(-20)));
  } catch {
    // Storage blocked: the in-memory guard still prevents repeats on this page.
  }
}

/**
 * Send one `lead_created` conversion for a successful lead (e.g. a booking).
 * Never throws: if the pixel is missing or errors, the caller's flow continues.
 * @param {string} leadId Unique id of the lead, used to skip duplicates.
 * @returns {boolean} true if the event was sent.
 */
export function trackLeadCreated(leadId) {
  if (!leadId || sentThisPage.has(leadId) || readSent().includes(leadId)) return false;

  // index.html defines window.oaiq as a queue stub before the SDK file loads,
  // so calls made early are queued and delivered once the SDK is ready.
  if (typeof window === 'undefined' || typeof window.oaiq !== 'function') return false;

  try {
    window.oaiq('measure', 'lead_created', { type: 'customer_action' });
  } catch (err) {
    console.warn('[lead tracking] OpenAI Ads event failed:', err);
    return false;
  }

  rememberSent(leadId);
  return true;
}
