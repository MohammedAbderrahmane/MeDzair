import { Match, Switch } from "solid-js";
import ErrorDiv from "./ErrorDiv";
import LoadingDiv from "./LoadingDiv";

function Resource({
  resource,
  RenderComponent,
  LoadingIndicator,
  ErrorDisplay,
}) {
  return (
    <Switch>
      <Match when={resource.loading}>
        <LoadingDiv />
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
