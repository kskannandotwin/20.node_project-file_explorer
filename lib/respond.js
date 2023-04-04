// require node modules
const url = require("url");
const path = require("path");
const fs = require("fs");

// file imports
const buildBreadcrumb = require('./breadcrumb.js');

// static base path: location of your static folder
const staticBasePath = path.join(__dirname, "..", "static");

// respond to a request
// following is a function passed to createServer use to create the server
const respond = (request, response) => {
  // before working with the path name, you need to decode it
  let pathname = url.parse(request.url, true).pathname;

  // if favicon.ico stop
  if (pathname === "/favicon.ico") {
    return false;
  }
  pathname = decodeURIComponent(pathname);

  // get the corresponding full static path located in the static folder
  const fullStaticPath = path.join(staticBasePath, pathname);

  // can we find something in fullStaticPath?
  // no: send '404: File not found!'
  if (!fs.existsSync(fullStaticPath)) {
    console.log(`${fullStaticPath} does not exist`);
    response.write("404: File not found!");
    response.end();
    return false;
  }
  // we found something
  // is it a file or directory?
  let stats;
  try {
    stats = fs.lstatSync(fullStaticPath);
    console.log(stats);
  } catch (err) {
    console.log(`lstatSync Error: ${err}`);
  }

  // it is a directory:
  if (stats.isDirectory()) {
    // get content from the template index.html
    let data = fs.readFileSync(
      path.join(staticBasePath, "project-files/index.html"),
      "utf-8"
    );

    // build the page title
    console.log(pathname);
    let pathElements = pathname.split('/').reverse();
    pathElements = pathElements.filter(element => element !== '');
    const folderName = pathElements[0];
    console.log(folderName);
    data = data.replace('page_title', folderName);    
    
    // build breadcrumb
    const breadcrumb = buildBreadcrumb(pathname);
    data = data.replace('pathname', breadcrumb);

    // build table rows(main-content)
    // fill the template data with: the page title, breadcrumb and table rows(main-content)
    // print data to the webpage
    response.statusCode = 200;
    response.write(data);
    response.end();
  }

  // it is not a directory but not a file either
  // send: 401: Access denied!
  // it is a file
  // let's get the file extension
  // get the file mime type and add it to the response header
  // get the file size and add it to the response header
  // pdf file? -> display in browser
  // audio/video file? -> stream in ranges
  // all other files stream in a normal way
};

module.exports = respond;
