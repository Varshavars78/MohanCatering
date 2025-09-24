// Node 18+ runtime (in Vercel). Install @sendgrid/mail in project root: npm i @sendgrid/mail
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { name, email, phone, meal, quantity, total, eventDate } = req.body;

  const msg = {
    to: process.env.TO_EMAIL,
    from: process.env.FROM_EMAIL,
    subject: `New Catering Order from ${name} — ${meal}`,
    html: `
      <h3>New Order</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Meal:</strong> ${meal}</p>
      <p><strong>Quantity:</strong> ${quantity}</p>
      <p><strong>Total:</strong> ₹${total}</p>
      <p><strong>Event date:</strong> ${eventDate}</p>
    `,
  };

  try {
    await sgMail.send(msg);
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to send email" });
  }
}
