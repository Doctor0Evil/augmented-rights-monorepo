import { startServer } from "./server";
import { config } from "@augmented-rights/services-common/src/config";

startServer(config.port + 2).catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err);
  process.exit(1);
});
