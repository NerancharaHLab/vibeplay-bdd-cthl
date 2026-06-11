# Test Fixtures

Place test fixture files here for REP upload tests (CTXN-249).

## Required files

| File | Purpose |
|---|---|
| `rep-no-match.xlsx` | REP file ที่มี claims ที่ไม่มีในระบบ (ErrNoClaimsToUpdate) |
| `rep-invalid.xlsx` | REP Excel file ที่ format ผิด (ErrInvalidExcelFormat) |
| `rep-unsupported.csv` | ไฟล์ที่ไม่ใช่ Excel (ErrUnsupportedFormat) |
| `rep-valid.xlsx` | REP file ที่ถูกต้อง (success case) |

> หมายเหตุ: tests ใช้ `page.route()` mock API response
> จึงใช้ไฟล์ dummy ขนาดเล็กใดก็ได้ ไม่ต้องเป็นไฟล์จริงจากระบบ
