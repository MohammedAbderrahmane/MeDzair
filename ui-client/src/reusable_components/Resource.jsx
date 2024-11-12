import { Match, Switch } from "solid-js";
import ErrorDiv from "./ErrorDiv";

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
        <ErrorDiv
          errorType={resource.error.status}
          errorMessage={resource.error.message}
        />
      </Match>
      <Match when={resource()}>
        {(resource) => RenderComponent(resource())}
      </Match>
    </Switch>
  );
}

export default Resource;
