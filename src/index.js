const core = require(`@actions/core`);
const { changeServiceVersion } = require("./utils");

async function run() {
  try {
    const serviceName = core.getInput("service");
    const serviceVersion = core.getInput("service_version");
    const namespace = core.getInput("namespace");

    if (serviceName && serviceVersion && namespace) {
        changeServiceVersion(serviceName, serviceVersion, namespace);
    } else {
        core.setFailed("Service name, version and namespace are required");
    }
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();