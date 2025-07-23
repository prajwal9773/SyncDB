A Near Real-Time / Configurable Data Synchronization System

Tech Stack

Backend: Node.js, Express, Mongoose (MongoDB)

Frontend: React (Hooks, EventSource for SSE)

Database: MongoDB (two collections simulate local & cloud)


Detailed Approach

Separate Collections: Two collections in MongoDB are used: one simulating local data and another simulating cloud data.

Change Detection: Each document has a lastModified timestamp. During sync, the service checks for documents modified after the last sync in either collection.

Conflict Resolution: If the same document changed in both local and cloud, a field-based merge strategy is used:

Compare fields individually based on timestamps or priority rules.

Merge the newer values for fields instead of overwriting the entire document blindly.

Sync Directions:

Local → Cloud

Cloud → Local

Both directions (configurable)

Forced overwrite (optional)

