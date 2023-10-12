import axios from "axios";
import { explainCode } from "./openAI";

// Retrieve your GitHub authentication token from environment variables
const token = process.env.GITHUB_AUTH_TOKEN;

export async function getPatch(patchUrl: string) {
  let answer;
  try {
    // Make an HTTP request to fetch the patch content
    const patchContent = await axios.get(patchUrl, {
      headers: {
        Authorization: `token ${token}`,
      },
    });
    const apiData = patchContent.data;
    // Extract code changes from the patch content
    answer = getContents(apiData);
    // console.log("The contents is ",typeof(contents));
  } catch (err) {
    console.error(err);
  }
  return answer;
}

function getContents(data: string) {
    const lines = data.split("\n");
    const returningData: string[] = [];
  
    // Iterate through the lines and identify the lines starting with '+'
    for (const line of lines) {
      if (line.startsWith("+")) {
        // Remove the '+' character and push the line to the new updates array
        returningData.push(line.slice(1));
      }
    }
  
    // Convert the array to a multiline string
    const result = returningData.join('\n');
    return result;
  }
  
