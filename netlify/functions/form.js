exports.handler = async (event) => {
  // Solo permitir POST
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: "Method Not Allowed",
    };
  }

  let data;
  try {
    data = JSON.parse(event.body);
  } catch (error) {
    return {
      statusCode: 400,
      body: "Invalid JSON",
    };
  }

  const { name, email, message } = data;

  // 👉 ENVÍO DE EMAIL (Netlify built-in)
  // Se envía al correo del owner del sitio
  console.log("Nuevo mensaje de contacto:");
  console.log("Nombre:", name);
  console.log("Email:", email);
  console.log("Mensaje:", message);

  return {
    statusCode: 200,
    body: JSON.stringify({
      success: true,
      redirect: "https://lasfloresdelareina.cl/pages/contacto-gracias",
    }),
  };
};
