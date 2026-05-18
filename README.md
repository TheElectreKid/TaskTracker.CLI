# 🗂️ Ultimate Task Tracker CLI

from: https://roadmap.sh/projects/task-tracker
A lightweight, no-nonsense command-line task manager built with JavaScript.
Designed to be fast, predictable, and brutally simple.

---

## ⚙️ Features

* Add tasks with flexible descriptions
* Update existing tasks
* Delete tasks by ID
* Track task status:

  * `to-do`
  * `in-progress`
  * `done`
* Filter tasks by status
* Persistent ID system

---

## 🧠 Design Philosophy

This tool follows a strict separation of concerns:

* **CLI Layer (`commands.js`)**

  * Parses user input
  * Packages data into `queryData`
  * Delegates execution

* **Database Layer (`databasesys.js`)**

  * Handles actual CRUD operations
  * Owns data integrity

No hidden magic. No unnecessary abstraction.

---

## 📦 Installation

```bash
git clone https://github.com/TheElectreKid/TaskTracker.CLI.git
cd TaskTracker.CLI
npm install
node index.js

or

just download it as zip and run the bat file ¯\_(ツ)_/¯
```

---

## 🖥️ Usage

### ➕ Add a Task

```bash
add Buy groceries
```

---

### ✏️ Update a Task

```bash
update 1 Buy bananas instead
```

---

### ❌ Delete a Task

```bash
delete 1
```

---

### 🚧 Mark as In Progress

```bash
mark-in-progress 2
```

---

### ✅ Mark as Done

```bash
mark-done 2
```

---

### 📋 List Tasks

#### All tasks

```bash
list
```

#### Filter by status

```bash
list done
list to-do
list in-progress
```

---

### 🚪 Exit

```bash
exit
```

---

## 🧩 Data Structure

Each task follows this format:

```json
{
  "id": 1,
  "description": "Buy groceries",
  "status": "to-do",
  "createdAt": "2026-04-30T00:00:00.000Z",
  "updatedAt": "2026-04-30T00:00:00.000Z"
}
```

## 🧪 Example Session

```bash
> add Finish thesis
✔ Task added (ID: 1)

> mark-in-progress 1
✔ Task updated

> list in-progress
[1] Finish thesis (in-progress)

> mark-done 1
✔ Task updated

> list done
[1] Finish thesis (done)
```

---

## 🗡️ Final Notes

This tool is intentionally minimal.
It does exactly what you tell it to do and nothing more ;)

If it breaks, it’s because you told it something stupid.

Fix that first.

---
