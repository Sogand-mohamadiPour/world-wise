# 🌐 WorldWise  
A modern single-page React application for tracking the places you've traveled — from cities to whole countries — all in one clean interface.

WorldWise focuses on **real-world frontend architecture**, integrating a real backend API, route protection, and complex state management.

---

## ✨ Features  

- 📡 **Geolocation support** to detect your current location  
- 🌍 **Travel overview** showing all visited cities  
- ➕ **Add**, ➖ **remove**, and 🔄 **manage** travel entries  
- 🔐 **Protected routes** with a **fake authentication flow** (UI-level auth)  
- 🧩 **Real backend integration** using a **Django REST Framework (DRF) API**  
- 📄 Data fetched from a **comments-based API** and mapped to cities on the frontend  
- 🎛️ **CSS Modules** for modular, maintainable styling  
- 🧭 **React Router** for nested routing and smooth navigation  
- ⚛️ State management using **useState**, **useEffect**, **useReducer**, and custom hooks  
- ⚛️ App-wide state handled through **Context API + useReducer** (Redux-like pattern)  
- ⚡ Built with **Vite** for a fast development experience
- 🗺️ Using leaflet map

---

## 🛠️ Built With  

- **React** (SPA architecture)  
- **Context API + useReducer**  
- **React Router**  
- **CSS Modules**  
- **JavaScript (ES6+)**  
- **Django REST Framework (DRF)** backend  
  > Backend developed by [Pooyan](https://github.com/pooyansaeedinia)  

---

## 🔐 Authentication Note  

This project uses a **fake authentication system on the frontend** to simulate login and protected routes.  
The backend currently does **not** enforce authentication — real auth (JWT / token-based) can be added later without major refactoring.

---

## 🔌 Backend API  

- **Real deployed DRF backend** 
- Data is fetched from a `/comments` endpoint  
- Each comment contains city-related information (`cityName`, `country`, `position`, etc.)  
- The frontend derives **cities** from backend comments  

Swagger / API documentation:  
👉 *(https://world-wise-jipz.onrender.com/api/schema/swagger-ui/)*

---

## 🎯 Project Purpose  

WorldWise was built to practice and demonstrate:

- Advanced **Context API** usage  
- Real backend integration (DRF)  
- Handling **derived state** (cities derived from comments)  
- Managing side effects and async logic  
- Protected routing and fake auth patterns  
- Clean SPA architecture and modular UI  
- Preparing a frontend for **real production APIs**
