import dns from "dns";

try {
  dns.setServers(["8.8.8.8", "8.8.4.4"]);
  if (typeof (dns as any).setDefaultResultOrder === "function") {
    (dns as any).setDefaultResultOrder("ipv4first");
  }
} catch {}

import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

// Direct seed list fallback for Windows environments where SRV resolution can be flaky
const FALLBACK_DIRECT_URI =
  "mongodb://okobizdev3_db_user:XGiFu71kzZcNVBg9@ac-ejnput9-shard-00-00.zyouwzx.mongodb.net:27017,ac-ejnput9-shard-00-01.zyouwzx.mongodb.net:27017,ac-ejnput9-shard-00-02.zyouwzx.mongodb.net:27017/Texpart?ssl=true&replicaSet=atlas-ejnput-shard-0&authSource=admin&retryWrites=true&w=majority";

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

export async function connectToDatabase() {
  try {
    dns.setServers(["8.8.8.8", "8.8.4.4"]);
  } catch {}

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 8000,
    };

    cached.promise = mongoose
      .connect(MONGODB_URI as string, opts)
      .catch((err) => {
        if (err?.code === "ECONNREFUSED" || err?.message?.includes("querySrv")) {
          console.warn("[MongoDB] SRV resolution failed, falling back to direct replica set URI...");
          return mongoose.connect(FALLBACK_DIRECT_URI, opts);
        }
        throw err;
      })
      .then((mongooseInstance) => {
        return mongooseInstance;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}
