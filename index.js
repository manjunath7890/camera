const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

// Gmail Nodemailer (works for you already)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "cameraview7892210@gmail.com",
    pass: "lbyb pwky ddrs xjjm", // your Gmail app password
  },
});

app.post("/send-alert", async (req, res) => {
  const { label, mapped_names } = req.body;

  // Join all detected classes
  const classesList = mapped_names && mapped_names.length
    ? mapped_names.join(", ")
    : label;

  const mailOptions = {
    from: "Camera <cameraview7892210@gmail.com>",
    to: "flyingfortress289@gmail.com",
    subject: "Camera (Lake View)",
    text: `${classesList} detected near lake.`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
    res.send("Email sent");
  } catch (error) {
    console.error("Mail error:", error);
    res.status(500).send("Mail failed");
  }
});

app.listen(4000, () => {
  console.log("📨 Node Email Server running on port 4000");
});
