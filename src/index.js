const core = require(`@actions/core`);
const { changeServiceVersion } = require("./utils");

async function run() {
  try {
    changeServiceVersion(core.getInput("service"), core.getInput("service_version"), core.getInput("namespace"))
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();