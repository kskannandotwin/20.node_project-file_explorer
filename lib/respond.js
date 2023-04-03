// require node modules
const url = require("url");
const path = require('path');
const fs = require('fs');
// file imports

// static base path: location of your static folder
const staticBasePath = path.join(__dirname, '..', 'static');

// respond to a request
// following is a function passed to createServer use to create the server
const respond = (request, response) => {
  // before working with the path name, you need to decode it
  let pathname = url.parse(request.url, true).pathname;

  // if favicon.ico stop
  if (pathname === '/favicon.ico') {
    return false;
  }
  pathname = decodeURIComponent(pathname);

  // get the corresponding full static path located in the static folder
  const fullStaticPath = path.join(staticBasePath, pathname);
  
  // can we find something in fullStaticPath?
  // no: send '404: File not found!'
  if(!fs.existsSync(fullStaticPath)) {
    console.log(`${fullStaticPath} does not exist`);
    response.write('404: File not found!');
    response.end();
  } else {
    response.write('File found!');
    response.end();
  }
  // we found something
  // is it a file or directory?
  // it is a directory:
  // get content from the template index.html
  // build the page title
  // build breadcrumb
  // build table rows(main-content)
  // fill the template data with: the page title, breadcrumb and table rows(main-content)
  // print data to the webpage
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
