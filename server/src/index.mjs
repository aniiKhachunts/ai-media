import express from "express";
import cors from "cors";
import {nanoid} from "nanoid";
import fs from "node:fs/promises";
import path from "node:path";
import {fileURLToPath} from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DB_PATH = path.join(__dirname, "..", "data", "tools.json");

async function ensureDbFile() {
    const dir = path.dirname(DB_PATH);
    await fs.mkdir(dir, {recursive: true});
    try {
        await fs.access(DB_PATH);
    } catch {
        await fs.writeFile(DB_PATH, "[]", "utf-8");
    }
}

async function readTools() {
    try {
        const json = await fs.readFile(DB_PATH, "utf-8");
        const data = JSON.parse(json);
        return Array.isArray(data) ? data : [];
    } catch (err) {
        if (err.code === "ENOENT") {
            return [];
        }
        throw err;
    }
}

async function writeTools(tools) {
    await fs.writeFile(DB_PATH, JSON.stringify(tools, null, 2), "utf-8");
}

const app = express();

app.use(
    cors({
        origin: "*",
    })
);

app.use(express.json());

app.get("/api/tools", async (req, res) => {
    try {
        const {category, pricing, featured} = req.query;

        let tools = await readTools();

        if (category && category !== "all") {
            tools = tools.filter((t) => t.category === category);
        }

        if (pricing && pricing !== "all") {
            tools = tools.filter((t) => t.pricing === pricing);
        }

        if (featured === "true") {
            tools = tools.filter((t) => t.featured);
        }

        res.json(tools);
    } catch (err) {
        console.error("Error reading tools:", err);
        res.status(500).json({error: "Failed to read tools"});
    }
});

app.post("/api/tools", async (req, res) => {
    try {
        const {
            name,
            url,
            shortDescription,
            mainCategory,
            pricing,
            tags,
            isFeatured,
        } = req.body;

        if (!name || !url || !shortDescription) {
            return res.status(400).json({error: "Missing required fields"});
        }

        const tools = await readTools();

        const newTool = {
            id: nanoid(10),
            name,
            shortDescription,
            url,
            category: mainCategory || "Other",
            pricing: pricing || "unknown",
            tags: Array.isArray(tags) ? tags : [],
            featured: !!isFeatured,
        };

        tools.unshift(newTool);
        await writeTools(tools);

        res.status(201).json(newTool);
    } catch (err) {
        console.error("Error creating tool:", err);
        res.status(500).json({error: "Failed to create tool"});
    }
});

const PORT = process.env.PORT || 4000;

await ensureDbFile();

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

app.get("/api/tools/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const tools = await readTools();
        const tool = tools.find((t) => t.id === id);

        if (!tool) {
            return res.status(404).json({error: "Tool not found"});
        }

        res.json(tool);
    } catch (err) {
        console.error("Error reading tool by id:", err);
        res.status(500).json({error: "Failed to read tool"});
    }
});

app.put("/api/tools/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const tools = await readTools();

        const index = tools.findIndex((t) => t.id === id);
        if (index === -1) {
            return res.status(404).json({error: "Tool not found"});
        }

        const current = tools[index];
        const {
            name,
            url,
            shortDescription,
            category,
            pricing,
            tags,
            featured,
        } = req.body;

        const updated = {
            ...current,
            name: typeof name === "string" ? name : current.name,
            url: typeof url === "string" ? url : current.url,
            shortDescription:
                typeof shortDescription === "string"
                    ? shortDescription
                    : current.shortDescription,
            category: typeof category === "string" ? category : current.category,
            pricing: typeof pricing === "string" ? pricing : current.pricing,
            tags: Array.isArray(tags) ? tags : current.tags,
            featured:
                typeof featured === "boolean" ? featured : Boolean(current.featured),
        };

        tools[index] = updated;
        await writeTools(tools);

        res.json(updated);
    } catch (err) {
        console.error("Error updating tool:", err);
        res.status(500).json({error: "Failed to update tool"});
    }
});

app.delete("/api/tools/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const tools = await readTools();
        const index = tools.findIndex((t) => t.id === id);

        if (index === -1) {
            return res.status(404).json({error: "Tool not found"});
        }

        tools.splice(index, 1);
        await writeTools(tools);

        res.status(204).end();
    } catch (err) {
        console.error("Error deleting tool:", err);
        res.status(500).json({error: "Failed to delete tool"});
    }
});



