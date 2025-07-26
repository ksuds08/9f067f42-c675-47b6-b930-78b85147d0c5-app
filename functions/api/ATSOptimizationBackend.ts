export async function ATSOptimizationBackendHandler(req: Request): Promise<Response> {
  try {
    if (req.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405, headers: { 'Content-Type': 'application/json' } });
    }

    const contentType = req.headers.get('Content-Type') || '';
    if (!contentType.includes('application/json')) {
      return new Response(JSON.stringify({ error: 'Invalid content type' }), { status: 415, headers: { 'Content-Type': 'application/json' } });
    }

    const body = await req.json();
    const validationError = validateInput(body);
    if (validationError) {
      return new Response(JSON.stringify({ error: validationError }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    const optimizedResume = await optimizeForATS(body);
    return new Response(JSON.stringify({ optimizedResume }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}

function validateInput(data: any): string | null {
  if (typeof data !== 'object' || data === null) {
    return 'Input data should be a JSON object.';
  }
  if (typeof data.resume !== 'string' || data.resume.trim() === '') {
    return 'Resume field is required and should be a non-empty string.';
  }
  if (typeof data.jobRole !== 'string' || data.jobRole.trim() === '') {
    return 'Job role field is required and should be a non-empty string.';
  }
  if (typeof data.industry !== 'string' || data.industry.trim() === '') {
    return 'Industry field is required and should be a non-empty string.';
  }
  return null;
}

async function optimizeForATS(data: { resume: string; jobRole: string; industry: string; }): Promise<string> {
  // Placeholder for ATS optimization logic
  // For now, it simply returns the provided resume appended with optimization notes
  const optimizationNotes = `Optimized for ${data.jobRole} in ${data.industry}`;
  return `${data.resume}\n\n${optimizationNotes}`;
}
