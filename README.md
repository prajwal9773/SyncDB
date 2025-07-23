# A Near Real-Time / Configurable Data Synchronization System

## Tech Stack

* **Backend**: Node.js, Express, Mongoose (MongoDB)
* **Frontend**: React (Hooks, EventSource for SSE)
* **Database**: MongoDB (two collections simulate local & cloud)

## Detailed Approach

### Separate Collections

Two collections in MongoDB are used: one simulating local data and another simulating cloud data.

### Change Detection

Each document includes a `lastModified` timestamp. During synchronization, the service checks for documents modified after the last sync in either collection.

### Conflict Resolution

When the same document has changes in both local and cloud collections, a **field-based merge strategy** is applied:

* Compare each field based on timestamps or predefined priority rules.
* Merge only the newer field values instead of overwriting the entire document blindly.

### Sync Directions

* **Local → Cloud**
* **Cloud → Local**
* **Both Directions (configurable)**
* **Forced Overwrite (optional)**
  
### Sync Logs View
<img width="372" height="333" alt="Screenshot 2025-07-23 at 3 52 35 PM" src="https://github.com/user-attachments/assets/ba413712-ceef-4ac1-a78a-ce475c2278a5" />


