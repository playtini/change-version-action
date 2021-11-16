const core = require(`@actions/core`);
const { changeServiceVersion } = require("./utils");

async function run() {
  try {
    const serviceName = core.getInput("service_name");
    const serviceVersion = core.getInput("service_version");
    const namespace = core.getInput("namespace");

    if (serviceName && serviceVersion && namespace) {
        changeServiceVersion(core.getInput("service"), core.getInput("service_version"), core.getInput("namespace"))
    } else {
        core.setFailed("Service name, version and namespace are required");
    }
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();