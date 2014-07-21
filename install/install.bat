@echo off
chcp 1251
set CD2=%CD:\=\\%
set verfile=protocol.reg
set tmpfile=support.reg
set seek=instPath
if exist %tmpfile% del /q %tmpfile%
for /f "delims=" %%a in (%verfile%) do (
  (echo %%a)|>nul find /i "%seek%"&&((echo @="%CD2%\\RSP.exe")>>%tmpfile%)
  (echo %%a)|>nul find /i "%seek%"||(echo %%a)>>%tmpfile%
)

regedt32.exe /s %tmpfile%