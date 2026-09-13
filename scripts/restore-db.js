// Restores mongoexport-style JSON dumps (extended JSON, $oid/$date) into MongoDB.
// Usage: node scripts/restore-db.js <path-to-dump-dir>
// Expects files named cabdatas.json, evacuations.json, events.json,
// schemefloors.json, timetables.json, tokens.json, users.json.
import fs from "fs";
import path from "path";
import { MongoClient } from "mongodb";
import { EJSON } from "bson";
import dotenv from "dotenv";

dotenv.config();

const COLLECTIONS = [
    "cabdatas",
    "evacuations",
    "events",
    "schemefloors",
    "timetables",
    "tokens",
    "users",
];

async function restoreCollection(db, dumpDir, name) {
    const file = path.join(dumpDir, `${name}.json`);
    if (!fs.existsSync(file)) {
        console.log(`skip ${name}: ${file} not found`);
        return;
    }

    const raw = fs.readFileSync(file, "utf8");
    const docs = EJSON.parse(raw, { relaxed: false });
    if (!Array.isArray(docs) || docs.length === 0) {
        console.log(`skip ${name}: empty`);
        return;
    }

    const collection = db.collection(name);
    const ops = docs.map((doc) => ({
        replaceOne: { filter: { _id: doc._id }, replacement: doc, upsert: true },
    }));
    const result = await collection.bulkWrite(ops);
    console.log(`${name}: upserted ${result.upsertedCount}, matched ${result.matchedCount}`);
}

async function main() {
    const dumpDir = process.argv[2];
    if (!dumpDir) {
        console.error("Usage: node scripts/restore-db.js <path-to-dump-dir>");
        process.exit(1);
    }

    const client = new MongoClient(process.env.DB_URL);
    await client.connect();
    const db = client.db();

    for (const name of COLLECTIONS) {
        await restoreCollection(db, dumpDir, name);
    }

    await client.close();
    console.log("done");
}

main().catch((e) => {
    console.error(e);
    process.exit(1);
});
