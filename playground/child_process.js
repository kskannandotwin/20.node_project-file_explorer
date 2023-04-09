const {execSync} = require("child_process");

try {
  const result = execSync(
    `du -sh "/d/udemy/web development/development island/projects/20.node_project-file_explorer"`
  ).toString();
  console.log(result);
} catch (err) {
  console.log(`Error: ${err}`);
}