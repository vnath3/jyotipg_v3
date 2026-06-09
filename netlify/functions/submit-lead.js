const buildCorsHeaders = function () {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };
};

exports.handler = async function (event) {
  const corsHeaders = buildCorsHeaders();

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers: corsHeaders
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'method_not_allowed' })
    };
  }

  const submitUrl = process.env.GSHEET_WEBHOOK_URL || 'https://script.google.com/macros/s/AKfycbzzU_acZwfmI7ak9vGk6BvF9JU5rM2xGap3Cj6P659xVxKA3TEa2fMw-9jOinl4D9Mlpw/exec';
  const tenantSlug = 'jyoti-pg';
  const debugLogs = process.env.LEAD_DEBUG_LOGS === '1';

  const maskSensitive = function (value) {
    if (!value || typeof value !== 'string') {
      return value;
    }
    if (value.length <= 4) {
      return '****';
    }
    return value.slice(0, 2) + '****' + value.slice(-2);
  };

  let payload = {};
  try {
    const rawBody = event.isBase64Encoded
      ? Buffer.from(event.body || '', 'base64').toString('utf8')
      : event.body;
    payload = rawBody ? JSON.parse(rawBody) : {};
  } catch (error) {
    return {
      statusCode: 400,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'invalid_json' })
    };
  }

  const outboundPayload = Object.assign({}, payload, {
    identity_type: 'slug',
    identity_value: tenantSlug,
    tenant_slug: tenantSlug
  });

  if (!outboundPayload.source) {
    outboundPayload.source = 'jyotipg_marketing';
  }

  if (!outboundPayload.campaign) {
    outboundPayload.campaign = 'organic';
  }

  if (!outboundPayload.form_payload) {
    outboundPayload.form_payload = {};
  }

  if (!outboundPayload.form_payload.tenant_slug) {
    outboundPayload.form_payload.tenant_slug = tenantSlug;
  }

  if (debugLogs) {
    const safePayload = JSON.parse(JSON.stringify(outboundPayload));
    if (safePayload.contact && safePayload.contact.phone) {
      safePayload.contact.phone = maskSensitive(String(safePayload.contact.phone));
    }
    console.log('lead-submit debug payload', safePayload);
    console.log('lead-submit debug config', {
      submitUrl: submitUrl,
      tenantSlug: tenantSlug
    });
  }

  try {
    const response = await fetch(submitUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name:       payload.name       || '',
        phone:      payload.phone      || '',
        form_type:  payload.form_type  || '',
        source:     payload.source     || outboundPayload.source,
        campaign:   payload.campaign   || outboundPayload.campaign,
        tenant_slug: tenantSlug
      })
    });

    const responseText = await response.text();

    if (debugLogs) {
      console.log('gsheet-webhook response', {
        status: response.status,
        body: responseText
      });
    }

    // Apps Script always returns 200 even on redirect — treat any
    // 2xx or 3xx as success
    const succeeded = response.status < 400;

    return {
      statusCode: succeeded ? 200 : response.status,
      headers: corsHeaders,
      body: JSON.stringify({
        status: succeeded ? 'ok' : 'error',
        message: succeeded ? 'Lead captured' : responseText
      })
    };

  } catch (error) {
    if (debugLogs) {
      console.log('gsheet-webhook error', error.message);
    }
    return {
      statusCode: 502,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'upstream_error', message: error.message })
    };
  }
};
