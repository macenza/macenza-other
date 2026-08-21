import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || supabaseAnonKey;

const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const {
    candidateName,
    email,
    phone,
    location,
    experience,
    linkedInUrl,
    portfolioUrl,
    coverLetter,
    resumeUrl,
    jobId,
    recaptchaToken
  } = req.body;

  if (!recaptchaToken) {
    return res.status(400).json({ error: 'reCAPTCHA token is required.' });
  }

  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  if (!secretKey) {
    return res.status(500).json({ error: 'reCAPTCHA secret key is not configured on the server.' });
  }

  try {
    // Verify reCAPTCHA token with Google
    const verifyRes = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        secret: secretKey,
        response: recaptchaToken,
      }),
    });

    const verifyData = await verifyRes.json();

    if (!verifyData.success) {
      return res.status(400).json({ error: 'reCAPTCHA verification failed.' });
    }

    // Insert application record into Supabase (exact match of your original schema)
    const { error } = await supabase
      .from('applications')
      .insert([{
        candidate_name: candidateName || '',
        email: email || '',
        phone: phone || '',
        location: location || '',
        experience: experience || '',
        linkedin_url: linkedInUrl || '',
        portfolio_url: portfolioUrl || '',
        cover_letter: coverLetter || '',
        resume_url: resumeUrl || '',
        job_id: jobId || null
      }]);

    if (error) {
      throw error;
    }

    return res.status(200).json({ success: true, message: 'Application submitted successfully!' });
  } catch (error) {
    console.error('Submit Application Serverless Error:', error);
    return res.status(500).json({ error: error.message || 'Error processing your application.' });
  }
}
