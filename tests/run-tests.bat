@echo off
echo Running GUIDS2HTML Tests...
echo.

node %~dp0\run-all-tests.js

if %ERRORLEVEL% EQU 0 (
  echo.
  echo Tests completed successfully!
  echo Results can be found in the tests/output directory
  echo Open tests/output/test-report.html to view detailed results
) else (
  echo.
  echo Some tests failed!
  echo Please check the output for details
  echo Open tests/output/test-report.html to view detailed results
)

echo.
pause