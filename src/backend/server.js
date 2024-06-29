import * as http from "http";
import * as url from "url";
import * as db from "./db.js";
import * as fsp from "fs/promises";

//Each Gacha has an Id, a Name and an Img associated with it. 
//I want devs to be able to use DevPage to create new Gacha

const headerFields = { "Content-Type": "text/plain" };

//This function makes new gacha
async function createGacha(response, id, name, img) {
    console.log("a")
    if (!id) {
        response.writeHead(400, headerFields);
        response.write("<h1>Gacha ID Required</h1>");
        response.end();
    } else if(!img){
        response.writeHead(400, headerFields);
        response.write("<h1>Gacha img Required</h1>");
        response.end();
    }else if(!name){
        response.writeHead(400, headerFields);
        response.write("<h1>Gacha name Required</h1>");
        response.end();
    }else {
        try {
            console.log("a2")
            await db.saveGacha(id, name, img);
            console.log("a3")
            response.writeHead(200, headerFields);
            response.write(`<h1>Gacha ${id} Created</h1>`);
            response.end();
            console.log("a4")
        } catch (err) {
            response.writeHead(500, headerFields);
            response.write("<h1>Internal Server Error</h1>");
            response.write("<p>Unable to create gacha</p>");
            response.write(`<p>This is likely a duplicate gacha name!</p>`);
            response.end();
        }
    }
}

//This function should print the requested gacha in response
async function readGacha(response, id) {
    try {
        const gacha = await db.loadGacha(id);
        response.writeHead(200, headerFields);
        response.write(`<h1>Gacha id = ${gacha._id}, name = ${gacha.name}, img = ${gacha.img}</h1>`);
        response.end();
    } catch (err) {
        response.writeHead(404, headerFields);
        response.write(`<h1>Gacha ${id} Not Found</h1>`);
        response.end();
    }
}

//this function should find a gacha with a given ID and give it a new name & img
async function updateGacha(response, id, newName, newImg) {
    try {
        let gacha = await db.loadGacha(id);
        gacha.name = newName;
        gacha.img = newImg;
        await db.modifyGacha(gacha);
        response.writeHead(200, headerFields);
        response.write(`<h1>Gacha ${gacha._id} Updated</h1>`);
        response.end();
    } catch (err) {
        response.writeHead(404, headerFields);
        response.write(`<h1>Gacha ${id} Not Found</h1>`);
        response.end();
    }
}


//this function should delete the gacha
async function deleteGacha(response, id) {
    try {
        const gacha = await db.loadGacha(id);
        await console.log(gacha)
        response.writeHead(200, headerFields);
        response.write(`<h1>Gacha ${gacha._id} Deleted</h1>`);
        response.end();
        db.removeGacha(id);
    } catch (err) {
        response.writeHead(404, headerFields);
        response.write(`<h1>Gacha ${id} Not Found</h1>`);
        response.end();
    }
}

async function basicServer(request, response) {
    const parsedUrl = url.parse(request.url, true);
    const options = parsedUrl.query;
    console.log(options)
    const pathname = parsedUrl.pathname;
    // Check if the request method and path are equal to the given method and path
    const isEqual = (method, path) =>
        request.method === method && request.url === path;

    // Match the request method and path
    const isMatch = (method, path) =>
        request.method === method && request.url.startsWith(path);

    // Check if the request URL ends with a specific suffix
    const hasSuffix = (suffix) =>
        request.method === "GET" && request.url.endsWith(suffix);

    // Get the suffix of the request URL
    const getSuffix = (urlpath = request.url) => {
        const parts = urlpath.split(".");
        return parts[parts.length - 1];
    };

    const getContentType = (urlpath = request.url) =>
        ({
          html: "text/html",
          css: "text/css",
          js: "text/javascript",
        })[getSuffix(urlpath)] || "text/plain";
    
      const sendStaticFile = async (urlpath = request.url) => {
        try {
          // Read the file from the src/client folder and send it back to the client
          const data = await fsp.readFile("src" + urlpath, "utf8");
          response.writeHead(200, { "Content-Type": getContentType(urlpath) });
          response.write(data);
          response.end();
          return;
        } catch (err) {
          response.writeHead(404, { "Content-Type": "text/plain" });
          response.write("Not found: " + urlpath);
          response.end();
          return;
        }
      };
    

    if (isMatch("PUT", "/update")) {
        await updateGacha(response, options.id, options.name, options.img)
        return;
    }

    if (isMatch("GET", "/read")) {
        await readGacha(response, options.id);
        return;
    }

    if (isMatch("DELETE", "/delete")) {
        await deleteGacha(response, options.id);
        return;
    }

    if (isMatch("POST", "/create")) {
        await createGacha(response, options.id, options.name, options.img);
        return;
    }

    if (
        isEqual("GET", "") ||
        isEqual("GET", "/") ||
        isEqual("GET", "/client") ||
        isEqual("GET", "/client/") ||
        isEqual("GET", "/client/DevPage.html")
      ) {
        sendStaticFile("/client/DevPage.html");
        return;
      }
    
      if (
        (isMatch("GET", "") || isMatch("GET", "/")) &&
        (hasSuffix(".html") || hasSuffix(".css") || hasSuffix(".js"))
      ) {
        sendStaticFile("/client" + request.url);
        return;
      }
      response.writeHead(405, { "Content-Type": "text/plain" });
      response.end("Method Not Allowed");
}

//this is supposed to run the server on port 3260
http.createServer(basicServer).listen(3260, () => {
    console.log("Server started on port 3260");
});