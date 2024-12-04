import ErrorTypes from "../helpers/error_types.js";

const specificErrorHandler = (error, request, response, next) => {
  switch (error.code) {
    case "DEFINED_ERROR":
      return response.status(401).json({ error: "error message" });
    case "ENOENT":
      return response.status(501).json({ error: error.message });
    case "BAD_REQUEST":
      return response
        .status(ErrorTypes.BAD_REQUEST)
        .json({ error: "The body is missing attributes" });
    case "BLOG_NOT_FOUND":
      return response
        .status(ErrorTypes.NOT_FOUND)
        .json({ error: "The blog was not found" });
  }
  next(error);
};

const generalErrorHandler = (error, request, response, next) => {
  console.log("🤮", error.code, "🤮", error.message, "🤮");
  response
    .status(ErrorTypes.UNSUPPORTED_MEDIA_TYPE)
    .json({ error: error.message });
};

export { specificErrorHandler, generalErrorHandler };
