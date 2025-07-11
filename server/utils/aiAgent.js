import { createAgent, gemini } from "@inngest/agent-kit";
import User from "../models/user.model.js";

const analyzeTicket = async (ticket) => {
  // Get unique moderator skills
  const moderatorSkills = await User.find({ role: "moderator" }, "skills")
    .then((users) => [...new Set(users.flatMap((user) => user.skills || []))])
    .catch((err) => {
      console.error("Error fetching moderator skills:", err);
      return [];
    });

  const supportAgent = createAgent({
    model: gemini({
      model: "gemini-1.5-flash-8b",
      apiKey: process.env.GEMINI_API_KEY,
    }),
    name: "AI Ticket Triage Assistant",
    system: `
You are a senior AI agent that processes technical support tickets and returns structured JSON.

Your responsibilities:
1. Summarize the issue.
2. Estimate ticket priority.
3. Write technical notes to help moderators solve the issue.
4. Output a clean array of related technical skills in "relatedSkills".

INSTRUCTIONS FOR SKILL NORMALIZATION:

- Use **exact skill names** from the moderator skill list when possible.
- If a matching skill is not found in that list, use the **most widely accepted name** in the tech community (avoid aliases, casing differences, or extensions like ".js").
- Examples:
  - "ReactJS", "React.js", "react" → "React"
  - "nodejs", "NodeJs", "Node.js" → "Node.js"

Known moderator skill names:
[${moderatorSkills.join(", ")}]

⚠️ Output must be raw valid JSON only — no markdown, no code fences, no comments.
Format:
{
  "summary": "...",
  "priority": "medium",
  "helpfulNotes": "...",
  "relatedSkills": ["React", "Node.js"]
}
    `.trim(),
  });

  const response = await supportAgent.run(`
Analyze the following ticket and return a JSON object with:

- summary: 1–2 line summary.
- priority: "low", "medium", or "high".
- helpfulNotes: Clear guidance + useful technical resources.
- relatedSkills: Array of normalized skills required to solve the issue.

Use moderator skill names if there's a close match.
Else, use the cleanest, most accepted industry name for the skill.

Known moderator skills:
[${moderatorSkills.join(", ")}]

---

Ticket:

- Title: ${ticket.title}
- Description: ${ticket.description}

Respond ONLY with a strict JSON object like:

{
  "summary": "...",
  "priority": "medium",
  "helpfulNotes": "...",
  "relatedSkills": ["React", "MongoDB"]
}
  `.trim());

  const raw = response.output[0].context;

  try {
    const match = raw.match(/```json\\s*([\\s\\S]*?)\\s*```/i);
    const jsonString = match ? match[1] : raw.trim();
    return JSON.parse(jsonString);
  } catch (e) {
    console.log("Failed to parse JSON from AI response: " + e.message);
    return null;
  }
};

export default analyzeTicket;
