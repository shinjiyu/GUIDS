@echo off
echo 运行 GUIDS2HTML Row组件测试...
echo.

node %~dp0\row-test.js

if %ERRORLEVEL% EQU 0 (
  echo.
  echo Row组件测试成功完成!
  echo 测试结果可在 tests/output/row 目录中查看
) else (
  echo.
  echo Row组件测试发现问题!
  echo 请查看输出以获取详细信息
)

echo.
pause 