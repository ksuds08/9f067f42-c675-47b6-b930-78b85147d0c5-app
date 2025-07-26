export async function CareerAdviceBackendHandler(req: Request): Promise<Response> {
  try {
    if (req.method !== "POST") {
      return new Response(JSON.stringify({ error: "Method not allowed" }), {
        status: 405,
        headers: { "Content-Type": "application/json" }
      });
    }

    const contentType = req.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      return new Response(JSON.stringify({ error: "Invalid content type" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    const requestBody = await req.json();
    const { personalDetails, careerObjectives, keySkills } = requestBody;

    if (!personalDetails || !careerObjectives || !keySkills) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    const advice = generateCareerAdvice(requestBody);

    return new Response(JSON.stringify({ advice }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}

function generateCareerAdvice({ personalDetails, careerObjectives, keySkills }: {
  personalDetails: string;
  careerObjectives: string;
  keySkills: string[];
}): string {
  // Placeholder logic for generating career advice based on input
  return `Based on your objectives of ${careerObjectives} and your key skills such as ${keySkills.join(", ")}, consider focusing on relevant industry trends and tailoring your resume accordingly.`;
}