# Demo Offline with Identity Vault

The scenario being modeled here is one where the user has an encrypted database. The key for the database is obtained from one of two places: either IV, or if it does not exist there, from the backend API (simulated)

## Services

### KeyService

This service simply simulates getting an encryption key from an API.

### KeyStorageService

### Database