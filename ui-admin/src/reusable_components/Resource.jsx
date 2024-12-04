import { Match, Switch } from "solid-js";

function Resource({
  resource,
  RenderComponent,
  LoadingIndicator,
  ErrorDisplay,
}) {
  return (
    <Switch>
      <Match when={resource.loading}>
        <p>Loading...</p>
      </Match>
      <Match when={resource.error}>
        <p>Error: {resource.error + ""}</p>
      </Match>
      <Match when={resource()}>
        {(resource) => RenderComponent(resource())}
      </Match>
    </Switch>
  );
}

export default Resource;
