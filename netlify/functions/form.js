const nodemailer = require("nodemailer");

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const params = new URLSearchParams(event.body);

  const name = params.get("name");
  const email = params.get("email");
  const phone = params.get("phone");
  const type = params.get("type");
  const message = params.get("message");

  // 🔹 Transporter SMTP
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  /* ===============================
     📩 EMAIL PARA TI (ADMIN)
  =============================== */
  await transporter.sendMail({
    from: `"Formulario Web" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER,
    subject: "🌸 Nuevo mensaje de contacto",
    html: `
      <h2>Nuevo contacto desde la web</h2>
      <p><strong>Nombre:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Teléfono:</strong> ${phone}</p>
      <p><strong>Tipo:</strong> ${type}</p>
      <p><strong>Mensaje:</strong><br>${message}</p>
    `,
  });

  /* ===============================
     📬 EMAIL PARA EL CLIENTE
  =============================== */
  await transporter.sendMail({
    from: `"Las Flores de la Reina" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Hemos recibido tu mensaje 🌸",
    html: `
      <p>Hola <strong>${name}</strong>,</p>

      <p>Gracias por contactarte con <strong>Las Flores de la Reina</strong>.</p>

      <p>Hemos recibido tu mensaje y te responderemos a la brevedad.</p>

      <p style="margin-top:20px;">
        🌷<br>
        <strong>Las Flores de la Reina</strong><br>
        Atención personalizada y floral
      </p>
    `,
  });

  return {
    statusCode: 302,
    headers: {
      Location: "https://lasfloresdelareina.cl/pages/contacto-gracias",
    },
  };
};
