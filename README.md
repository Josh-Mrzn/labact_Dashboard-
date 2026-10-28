# Lab Activity 6 (React + MUI)

## Run
**Windows:** double-click `start-lab6.bat` (first run installs packages, then opens the browser).

**Manual:**
```
cd romero-client
npm install
npm run dev
```
Open http://localhost:5173

## Where the 3 enhancements are
| Enhancement | File | How to see it |
|---|---|---|
| 1. PDF printing | `src/pages/DashboardPages/ReportsPage.jsx` | Reports -> **Export PDF** -> allow pop-ups -> choose "Save as PDF" (use Chrome for page numbers) |
| 2. Search + filters | `src/pages/DashboardPages/UsersPage.jsx` | Users -> search bar, Role / Gender / Status dropdowns, "Showing X of Y users" |
| 3. Form validation | `src/pages/DashboardPages/UsersPage.jsx` (`validate`) | Users -> Add User -> try password < 8 chars, contact number not 11 digits, age with letters, username with spaces |

Sample users are in `src/assets/users.json`.

## Git (inside the romero-webprog root folder)
```
git checkout -b lab-act6
git add .
git commit -m "lab-act6"
git push origin lab-act6
```
