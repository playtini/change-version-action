const fs = require("fs");
const yaml = require("yaml");

const PATH_PATTERN = './helmfile/envs/{namespace}/services/{name}/version.yaml';
const core = require('@actions/core');

async function changeServiceVersion(name, version, namespace) {
  console.log(`Changing service ${namespace}/${name} to version ${version}`);
  const versionFile = getPath(name, namespace);
  if (!fs.existsSync(versionFile)) {
    core.setFailed(`Version file ${versionFile} not found`);
    return;
  }
  console.log(`Reading version file ${versionFile}`);
  const versionData = readYaml(versionFile);
  console.log(`Set prev version output: ${versionData.image.tag}`); 
  core.setOutput("previous-version", `${versionData.image.tag}`);
  versionData.image.tag = version;
  writeYaml(versionFile, versionData);
  console.log(`New version successfully set to ${version}`);
}

// Reads a YAML file and returns the parsed data
function readYaml(path) {
  const content = fs.readFileSync(path, 'utf8'); 
  return yaml.parse(content);
}

function writeYaml(path, data) {
  const content = yaml.stringify(data);
  fs.writeFileSync(path, content, 'utf8');
}

// Returns the path to the version file for a service
function getPath(name, namespace) {
  return PATH_PATTERN.replace('{name}', name).replace('{namespace}', namespace);
}

module.exports = {
  changeServiceVersion,
}