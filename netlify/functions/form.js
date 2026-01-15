exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: "Method Not Allowed",
    };
  }

  const params = new URLSearchParams(event.body);

  const name = params.get("name");
  const email = params.get("email");
  const phone = params.get("phone");
  const type = params.get("type");
  const message = params.get("message");

  console.log("📩 Nuevo contacto");
  console.log({ name, email, phone, type, message });

  return {
    statusCode: 302,
    headers: {
      Location: "https://lasfloresdelareina.cl/pages/contacto-gracias",
    },
  };
};

