exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: "Method Not Allowed",
    };
  }

  // Shopify envía form-data, no JSON
  const params = new URLSearchParams(event.body);

  const name = params.get("name");
  const email = params.get("email");
  const message = params.get("message");

  console.log("📩 Nuevo mensaje de contacto");
  console.log("Nombre:", name);
  console.log("Email:", email);
  console.log("Mensaje:", message);

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      success: true,
      redirect: "https://lasfloresdelareina.cl/pages/contacto-gracias",
    }),
  };
};
