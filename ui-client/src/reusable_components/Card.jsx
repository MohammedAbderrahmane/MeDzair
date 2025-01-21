function Card(params) {
  return (
    <fieldset class="card">
      <legend>{params.title}</legend>
      {params.children}
    </fieldset>
  );
}

export default Card;
