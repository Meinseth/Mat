# Mat

A simple recipe manager

## Setup

Instructions on how to get it running locally.

## 🧱 Prerequisites
- Node.js
- .NET SDK
- Docker (optional)

## 🛠️ Installation

Clone the repository

npm install and dotnet run

## 📦 NSwag CLI

Install and run nswag to autogenerate Api Client

```bash
//Setup
dotnet tool install --global NSwag.ConsoleCore

cd Mat.Api
nswag run nswag.json
```

## 🌐 Frontend

```bash
cd Mat.Frontend
npm run dev
```

## 🖥️ Backend

```bash
cd Mat.Api
dotnet run
```

## Local testing

```bash
dotnet user-secrets init
dotnet user-secrets set "DbPassword" "changepasswordhere"

```