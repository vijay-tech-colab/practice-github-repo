import express from "express";
const router = express.Router();

// temporary in-memory data
let users = [
  { id: 1, name: "Alice", email: "alice@mail.com" },
  { id: 2, name: "Bob", email: "bob@mail.com" },
  { id: 3, name: "Bob", email: "bob@mail.com" }
];

// ✅ CREATE
router.post("/", (req, res) => {
  const { name, email } = req.body;
  const id = users.length + 1;
  const newUser = { id, name, email };
  users.push(newUser);
  res.status(201).json({ message: "User created", user: newUser });
});

// 📖 READ all
router.get("/", (req, res) => {
  res.json(users);
});

// 📖 READ one
router.get("/:id", (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
});

// ✏️ UPDATE
router.put("/:id", (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ message: "User not found" });

  const { name, email } = req.body;
  user.name = name ?? user.name;
  user.email = email ?? user.email;
  res.json({ message: "User updated", user });
});

// ❌ DELETE
router.delete("/:id", (req, res) => {
  users = users.filter(u => u.id !== parseInt(req.params.id));
  res.json({ message: "User deleted" });
});

export default router;
