# SignalTutorial

# Angular CRUD Application with Signal Store

This project demonstrates how to implement a simple CRUD (Create, Read, Update, Delete) application using **Angular** and **Signal Store** for state management. The app allows users to manage a list of items, providing the ability to add, update, and delete items with real-time updates. 

### Features:
- **Real-time Data Syncing** with Signal Store.
- **CRUD Functionality** to manage items.
- **Responsive UI** that adapts to different screen sizes.
- **State Management** with Signal Store for efficiency.

## Prerequisites

Before running the project, ensure you have the following installed:

- **Node.js** (LTS version recommended)
- **Angular CLI**
- **json-server** (for simulating a backend API)

## Getting Started

### Step 1: Clone the Repository

Clone the project to your local machine:


git clone https://github.com/yourusername/angular-crud-signal-store.git
cd angular-crud-signal-store


## Install the necessary dependencies using npm:

npm install

To simulate the backend, we will use json-server to provide a fake API.

## Install json-server globally:

npm install -g json-server

## Start the json-server by running:

json-server --watch db.json --port 3000

## Run the Angular application:

ng serve

```bash
