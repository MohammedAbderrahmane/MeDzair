import ErrorTypes from "../helpers/error_types.js";

const specificErrorHandler = (error, request, response, next) => {
  switch (error.code) {
    case "DEFINED_ERROR":
      return response
        .status(ErrorTypes.NOT_IMPLEMENTED)
        .json({ error: "error message" });
    case "SESSION_EXPIRED":
      return response
        .status(ErrorTypes.SESSION_EXPIRED)
        .json({ error: error.message });
    case "NOT_FOUND":
      return response
        .status(ErrorTypes.NOT_FOUND)
        .json({ error: error.message });
    case "UNAUTHORIZED":
      return response
        .status(ErrorTypes.UNAUTHORIZED)
        .json({ error: error.message });
    case "ENOENT":
      return response
        .status(ErrorTypes.NOT_FOUND)
        .json({ error: error.message });
    case "EACCES":
      return response
        .status(ErrorTypes.FORBIDDEN)
        .json({ error: error.message });
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
  response.status(ErrorTypes.NOT_IMPLEMENTED).json({ error: error.message });
};

export { specificErrorHandler, generalErrorHandler };
