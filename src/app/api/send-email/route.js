import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { email, htmlContent, codeContent } = await req.json();

    if (!email || !htmlContent || !codeContent) {
      return new Response(JSON.stringify({ message: "Invalid request" }), {
        status: 400,
      });
    }

    const fromEmailId = process.env.userEmail;

    // Set up the transporter with your email service credentials
    let transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: fromEmailId,
        pass: process.env.userEmailPassCode,
      },
    });

    // Email options
    const mailOptions = {
      from: fromEmailId,
      to: email,
      subject: "Email Templates Testing📩🚀",
      text: `Here is the code:\n\n${codeContent}`, // Plain text version
      html: htmlContent, // HTML version
      attachments: [
        {
          filename: "code.txt",
          content: codeContent,
        },
      ],
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return new Response(
      JSON.stringify({ message: "Email sent successfully" }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return new Response(JSON.stringify({ message: "Error sending email" }), {
      status: 500,
    });
  }
}
