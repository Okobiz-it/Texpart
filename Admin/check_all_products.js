const fs = require("fs");
const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);
const mongoose = require("mongoose");
const envContent = fs.readFileSync("d:/Texpert/Client/.env.local", "utf8");
let uri = "";
for (const line of envContent.split("\n")) {
  if (line.startsWith("MONGODB_URI=")) {
    uri = line.slice(line.indexOf("=") + 1).trim();
  }
}
mongoose.connect(uri).then(async () => {
  const db = mongoose.connection.db;
  const products = await db.collection("products").find({}).toArray();
  for (const p of products) {
    console.log(p.slug, "| division:", p.division, "| featured:", p.isFeatured, "| frontImage:", p.frontImage, "| images:", JSON.stringify(p.images));
  }
  process.exit(0);
}).catch(e => {
  console.error(e);
  process.exit(1);
});
