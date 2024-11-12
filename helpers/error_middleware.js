import ErrorTypes from "../helpers/error_types.js";

const specificErrorHandler = (error, request, response, next) => {
  switch (error.name) {
    case "DEFINED_ERROR":
      return response.status(401).json({ error: "error message" });
    case "Bad Request":
      return response
        .status(ErrorTypes.BAD_REQUEST)
        .json({ error: "The body is missing attributes" });
    case "Blog Not Found":
      return response
        .status(ErrorTypes.NOT_FOUND)
        .json({ error: "The blog was not found" });
  }
  next(error);
};

const generalErrorHandler = (error, request, response, next) => {
  console.log("🤮", error.name, error.message, "🤮");
  response
    .status(ErrorTypes.UNSUPPORTED_MEDIA_TYPE)
    .json({ error: error.message });
};

export { specificErrorHandler, generalErrorHandler };
