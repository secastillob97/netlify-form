exports.handler = async (event) => {
  try {
    // Permitir solo POST
    if (event.httpMethod !== "POST") {
      return {
        statusCode: 405,
        body: "Method Not Allowed",
      };
    }

    // Parsear datos tipo formulario (NO JSON)
    const params = new URLSearchParams(event.body);

    const name = params.get("name");
    const email = params.get("email");
    const message = params.get("message");
    const type = params.get("type-of-dude"); // tu campo problemático

    // Log para pruebas (lo ves en Netlify → Functions → Logs)
    console.log({ name, email, message, type });

    return {
      statusCode: 200,
      body: "OK",
    };
  } catch (error) {
    console.error("ERROR:", error);

    return {
      statusCode: 500,
      body: "Server error",
    };
  }
};
