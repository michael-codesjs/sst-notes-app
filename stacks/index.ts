import API from "./api";
import Storage from "./storage";
import { App } from "@serverless-stack/resources";

export default function (app: App) {
  app.setDefaultFunctionProps({
    runtime: "nodejs16.x",
    srcPath: "services",
    bundle: {
      format: "esm",
    },
  });
  
  app
  .stack(Storage)
  .stack(API);
}
