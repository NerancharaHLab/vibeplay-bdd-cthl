# VibePlay BDD CTHL (Automated Tests for Cortex - HLab)

> [!IMPORTANT]
> **สำหรับ AI Agents และนักพัฒนา (For AI & Developers):**
> ก่อนเริ่มงานทุกครั้ง คุณต้องอ่านและทำตามแนวทางการทำงานที่กำหนดไว้ใน [มาตรฐาน Git Workflow (km/git_workflow.md)](file:///Users/neranchara/Jobs/Project/vibeplay-bdd-cthl/km/git_workflow.md) เสมอ เพื่อรักษามาตรฐาน Dynamic Objective ของสเปกและคอมมิต

โปรเจกต์ทดสอบอัตโนมัติด้วย Playwright นี้ได้รับการปรับโครงสร้างภายใต้ชื่อ **vibeplay-bdd-cthl** เพื่อทดสอบระบบของโปรดักต์ **Cortex** ของทางบริษัท **HLab** โดยรองรับแนวคิด **BDD (Behavior-Driven Development)** แบบดั้งเดิม (Given-When-Then) และ**แยกทรัพยากรการทดสอบทั้งหมดตามรายไซต์ (Site-Separation)** สำหรับทั้ง 4 ไซต์: **New Cortex**, **TMH**, **SBH**, และ **NUH** อย่างสมบูรณ์แบบ

## โครงสร้างโปรเจกต์ (Project Structure)

โปรเจกต์นี้ใช้โครงสร้าง **3-Tier BDD Architecture** เพื่อแยกความรับผิดชอบของโค้ดให้ชัดเจน เข้าใจง่าย และบำรุงรักษาง่ายในระยะยาว:

1. **Scenarios (tests/[site]/[module].spec.ts)**: สคริปต์ประกาศเคสและสถานการณ์ทดสอบระดับสูง (High-level Scenario) เขียนในรูปแบบคล้ายภาษาธรรมชาติ (Given / When / Then) โดยเรียกใช้งานคลาส BDD Steps
2. **Step Definitions (steps/[site]/[module].steps.ts)**: คลาสเก็บคำจำกัดความของขั้นตอน BDD ซึ่งจะเรียกใช้ความสามารถของ `test.step` ของ Playwright ครอบคลุมการทำงานและการตรวจสอบหลัก
3. **Page Object Models (pages/)**: คลาสเก็บโครงสร้างหน้าเว็บ Locators และฟังก์ชันดิบในการปฏิสัมพันธ์กับ UI เพื่อลดการซ้ำซ้อนของโค้ดระบุปุ่มและฟิลด์อินพุตต่างๆ

### รายละเอียดโฟลเดอร์หลัก:
- `tests/[site]/`: เก็บเฉพาะสคริปต์ประกาศสถานการณ์การทดสอบ แยกตามรายไซต์ (เช่น `login.spec.ts`, `medical-record.spec.ts`, `opd.spec.ts`, `ipd.spec.ts`, `pharmacy.spec.ts`, `claim.spec.ts`)
- `steps/[site]/`: เก็บสเต็ปการรันย่อยและคำอธิบายภาษาไทย (Given/When/Then) สำหรับใช้งานในสคริปต์ทดสอบ
  - `steps/new-cortex/`: สเต็ปสำหรับโมดูลทั้งหมดของ New Cortex (`login.steps.ts`, `medical-record.steps.ts`, `opd.steps.ts`, `ipd.steps.ts`, `pharmacy.steps.ts`, `claim.steps.ts`)
  - `steps/tmh/`: สเต็ปสำหรับไซต์ TMH
  - `steps/sbh/`: สเต็ปสำหรับไซต์ SBH
  - `steps/nuh/`: สเต็ปสำหรับไซต์ NUH
- `pages/`: โฟลเดอร์รวม Page Object Models (POM) สำหรับใช้งานร่วมกัน
- `data/`: ไฟล์เก็บข้อมูล Test Cases และ Users ของแต่ละไซต์อย่างเป็นระเบียบ (เช่น `login.data.ts`, `claim.data.ts`, `users.json`)
- `playwright.config.ts`: ไฟล์ตั้งค่าการรันหลัก แมป URL ของแต่ละไซต์โดยอัตโนมัติ

## วิธีการใช้งาน (How to Use)

1.  **ติดตั้ง Node.js**: ตรวจสอบว่าเครื่องของคุณมี Node.js ติดตั้งอยู่
2.  **ติดตั้ง Dependencies**:
    ```bash
    npm install
    ```
3.  **ติดตั้ง Browser**:
    ```bash
    npx playwright install
    ```
4.  **รันการทดสอบด้วยสคริปต์อัตโนมัติ (Automated Runner Scripts)**:
    เราได้พัฒนาตัวควบคุมการทดสอบที่ยืดหยุ่นผ่านทาง NPM Scripts และสคริปต์กลาง `run.js` เพื่อให้รองรับการรันแยกตาม **ไซต์และโมดูล (site:module)** หรือ **ไซต์และเฉพาะเจาะจงเคสทดสอบ (site:testcase)** อย่างมีประสิทธิภาพสูงสุด

    ### 4.1 รันผ่านสคริปต์กลางแบบสั้น (Recommended - รวดเร็วและยืดหยุ่น)
    คุณสามารถใช้งานระบบรันการทดสอบที่ทรงประสิทธิภาพได้โดยพิมพ์คำสั่งโดยตรงดังนี้:

    *   **รันระบุไซต์และโมดูล (site:module)**:
        รูปแบบ: `npm run site:module <site> <module> [options]`
        ```bash
        # รันโมดูล login บนไซต์ new-cortex
        npm run site:module new-cortex login

        # รันโมดูล medical-record บนไซต์ new-cortex ในโหมดเบื้องหลัง (Headless)
        npm run site:module new-cortex medical-record -- --headless
        ```
        *(หมายเหตุ: หากต้องการระบุ option เพิ่มเติมใน npm script ให้ใช้เครื่องหมาย `--` คั่นก่อนพิมพ์ option เช่น `-- --headless` หรือ `-- --role super`)*

    *   **รันเฉพาะเจาะจงเคสทดสอบ (site:testcase)**:
        รูปแบบ: `npm run site:testcase <site> "<testcase_title>" [options]`
        ```bash
        # รันเฉพาะเคสที่มีชื่อว่า "Login test for user" ในไซต์ new-cortex
        npm run site:testcase new-cortex "Login test for user"

        # รันเคสที่ระบุบนไซต์ tmh ในแบบไร้หน้าต่าง (Headless)
        npm run site:testcase tmh "Login test" -- --headless
        ```

    ### 4.2 รันผ่าน NPM Scripts สำเร็จรูปแยกรายไฟล์ (Predefined NPM Scripts)
    คุณสามารถพิมพ์คำสั่งต่อไปนี้เพื่อรันโมดูลเฉพาะเจาะจงบนแต่ละไซต์ได้ทันที (Headed Mode):
    *   **New Cortex**:
        *   รันโมดูล Login: `npm run test:new-cortex:login`
        *   รันโมดูล Medical Record: `npm run test:new-cortex:medical-record`
        *   รันโมดูล OPD: `npm run test:new-cortex:opd`
        *   รันโมดูล IPD: `npm run test:new-cortex:ipd`
        *   รันโมดูล Pharmacy: `npm run test:new-cortex:pharmacy`
        *   รันโมดูล Claim: `npm run test:new-cortex:claim`
    *   **TMH**:
        *   รันโมดูล Login: `npm run test:tmh:login`
    *   **SBH**:
        *   รันโมดูล Login: `npm run test:sbh:login`
        *   รันโมดูล Registration: `npm run test:sbh:registration`
    *   **NUH**:
        *   รันโมดูล Login: `npm run test:nuh:login`

    ### 4.3 รันแบบยืดหยุ่นด้วย Unified Runner (ด้วยไฟล์ skills/run.js)
    คุณสามารถใช้งานระบบรันการทดสอบผ่านทาง `skills/run.js` ได้โดยตรงอย่างเต็มรูปแบบ:
    *   **รันตามไซต์และโมดูล (site:module)**:
        ```bash
        node skills/run.js site:module new-cortex login
        # หรือใช้งานแบบสั้น
        node skills/run.js new-cortex login
        ```
    *   **รันเฉพาะเคสทดสอบที่ต้องการ (site:testcase)**:
        ```bash
        node skills/run.js site:testcase new-cortex "Login test for user"
        # หรือใช้งานแบบสั้น
        node skills/run.js new-cortex -t "Login test for user"
        ```
    *   **ตัวเลือกเสริมที่มีประโยชน์ (Useful Options)**:
        *   `--headless`: ทำงานแบบซ่อนหน้าจอเบราว์เซอร์
        *   `-u <role>` หรือ `--role <role>`: เลือกผู้ใช้ตามบทบาท (เช่น `super`, `nurse`, `physician`)
        *   `--project <name>`: เลือกเบราว์เซอร์เป้าหมาย (เช่น `chromium`, `firefox`, `webkit`)

## การดูรายงาน (Reporting)
หลังจากการทดสอบเสร็จสิ้น คุณสามารถดูรายงานผลการทดสอบได้ด้วยคำสั่ง:
```bash
npx playwright show-report
```

## การเพิ่มผู้ใช้ใหม่
คุณสามารถเพิ่มหรือแก้ไขผู้ใช้ใหม่ได้ง่ายๆ โดยแยกตามไฟล์ข้อมูลของแต่ละไซต์ในโฟลเดอร์ `data/{site}/login/users.json`:
- `data/new-cortex/login/users.json`
- `data/tmh/login/users.json`
- `data/sbh/login/users.json`
- `data/nuh/login/users.json`

## พื้นที่สำหรับทีม QA ในการออกแบบเคสทดสอบ (QA BDD Scenarios Space)
เราได้จัดทำพื้นที่สำหรับทีม QA ในการเขียน ออกแบบ และวางแผนเคสทดสอบล่วงหน้า โดยแยกหมวดหมู่ตามรายไซต์และโมดูลอย่างชัดเจนในรูปแบบ **Markdown (.md)** ภายใต้โฟลเดอร์หลัก:
- `bdd-scenarios/`
  - `new-cortex/` (`login.md`, `medical-record.md`, `opd.md`, `ipd.md`, `pharmacy.md`, `claim.md`)
  - `tmh/` (`login.md`)
  - `sbh/` (`login.md`, `registration.md`)
  - `nuh/` (`login.md`)

ทีม QA สามารถเปิดไฟล์เหล่านี้และเพิ่มรายละเอียด Scenario (Given / When / Then) ใหม่ๆ ได้ทันที เมื่อผ่านการอนุมัติ ทีมพัฒนาระบบอัตโนมัติจะสามารถนำสเต็ปภาษาธรรมชาติเหล่านั้นไปแมปลงในสคริปต์ Playwright ได้อย่างรวดเร็วและเป็นระบบ
