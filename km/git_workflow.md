# Standard Git Workflow for AI and Developers

เอกสารนี้กำหนดมาตรฐานการทำงานร่วมกับระบบ Git สำหรับผู้พัฒนาและ AI Agents ทุกตัวที่เข้ามาทำหน้าที่ในโปรเจกต์นี้
**ข้อสำคัญสำหรับ AI: คุณต้องอ่านและทำความเข้าใจข้อตกลงนี้ทุกครั้งก่อนเริ่มลงมือแก้ไขโค้ดหรือทำคอมมิตใดๆ**

---

## 1. Branching & Pulling Strategy (การจัดการบรันช์และการอัปเดตโค้ด)
- **ห้ามทำการ Commit / Push ตรงไปยังบรันช์หลัก (`main`, `master`) โดยเด็ดขาด**
- ก่อนเริ่มงานทุกครั้ง ให้ตรวจสอบว่าทำงานอยู่บน Branch พัฒนาที่ระบุ (เช่น `feat/qa-neranchara-dev`) 
- รันคำสั่งอัปเดตโค้ดล่าสุดจากรีโมตเสมอ:
  ```bash
  git checkout feat/qa-neranchara-dev
  git pull origin feat/qa-neranchara-dev
  ```

---

## 2. Dynamic Objective Code Standard (มาตรฐานโค้ดแบบ Dynamic Objective)
- โค้ดทดสอบทั้งหมดต้องเขียนภายใต้แนวคิด **Dynamic Objective (Data-Driven / Dispatcher)**
- **ห้ามเขียนฮาร์ดโค้ด (Hardcode) สเต็ปรันหรือข้อมูลทดสอบลงในไฟล์ Spec (`.spec.ts`) โดยเด็ดขาด**
- โครงสร้างที่ต้องยึดถือ:
  1. **Test Data (`data/*.data.ts`)**: ระบุออบเจกต์และพารามิเตอร์ของเทสเคสทั้งหมด
  2. **Step Definitions (`steps/**/*.steps.ts`)**: พัฒนาฟังก์ชันคำจำกัดความสเต็ปรันย่อย พร้อมระบบ Dispatcher `execute(tc)` ที่แยกแยะ Action และ Outcome (Expectation)
  3. **Spec Files (`tests/**/*.spec.ts`)**: เป็นไฟล์ Spec ขนาดเล็กที่ใช้วนลูป (Loop) รันเทสเคสจากไฟล์ Data เท่านั้น
  4. **Locators (`locators/*.locators.ts`)**: แยกและเก็บ Selector สำหรับอ้างอิง UI elements เพื่อความทนทานต่อการเปลี่ยนแปลงดีไซน์ของเว็บ

---

## 3. Conventional Commit Messages (รูปแบบการคอมมิต)
การเขียนคอมมิตเมสเซจต้องใช้หลักการ Conventional Commits เพื่อความเป็นระเบียบและสืบค้นง่าย ตัวอย่างเช่น:

- `feat(<module>): ...` สำหรับการเพิ่มฟีเจอร์หรือการทดสอบแบบไดนามิกใหม่
  - *ตัวอย่าง: `feat(medication): add dynamic test cases for medication creation`*
- `fix(<module>): ...` สำหรับการแก้ไขบั๊ก ตัวสะกดผิด หรือข้อผิดพลาดทางเทคนิค
  - *ตัวอย่าง: `fix(types): cast catch block error to any to resolve ts check`*
- `refactor(<module>): ...` สำหรับการปรับโครงสร้างโค้ดโดยไม่เปลี่ยนการทำงาน
  - *ตัวอย่าง: `refactor(medical-record): convert spec to loop over declarative data`*
- `docs(<module>): ...` สำหรับการปรับปรุงหรือเพิ่มเอกสารคู่มือการพัฒนา
  - *ตัวอย่าง: `docs(git): add standard git workflow guidelines`*

---

## 4. Pre-commit Verification (การตรวจสอบความถูกต้องก่อนบันทึกงาน)
ก่อนที่จะทำ Git Commit และ Push โค้ดขึ้นรีโมตเสมอ ต้องผ่านการตรวจสอบ 2 ขั้นตอนดังต่อไปนี้:

### ขั้นตอนที่ 1: ตรวจสอบความถูกต้องของ TypeScript (TypeScript Compilation Check)
ต้องไม่มี Error ชี้เป้าจากทรานสไพเลอร์ TypeScript:
```bash
npx tsc --noEmit
```
*หมายเหตุ: ในโปรเจกต์นี้ ตัวแปร Error ในบล็อก `catch (e)` จะมีประเภทเป็น `unknown` เสมอตามข้อกำหนด `useUnknownInCatchVariables` ให้ทำการแปลงประเภทเป็น `(e as any).message` หรือทำการตรวจสอบประเภทร่างก่อนเรียกใช้ property*

### ขั้นตอนที่ 2: ตรวจสอบการโหลดเทสเคสของ Playwright (Playwright Test Listing Check)
สคริปต์ประกาศ Spec ไฟล์และ Data ไฟล์ใหม่ต้องไม่ทำให้การรันล้มเหลวขณะ Playwright แสกนหาเทส:
```bash
npx playwright test --list
```
*หากทั้งสองขั้นตอนส่งกลับค่าเสร็จสมบูรณ์โดยไม่มี Error (Exit Code: 0) จึงจะสามารถนำไปสร้าง Commit ได้*

---

## 5. Clean Repository Practices (สุขอนามัยที่ดีของโปรเจกต์)
- ห้าม Commit ไฟล์ทดสอบชั่วคราว, ภาพสกรีนช็อตที่ใช้ใน Local หรือโฟลเดอร์ที่ไม่เกี่ยวข้องลงในโปรเจกต์
- หากต้องการเขียนสคริปต์สแกนหรือตรวจจับชั่วคราว ให้ใส่ไว้ในโฟลเดอร์ `.disabled` หรือใช้ชื่อที่ลงท้ายด้วย `.disabled` เพื่อป้องกันการเข้าข่ายการแสกนของ Playwright และ TypeScript
