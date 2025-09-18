const http = require("http");
const fs = require("fs");
const {
  paginate,
  getId,
  createNotes,
  updateNote,
  deleteNotes,
} = require("./utils/getNotes");
const server = http.createServer((req, res) => {
  let notes = [];
  try {
    const raw = fs.readFileSync("notes.json", "utf-8");
    const parsed = raw ? JSON.parse(raw) : [];
    notes = Array.isArray(parsed) ? parsed : [parsed];
  } catch (err) {
    console.error("Failed to read/parse notes.json:", err);
    notes = [];
  }
  const { method, url } = req;
  const parsedUrl = new URL(url, `http://${req.headers.host}`);
  const pathname = parsedUrl.pathname;
  const params = Object.fromEntries(parsedUrl.searchParams);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }
  if (params.id && method == "GET") {
    const data = getId(notes, params.id);
    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify(data));
  }
  if (params.page && params.limit) {
    if (method == "GET" && pathname === "/notes") {
      const data = paginate(notes, params.page, params.limit);
      res.writeHead(200, { "Content-Type": "application/json" });
      return res.end(JSON.stringify(data));
    }
  }
  if (method === "POST" && pathname === "/notes") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      try {
        const parsedBody = JSON.parse(body);
        const newnotes = createNotes(notes, parsedBody);
        res.writeHead(200, { "Content-Type": "application/json" });
        return res.end(
          JSON.stringify({
            message: "Note created successfully",
            note: newnotes,
          })
        );
      } catch (err) {
        console.error("Error in creating a new note", err);
        res.writeHead(400, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({ error: "Invalid JSON" }));
      }
    });
    req.on("error", (err) => {
      console.error("Request error:", err);
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Request error" }));
    });
    return; 
  }
  if (method === "PUT" && params.id) {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      try {
        const updated = updateNote(params.id, notes, JSON.parse(body));
        res.writeHead(200, { "Content-Type": "application/json" });
        return res.end(
          JSON.stringify({
            message: "Updated success fully ",
            "Updated notes :": updated,
          })
        );
      } catch (err) {
        console.error("Error in updating the note :", err);
      }
    });
    req.on("error", (err) => {
      console.error("Request error:", err);
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Request error" }));
    });
    return;
  }
  if (method === "DELETE" && params.id) {
    if (deleteNotes(params.id, notes)) {
      res.writeHead(200, { "Content-Type": "application/json" });
      return res.end(
        JSON.stringify({ message: "Note have been deleted successfully" })
      );
    } else {
      res.writeHead(200, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ message: "Error in deleting note" }));
    }
  }
  res.writeHead(500, { "Content-Type": "application/json" });
  return res.end("Internal server error");
});
server.listen(3000);
