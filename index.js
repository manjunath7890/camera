const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

// Gmail transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "cameraview7892210@gmail.com",
    pass: "lbyb pwky ddrs xjjm", // Gmail App Password
  },
});

app.post("/send-alert", async (req, res) => {
  const { label, mapped_names, original, duration, email } = req.body;

  // Receiver email from Python
  const receiverEmail = email || "flyingfortress289@gmail.com";  
  // fallback to your default email

  // Join all mapped model classes
  const classesList =
    mapped_names && mapped_names.length ? mapped_names.join(", ") : label;

  const mailOptions = {
    from: "Camera <cameraview7892210@gmail.com>",
    to: receiverEmail,   // <-- DYNAMIC RECEIVER EMAIL
    subject: "Camera (Lake View) - Animal Alert",
    text: `
⚠️ ALERT: Animal Detected Near Lake

Detected: ${classesList}
Model Original Class: ${original}
Tracked Duration: ${duration.toFixed(1)} seconds

Stay alert!
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
    res.send("Email sent successfully");
  } catch (error) {
    console.error("Mail error:", error);
    res.status(500).send("Mail failed");
  }
});

app.listen(4000, () => {
  console.log("📨 Node Email Server running on port 4000");
});
