const axios = require('axios');
const https = require('https');
require('dotenv').config(); // Loads environment variables from .env

// Create an axios instance with custom HTTPS settings (for development)
const secureAxios = axios.create({
  httpsAgent: new https.Agent({
    rejectUnauthorized: false // Only for development; enforce validation in production.
  })
});

// Helper function to completely clean markdown formatting
function cleanMarkdownFormatting(text) {
  if (!text) return '';
  
  return text
    // Remove heading markers
    .replace(/^#{1,6}\s*/gm, '')
    // Remove bold formatting
    .replace(/\*\*/g, '')
    // Remove italic formatting
    .replace(/\*/g, '')
    // Remove emphasis with underscores
    .replace(/_{1,2}/g, '')
    // Convert bullet points to plain text
    .replace(/^\s*[-+*]\s+/gm, '• ')
    // Remove code blocks
    .replace(/```[\s\S]*?```/g, '')
    // Remove inline code
    .replace(/`/g, '')
    // Convert markdown links to just text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    // Remove blockquotes
    .replace(/^\s*>\s*/gm, '')
    // Remove horizontal rules
    .replace(/^-{3,}\s*$/gm, '')
    // Fix excessive whitespace
    .replace(/\n{3,}/g, '\n\n')
    // Trim whitespace
    .trim();
}

// @desc    Generate job description using Gemini API
// @route   POST /api/ai/generate-description
// @access  Private
exports.generateJobDescription = async (req, res) => {
  try {
    console.log('Received job description generation request:', req.body);

    const {
      title,
      company,
      department,
      experienceLevel,
      skills,
      location,
      contractType,
      salaryRange
    } = req.body;

    // Validate required fields
    if (!title || !company || !department || !experienceLevel || !skills || !location || !contractType) {
      console.error('Missing required fields:', {
        title: !title,
        company: !company,
        department: !department,
        experienceLevel: !experienceLevel,
        skills: !skills,
        location: !location,
        contractType: !contractType
      });
      return res.status(400).json({
        success: false,
        error: 'Please provide all required job details'
      });
    }

    // Validate skills array
    if (!Array.isArray(skills) || skills.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Skills must be a non-empty array'
      });
    }

    // Build the prompt for the job description
    const prompt = `Write a complete, original job description for a ${experienceLevel} ${title} at ${company} in the ${department} department.

Use all of the following information in your description:
- Position: ${title}
- Experience Level: ${experienceLevel}
- Company: ${company}
- Department: ${department}
- Location: ${location}
- Employment Type: ${contractType}
- Required Skills: ${skills.join(", ")}
${salaryRange ? `- Compensation: ${salaryRange}` : ""}

Be creative and avoid generic language. Write as if this is being posted on a job board to attract qualified candidates.

The job description should be comprehensive, professional, and engaging. Include:
- What the role involves day-to-day
- The impact this position has on the company
- Required and preferred qualifications
- Company culture and benefits
- Growth opportunities

IMPORTANT: DO NOT use ANY markdown formatting in your response. Do not use #, ##, *, **, _, -, or any other special characters for formatting. Provide the job description in simple plain text only.`;

    console.log('Making request to Gemini API with prompt:', prompt);

    // Verify that the API key is being loaded correctly
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY || 'AIzaSyCEz23cJZIQBpT5qHtIlav6pJB3MiqlEYs';
    
    if (!GEMINI_API_KEY) {
      console.error('GEMINI_API_KEY is not available');
      return res.status(500).json({
        success: false,
        error: 'API key configuration error'
      });
    } else {
      console.log('Using Gemini API key:', GEMINI_API_KEY.slice(0, 8) + '...'); // Log first few characters only
    }

    // Prepare the Gemini API request
    const geminiEndpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;
    
    // Explicit system instruction to avoid markdown formatting
    const systemInstruction = "You are a professional job description writer. Create engaging and detailed job descriptions that attract qualified candidates. IMPORTANT: Do not use any markdown formatting characters in your responses. Do not use hashtags (#), asterisks (*), underscores (_), or any other special characters for formatting. Provide plain text only.";
    
    // Make the API call to Gemini
    const response = await secureAxios.post(
      geminiEndpoint,
      {
        contents: [
          {
            parts: [
              {
                text: `${systemInstruction} ${prompt}`
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 1000,
          topP: 0.95,
          topK: 40
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          }
        ]
      },
      {
        headers: {
          'Content-Type': 'application/json'
        },
        timeout: 60000 // 60-second timeout
      }
    );

    // Process the Gemini API response
    if (response.data && response.data.candidates && response.data.candidates.length > 0) {
      let description = "";
      
      // Collect text from all parts in the response
      if (response.data.candidates[0].content && response.data.candidates[0].content.parts) {
        const parts = response.data.candidates[0].content.parts;
        description = parts.map(part => part.text || "").join("\n").trim();
      }
      
      if (description) {
        // Apply thorough markdown cleaning
        const cleanDescription = cleanMarkdownFormatting(description);
        
        console.log('Successfully generated description');
        return res.status(200).json({
          success: true,
          description: cleanDescription
        });
      } else {
        console.error('Empty content in Gemini API response:', response.data);
        return res.status(500).json({
          success: false,
          error: 'Gemini API returned empty content'
        });
      }
    } else {
      console.error('Unexpected response structure from Gemini API:', response.data);
      return res.status(500).json({
        success: false,
        error: 'Gemini API returned an unexpected response'
      });
    }
    
  } catch (error) {
    // Extract error details
    const errorData = error.response ? error.response.data : { error: { message: error.message } };
    console.error('Error calling Gemini API:', errorData);
    
    // Check for specific Gemini API errors
    if (errorData.error) {
      // Handle rate limiting
      if (errorData.error.code === 429) {
        return res.status(429).json({
          success: false,
          error: 'Rate limit exceeded for Gemini API',
          details: 'Please try again later'
        });
      }
      
      // Handle authentication errors
      if (errorData.error.code === 401 || errorData.error.code === 403) {
        return res.status(401).json({
          success: false,
          error: 'Authentication error with Gemini API',
          details: 'Please check your API key'
        });
      }
    }
    
    return res.status(500).json({
      success: false,
      error: 'Server error in job description generation',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};