function ErrorDiv({ errorType, errorMessage }) {
  return (
    <div className="error-div">
      <h1>{errorType || "404"}</h1>
      <h1>{errorMessage || "Page not found"}</h1>
    </div>
  );
}

export default ErrorDiv;
