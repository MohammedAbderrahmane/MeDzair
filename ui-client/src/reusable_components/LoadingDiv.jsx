import "./loader.css";

function LoadingDiv({ errorType, errorMessage }) {
  return (
    <div className="loading-div">
      <Loader />
    </div>
  );
}

// From Uiverse.io by AbanoubMagdy1
const Loader = () => (
  <div class="loader">
    <div class="circle"></div>
    <div class="circle"></div>
    <div class="circle"></div>
    <div class="circle"></div>
  </div>
);

export default LoadingDiv;
