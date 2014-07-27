@echo off
chcp 1251
set CD2=%CD:\=\\%
set verfile=source\\protocol.reg
set tmpfile=source\\support.reg
set seek=instPath
if exist %tmpfile% del /q %tmpfile%
for /f "delims=" %%a in (%verfile%) do (
  (echo %%a)|>nul find /i "%seek%"&&((echo @="%CD2%\\source\\RSP\\RSP.exe")>>%tmpfile%)
  (echo %%a)|>nul find /i "%seek%"||(echo %%a)>>%tmpfile%
)

regedit.exe "%CD2%\\%tmpfile%"
