import { Probot } from "probot";
import axios from "axios";
import { getPatch } from "./patch";
import { explainCode } from "./openAI";

export = (app: Probot) => {
  // Handle the "issues.opened" event
  app.on("issues.opened", async (context) => {
    app.log.info("opened", context);

    // Create a comment when an issue is opened
    const issueComment = context.issue({
      body: "🎉 Thanks for opening this issue! 🚀😄",
    });
    return context.octokit.issues.createComment(issueComment);
  });

  // Handle the "issue_comment" event
  app.on(["issue_comment"], async (context) => {
    const comment = context.payload.comment;

    // Get the patch URL from the PR if available
    const patchUrl: string =
      context.payload.issue.pull_request?.patch_url || "";

    // Check if the comment includes the "/execute" command
    if (comment.body.includes("/execute")) {
      // app.log.info("This is the Comment on Issue payload", context.payload);

      // Fetch code snippet from the provided patch URL
      const codeSnippet = await getPatch(patchUrl);
      const promptAnswer = await explainCode(codeSnippet)
      // console.log("This is the Answer:", promptAnswer);

      // Create a response comment
      const response = promptAnswer;
      // const response =
      //   "🌟 Hello! Thanks for commenting! 😊 We'll reach out to you soon. 🚀📞💬";
      await context.octokit.issues.createComment({
        owner: context.payload.repository.owner.login,
        repo: context.payload.repository.name,
        issue_number: context.payload.issue.number,
        body: response,
      });
    }
  });
};
