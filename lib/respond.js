// require node modules

// file imports

// static base path: location of your static folder

// respond to a request
// following is a function passed to createServer use to create the server
const respond = (request, response) => {
  response.write('respond fired!');
  response.end();
  
  // before working with the path name, you need to decide it
  // get the corresponding full static path located in the static folder
  // can we find something in fullStaticPath?
  // no: send '404: File not found!'
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
