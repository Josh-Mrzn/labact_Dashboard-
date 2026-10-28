@echo off
title Lab Activity 6
where node >nul 2>nul || (echo Node.js is not installed. Download it from https://nodejs.org then run this again. & pause & exit /b)

rem Find the client folder next to this file (any surname works, e.g. romero-client)
set "CLIENT="
for /d %%D in ("%~dp0*-client") do set "CLIENT=%%D"
if not defined CLIENT (
  echo Cannot find the client folder next to this file.
  pause
  exit /b
)

cd /d "%CLIENT%"
if not exist package.json (
  echo package.json was not found in %CLIENT%
  pause
  exit /b
)

if not exist node_modules\.bin\vite.cmd (
  echo Installing packages, please wait...
  call npm install
  if errorlevel 1 (
    echo npm install failed. Check your internet connection and read the error above.
    pause
    exit /b
  )
)
call npm run dev
pause
