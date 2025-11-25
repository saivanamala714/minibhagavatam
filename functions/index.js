const functions = require("firebase-functions");
const https = require("https");
const cors = require("cors")({origin: true});

exports.askGita = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    // Only allow POST requests
    if (req.method !== "POST") {
      return res.status(405).json({error: "Method Not Allowed"});
    }

    try {
      const {question} = req.body;

      if (!question) {
        return res.status(400).json({error: "Question is required"});
      }

      const postData = JSON.stringify({question});

      const options = {
        hostname: "bhagavad-gita-qa-669294246288.us-central1.run.app",
        path: "/ask",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(postData),
        },
      };

      const apiRequest = https.request(options, (apiRes) => {
        if (apiRes.statusCode < 200 || apiRes.statusCode >= 300) {
          console.error(`API request failed with status ${apiRes.statusCode}`);
          return res.status(500).json({error: "Failed to process your request"});
        }

        let responseBody = "";
        apiRes.on("data", (chunk) => {
          responseBody += chunk;
        });

        apiRes.on("end", () => {
          try {
            const data = JSON.parse(responseBody);
            res.status(200).json(data);
          } catch (e) {
            console.error("Failed to parse response", e);
            res.status(500).json({error: "Failed to parse API response"});
          }
        });
      });

      apiRequest.on("error", (e) => {
        console.error("API Request Error:", e);
        res.status(500).json({error: "Failed to process your request"});
      });

      apiRequest.write(postData);
      apiRequest.end();
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({error: "Failed to process your request"});
    }
  });
});

