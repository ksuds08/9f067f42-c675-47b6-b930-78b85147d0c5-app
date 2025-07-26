export async function ResumeGeneratorBackendHandler(req: Request): Promise<Response> {
  try {
    if (req.method !== "POST") {
      return new Response(JSON.stringify({ error: "Only POST method is allowed" }), {
        status: 405,
        headers: { "Content-Type": "application/json" }
      });
    }

    const contentType = req.headers.get("Content-Type");
    if (!contentType || !contentType.includes("application/json")) {
      return new Response(JSON.stringify({ error: "Invalid content type, expected application/json" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    const body = await req.json();
    const validationError = validateRequestBody(body);
    if (validationError) {
      return new Response(JSON.stringify({ error: validationError }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    const resumeData = await generateResume(body);
    return new Response(JSON.stringify(resumeData), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}

interface ResumeRequestBody {
  personalDetails: {
    name: string;
    email: string;
    phone: string;
  };
  careerObjectives: string;
  keySkills: string[];
  jobRole: string;
  industry: string;
}

function validateRequestBody(body: any): string | null {
  if (typeof body !== "object" || body === null) {
    return "Request body must be an object";
  }
  const { personalDetails, careerObjectives, keySkills, jobRole, industry } = body;

  if (!personalDetails || typeof personalDetails.name !== "string" || typeof personalDetails.email !== "string" || typeof personalDetails.phone !== "string") {
    return "Invalid or missing personal details";
  }

  if (typeof careerObjectives !== "string") {
    return "Invalid or missing career objectives";
  }

  if (!Array.isArray(keySkills) || !keySkills.every(skill => typeof skill === "string")) {
    return "Invalid or missing key skills";
  }

  if (typeof jobRole !== "string" || typeof industry !== "string") {
    return "Invalid or missing job role or industry";
  }

  return null;
}

async function generateResume(body: ResumeRequestBody): Promise<any> {
  // Mock implementation of AI resume generation
  return {
    message: "Resume generated successfully",
    resume: {
      personalDetails: body.personalDetails,
      careerObjectives: body.careerObjectives,
      keySkills: body.keySkills,
      jobRole: body.jobRole,
      industry: body.industry
    }
  };
}
