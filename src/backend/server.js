import * as http from "http";
import * as url from "url";
import * as db from "./db.js";
import * as fsp from "fs/promises";

async function createGacha(response, id, name, img) {
    if (!name || !id || !img) {
        response.writeHead(400, headerFields);
        response.write("<h1>Gacha Info Required</h1>");
        response.end();
    } else {
        try {
            await db.saveGacha(id, name, img);
            response.writeHead(200, headerFields);
            response.write(`<h1>Gacha ${name} Created</h1>`);
            response.end();
        } catch (err) {
            response.writeHead(500, headerFields);
            response.write("<h1>Internal Server Error</h1>");
            response.write("<p>Unable to create gacha</p>");
            response.write(`<p>This is likely a duplicate gacha name!</p>`);
            response.end();
        }
    }
}

async function readGacha(response, _id) {
    try {
        const gacha = await db.loadGacha(_id);
        response.writeHead(200, headerFields);
        response.write(`<h1>Gacha id = ${gacha._id}, name = ${gacha._name}, img = ${gacha._img}</h1>`);
        response.end();
    } catch (err) {
        response.writeHead(404, headerFields);
        response.write(`<h1>Gacha ${_id} Not Found</h1>`);
        response.end();
    }
}

async function updateGacha(response, _id, newName, newImg) {
    try {
        const gacha = await db.loadGacha(_id);
        gacha._name = newName;
        gacha._img = newImg;
        await db.modifyGacha(gacha);
        response.writeHead(200, headerFields);
        response.write(`<h1>Gacha ${gacha._id} Updated</h1>`);
        response.end();
    } catch (err) {
        response.writeHead(404, headerFields);
        response.write(`<h1>Gacha ${_id} Not Found</h1>`);
        response.end();
    }
}

async function deleteGacha(response, _id) {
    try {
        const gacha = await db.loadGacha(_id);
        response.writeHead(200, headerFields);
        response.write(`<h1>Gacha ${gacha._id} Deleted</h1>`);
        response.end();
        db.removeGacha(_id);
    } catch (err) {
        response.writeHead(404, headerFields);
        response.write(`<h1>Gacha ${name} Not Found</h1>`);
        response.end();
    }
}

async function basicServer(request, response) {
    const options = url.parse(request.url, true).query;

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

    // Get the content type based on the file type
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
        await updateGacha(response, options.name);
        return;
    }

    if (isMatch("GET", "/read")) {
        await readGacha(response, options.name);
        return;
    }

    if (isMatch("DELETE", "/delete")) {
        await deleteGacha(response, options.name);
        return;
    }

    if (isMatch("POST", "/create")) {
        await createGacha(response, options.name);
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
}

http.createServer(basicServer).listen(3260, () => {
    console.log("Server started on port 3260");
});