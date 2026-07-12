// =====================================================
//  config.js — Firebase Config + ข้อมูลโครงการ
//  กระดาษทำการออนไลน์ IoT Smart Farm
//  วิทยาลัยเกษตรและเทคโนโลยีศรีสะเกษ ปีงบประมาณ 2568
// =====================================================

const firebaseConfig = {
  apiKey:            "AIzaSyA1JKnmgAIXc7ut9i7MBvdJiDHIotcRFrk",
  authDomain:        "wp-ssk-2568.firebaseapp.com",
  projectId:         "wp-ssk-2568",
  storageBucket:     "wp-ssk-2568.firebasestorage.app",
  messagingSenderId: "125230466673",
  appId:             "1:125230466673:web:aa44a52ea9e61627c57dd0"
};

firebase.initializeApp(firebaseConfig);
const db      = firebase.firestore();
const storage = firebase.storage();

// ===== ข้อมูลโครงการ =====
const KAT_CONFIG = {
  unit:      "สำนักตรวจเงินแผ่นดินจังหวัดศรีสะเกษ",
  auditee:   "วิทยาลัยเกษตรและเทคโนโลยีศรีสะเกษ",
  project:   "โครงการจัดซื้อครุภัณฑ์ห้องปฏิบัติการเทคโนโลยีอุตสาหกรรมการทำฟาร์มอัจฉริยะเกษตรกรรม IoT ด้วยระบบ APP จำนวน 1 ชุด",
  shortName: "IoT Smart Farm",
  budget:    "4,987,000",
  year:      "2568",
  totalItems:"19 รายการ",
  highRisk:  "12, 13, 16, 17 และ 19",
};

// ===== Collections (kat prefix) =====
const COL = {
  PROJECT:     "katProject",
  AUDIT_PLAN:  "katAuditPlan",
  CHECKLIST:   "katChecklist",
  OBSERVE:     "katObserve",
  OBS_SUMMARY: "katObserveSummary",
  SUMMARY:     "katSummary",
};

// ===== ผู้ตรวจสอบเริ่มต้น =====
const DEFAULT_OBSERVERS = [
  { name: "นายอุเด่นศักดิ์ สว่างภพ",   position: "นักวิชาการตรวจเงินแผ่นดินชำนาญการ" },
  { name: "นางสาวสุภัทรา ประสานพันธ์", position: "นักวิชาการตรวจเงินแผ่นดินชำนาญการ" },
  { name: "นางสาวลักษณา สุนิพัฒน์",    position: "ผู้อำนวยการกลุ่ม" },
];

// ===== ผลการตรวจสอบ =====
const CHECK_RESULTS = ["ผ่าน", "ไม่ผ่าน", "ไม่ได้ตรวจ"];
const OBS_RESULTS   = ["สอดคล้อง", "ไม่สอดคล้อง", "ต้องตรวจสอบเพิ่มเติม"];

// ===== หัวข้อการสังเกตการณ์ 24 ข้อ =====
const OBS_SECTIONS = [
  {
    id: "3.1", title: "กระบวนการตรวจรับพัสดุ",
    points: [
      { id:"3.1.1", title:"การแต่งตั้งคณะกรรมการตรวจรับและความครบถ้วน",
        criterion:"มีคำสั่งแต่งตั้งเป็นลายลักษณ์อักษรก่อนวันตรวจรับ; องค์ประกอบตามระเบียบฯ ข้อ 25(5) คือประธาน 1 คน + กรรมการ ≥2 คน; กรรมการครบตามคำสั่ง; ไม่มีผู้มีส่วนได้เสียกับคู่สัญญา" },
      { id:"3.1.2", title:"วิธีการตรวจสอบของคณะกรรมการ",
        criterion:"ตามระเบียบฯ ต้องตรวจสอบความถูกต้องครบถ้วนก่อนรับ; ครุภัณฑ์เทคโนโลยีซับซ้อน (IoT/PLC/Sensor) ต้องมีทั้งตรวจนับ ตรวจสเปคเทียบ TOR/แค็ตตาล็อก และทดสอบการทำงานจริง (Function Test) ไม่ใช่พิจารณาจากเอกสารอย่างเดียว" },
      { id:"3.1.3", title:"ความเพียงพอของเวลาและทรัพยากร",
        criterion:"เวลาต้องเพียงพอสำหรับ 19 รายการ วงเงิน 4,987,000 บาท ซับซ้อนสูง (AI/IoT/PLC/RAS); ควรมีบุคลากรที่มีความรู้เทคนิคร่วมพิจารณาตามความจำเป็น" },
    ]
  },
  {
    id: "3.2", title: "รายการที่ 12 — ชุดทดลองควบคุมการทำงานระบบสมาร์ทฟาร์ม (3 ชุด)",
    points: [
      { id:"3.2.1", title:"PLC (≥14 I/O)",
        criterion:"TOR ข้อ 12 กำหนด PLC มี I/O รวม ≥16/14 จุด ทำงานควบคุมอัตโนมัติตามฟังก์ชัน; มีพอร์ตสื่อสาร ≥3 ช่อง (RS232/RS485); Analog I/O รวม ≥6 ช่อง; High speed counter ≥2 ช่อง" },
      { id:"3.2.2", title:"HMI (≥7 หน้า)",
        criterion:"หน้าจอ HMI รองรับ Touch และแสดงผล ≥7 หน้าจอ มีหน่วยควบคุมและแสดงผล ≥1 ชุด ตาม TOR ข้อ 12.2" },
      { id:"3.2.3", title:"Node Gateway และ Local Cloud",
        criterion:"Node Gateway: CPU ≥240MHz, RAM ≥512KB, WiFi 802.11 b/g/n, BLE 2.0/4.0, RS485, ทำงาน -40°C ถึง 125°C; Local Cloud: CPU ≥1.5GHz, Gigabit Ethernet, BT 5.0, USB 3.0×2/2.0×2, Micro-HDMI×2 4K" },
      { id:"3.2.4", title:"การทำงานครบวงจร PLC→HMI→Gateway→Cloud",
        criterion:"ทั้ง 4 ส่วนต้องทำงานเชื่อมโยงเป็นระบบเดียว รับ-ส่งสัญญาณครบวงจรผ่าน RS485/Modbus ไม่มีจุดใดขาดการเชื่อมต่อ" },
    ]
  },
  {
    id: "3.3", title: "รายการที่ 13 — ชุดซอฟต์แวร์ Dashboard IoT (1 ชุด)",
    points: [
      { id:"3.3.1", title:"ISO 9001:2015 ตรง Scope + Weblink",
        criterion:"ผู้ผลิตต้องมี ISO 9001:2015 Scope: 'Design and Manufacturing Including Sales and After-Sales service of Education Teaching Media and Training Kits for Engineering' + Weblink ยืนยัน ตาม TOR ข้อ 13.2.16–13.2.17" },
      { id:"3.3.2", title:"หนังสือแต่งตั้งตัวแทนจำหน่ายในไทย",
        criterion:"ตรวจสอบหนังสือแต่งตั้งตัวแทนจำหน่ายในประเทศไทย (Letter of Authorization) จากผู้ผลิต" },
      { id:"3.3.3", title:"ทดสอบฟังก์ชัน Dashboard IoT",
        criterion:"เชื่อมต่อ Web Server, Real-time Display, EC/pH, Solenoid Valve, Data Logging, Alert Line/SMS/Email, Group Management ไม่จำกัด, Rule Engine; Node Programming: Block+Code Mode, Arduino IDE, Modbus, CAN-BUS, IoT" },
      { id:"3.3.4", title:"แค็ตตาล็อก (จากโรงงาน/ภาพใช้งานจริง)",
        criterion:"แค็ตตาล็อกต้องมาจากโรงงานผู้ผลิตจริง ใช้รูปถ่ายจากการใช้งานจริง มีป้ายกำกับเลขข้อ TOR ตรงกันเป็นรายจุด ไม่ใช่ภาพตัดต่อหรือ Mockup" },
    ]
  },
  {
    id: "3.4", title: "รายการที่ 16 — ระบบเลี้ยงไก่ AI Agriculture Chicken Tracking (1 ชุด)",
    points: [
      { id:"3.4.1", title:"ขนาดโรงเรือนและวัสดุก่อสร้าง",
        criterion:"TOR ข้อ 16.2.1.1 — โรงเรือน ≥6×12×4 ม., เสาเหล็กกล่อง 4×4 นิ้ว หนา ≥2.3 มม., ผนังล่างอิฐบล็อก ≥0.60 ม., ผนังบนตาข่าย ≥1.90 ม., Buffer Room ≥2×6 ม., พื้นคอนกรีต ≥8×14×0.08 ม." },
      { id:"3.4.2", title:"กล้อง AI ตรวจสุขภาพไก่",
        criterion:"กล้อง AI ต้องประมวลผลติดกล้อง ครอบคลุมพื้นที่ทั้งหมด แจ้งเตือนอัตโนมัติผ่าน Dashboard IoT และ IoT Device Management เมื่อตรวจพบไก่มีสุขภาพผิดปกติ ตาม TOR ข้อ 16.2.10" },
      { id:"3.4.3", title:"เซ็นเซอร์ 5 ชนิด",
        criterion:"ครบ 5 ชนิด RS485 — อุณหภูมิ/ความชื้น, แอมโมเนีย, ออกซิเจน, คาร์บอนไดออกไซด์ (CO2), ความสว่าง (Lux) ทำงานส่งข้อมูลขึ้น Dashboard ได้" },
      { id:"3.4.4", title:"ระบบน้ำ อาหาร ตู้อนุบาล ตู้ฟักไข่",
        criterion:"ระบบพ่นหมอก 1 ชุด (หัวพ่น ≥12 ชุด), ระบบน้ำ 2 แถว, อาหาร 2 แถว, ตู้อนุบาลไก่ 2 ชุด, ตู้ฟักไข่ 1 ชุด (800-1,000 ฟอง), พัดลม 50 นิ้ว, CCTV ทำงานครบถ้วน" },
      { id:"3.4.5", title:"ISO 9001 Gateway และซอฟต์แวร์",
        criterion:"Gateway (Dual Core 32-bit, SRAM ≥512KB) และซอฟต์แวร์ควบคุมทุกชิ้นต้องมี ISO 9001:2015 หรือ มอก. + Weblink ยืนยัน" },
    ]
  },
  {
    id: "3.5", title: "รายการที่ 17 — ระบบเลี้ยงสัตว์แบบแนวตั้งด้วยระบบน้ำหมุนวน RAS (1 ชุด)",
    points: [
      { id:"3.5.1", title:"ขนาดโรงเรือนและพื้นคอนกรีต",
        criterion:"TOR ข้อ 17.1.1 — โรงเรือน ≥4×12×4 ม., เสาเหล็กกล่อง 4×4 นิ้ว หนา ≥2.3 มม., Buffer Room ≥2×4 ม.; พื้นคอนกรีต ≥6×14×0.08 ม." },
      { id:"3.5.2", title:"ทดสอบระบบ RAS (กรองทราย/Protein Skimmer/โอโซน/UV/ปั๊ม)",
        criterion:"ครบ: กรองทรายควอตซ์, Protein Skimmer, เครื่องกำเนิดโอโซน, ระบบ UV ฆ่าเชื้อ, Water Pump ทำงานหมุนเวียนน้ำวงปิดไม่รั่วซึม" },
      { id:"3.5.3", title:"เซ็นเซอร์คุณภาพน้ำ (pH/EC/DO/อุณหภูมิ)",
        criterion:"เซ็นเซอร์ pH/EC/DO/อุณหภูมิน้ำ ทำงาน Online ส่งข้อมูล Dashboard IoT เพื่อติดตามและแจ้งเตือนผ่านอุปกรณ์เคลื่อนที่ได้; กล่องเพาะเลี้ยง 4 ชุด ชุดละ 100 ใบ; ไฟ LED 12 ชุด" },
      { id:"3.5.4", title:"ISO 9001 Gateway + Weblink",
        criterion:"Gateway (Dual Core 32-bit, SRAM ≥512KB) ต้องมี ISO 9001:2015 หรือ มอก. + Weblink ยืนยัน (เหมือนข้อ 3.4.5)" },
    ]
  },
  {
    id: "3.6", title: "รายการที่ 19 — ระบบ E-Learning (1 ระบบ)",
    points: [
      { id:"3.6.1", title:"ISO 9001:2015 ตรง Scope + Weblink + เครื่องหมายการค้าจดทะเบียน",
        criterion:"ซอฟต์แวร์ E-Learning ต้องมีเครื่องหมายการค้าจดทะเบียน + ISO 9001:2015 ขอบเขตเฉพาะ + Weblink ยืนยัน ตาม TOR ข้อ 19.2.11–19.2.14" },
      { id:"3.6.2", title:"LMS ครบฟีเจอร์ (Admin/Course/Student/ประเมิน/Chat/Video Call)",
        criterion:"LMS ต้องรองรับ System Admin, Course Management, Student Management, Pre-test/Post-test, คลังข้อสอบ; Chat Room รองรับ Share Screen, Video Call, Private Message" },
      { id:"3.6.3", title:"เนื้อหาบทเรียน (Text/Graphic/Video/3D)",
        criterion:"มัลติมีเดียครบ 4 ประเภท — ข้อความ, ภาพ, วีดีโอ, โมเดล 3 มิติ; โครงสร้างครบ: ส่วนนำ, บทเรียน, แบบทดสอบวัดผลสัมฤทธิ์; Backup+Restore ทำงานได้" },
      { id:"3.6.4", title:"Responsive + หนังสือแต่งตั้งตัวแทน",
        criterion:"Responsive บน Computer/Smartphone/Tablet; เข้าผ่าน Web Browser ได้; มีหนังสือแต่งตั้งตัวแทนจำหน่ายจากผู้ผลิต (LOA) ตาม TOR ข้อ 19.2.12" },
    ]
  },
];

// ===== ข้อมูล Checklist 126 รายการ =====
const CHECKLIST_DATA = {
  "12": {
    title: "รายการที่ 12 — ชุดทดลองควบคุมการทำงานระบบสมาร์ทฟาร์ม (3 ชุด)",
    items: [
      { id:"12.1",  text:"จำนวนชุด: มีครบ 3 ชุดตามสัญญา",                                   spec:"3 ชุด ตามสัญญา",            method:"ตรวจนับจริง" },
      { id:"12.2",  text:"PLC: จำนวน I/O ≥14 I/O",                                          spec:"≥14 Input/Output",          method:"ดูแค็ตตาล็อก + นับ I/O จริง" },
      { id:"12.3",  text:"PLC: ทำงานได้จริงตาม Program ที่กำหนด",                             spec:"สั่งงาน Input→Output ทำงาน",method:"ทดสอบสด" },
      { id:"12.4",  text:"PLC: สื่อสารผ่าน RS485/Modbus ได้",                                spec:"RS485/Modbus Protocol",     method:"ทดสอบส่ง-รับข้อมูล" },
      { id:"12.5",  text:"HMI: จำนวนหน้าจอ ≥7 หน้า",                                        spec:"≥7 หน้า",                   method:"นับหน้าจอจริง" },
      { id:"12.6",  text:"HMI: แสดงผลถูกต้องทุกหน้า",                                       spec:"แสดงข้อมูลและควบคุมได้",    method:"ทดสอบแสดงผลทุกหน้า" },
      { id:"12.7",  text:"HMI: เชื่อมต่อกับ PLC และ Node Gateway ได้",                       spec:"Communication PLC↔HMI",    method:"ทดสอบสด" },
      { id:"12.8",  text:"Node Gateway: CPU ≥240 MHz",                                       spec:"≥240MHz",                   method:"ดูแค็ตตาล็อก" },
      { id:"12.9",  text:"Node Gateway: RAM ≥512 KB (SRAM)",                                 spec:"≥512KB",                   method:"ดูแค็ตตาล็อก" },
      { id:"12.10", text:"Node Gateway: รองรับ WiFi 802.11 b/g/n",                           spec:"WiFi 802.11 b/g/n",         method:"ทดสอบเชื่อมต่อ WiFi จริง" },
      { id:"12.11", text:"Node Gateway: รองรับ BLE (Bluetooth Low Energy)",                  spec:"BLE",                      method:"ดูแค็ตตาล็อก + ทดสอบ" },
      { id:"12.12", text:"Node Gateway: รับ-ส่งข้อมูลจากเซ็นเซอร์ผ่าน Modbus ได้",          spec:"Modbus Protocol",           method:"ทดสอบสด" },
      { id:"12.13", text:"Node Gateway: ส่งข้อมูลขึ้น Local Cloud ได้",                      spec:"Data to Local Cloud",       method:"ทดสอบสด + ดู Log" },
      { id:"12.14", text:"Local Cloud: CPU ≥1.5 GHz",                                       spec:"≥1.5GHz",                   method:"ดูแค็ตตาล็อก + System Info" },
      { id:"12.15", text:"Local Cloud: รองรับ 1 Gigabit Ethernet",                           spec:"Gigabit Ethernet",          method:"ดูแค็ตตาล็อก + ทดสอบ" },
      { id:"12.16", text:"Local Cloud: รองรับ Bluetooth 5.0",                                spec:"Bluetooth 5.0",             method:"ดูแค็ตตาล็อก" },
      { id:"12.17", text:"Local Cloud: มี USB 3.0 และ USB 2.0",                              spec:"USB 3.0/2.0",               method:"ตรวจนับช่อง USB จริง" },
      { id:"12.18", text:"Local Cloud: มี Micro-HDMI รองรับ 4K",                             spec:"Micro-HDMI 4K",             method:"ดูแค็ตตาล็อก + ทดสอบต่อจอ" },
      { id:"12.19", text:"Relay: มีครบ 4 ชุด และทำงานได้",                                   spec:"Relay 4 ชุด",               method:"ตรวจนับ + ทดสอบ" },
      { id:"12.20", text:"Hub-LAN WiFi: ทำงานได้และเชื่อมต่อ Network",                      spec:"Hub-LAN WiFi",              method:"ตรวจนับ + ทดสอบ" },
      { id:"12.21", text:"แหล่งจ่ายไฟ: ทำงานได้และจ่ายไฟครบทุกอุปกรณ์",                    spec:"Power Supply ครบ",          method:"ทดสอบจ่ายไฟ" },
      { id:"12.22", text:"ระบบสื่อสารครบวงจร: PLC→HMI→Gateway→Cloud ทำงานครบ",              spec:"End-to-End Integration",    method:"ทดสอบครบวงจร" },
    ]
  },
  "13": {
    title: "รายการที่ 13 — ชุดซอฟต์แวร์ Dashboard IoT (1 ชุด)",
    items: [
      { id:"13.1",  text:"ISO 9001:2015: มีใบรับรองจากผู้ผลิตซอฟต์แวร์",                    spec:"ISO 9001:2015",             method:"ตรวจใบรับรองจริง" },
      { id:"13.2",  text:"ISO 9001:2015: Scope ตรงตามที่ TOR กำหนด",                        spec:"Scope: ...Engineering",     method:"อ่าน Scope บนใบรับรอง" },
      { id:"13.3",  text:"ISO 9001:2015: ยังไม่หมดอายุ ณ วันที่ตรวจรับ",                    spec:"วันหมดอายุ > วันตรวจรับ",  method:"ตรวจวันหมดอายุ" },
      { id:"13.4",  text:"ISO 9001:2015: Weblink ใช้งานได้และข้อมูลตรงกับใบจริง",            spec:"Weblink ที่ใช้งานได้",      method:"เข้า Weblink จริง บันทึกหน้าจอ" },
      { id:"13.5",  text:"หนังสือแต่งตั้งตัวแทนจำหน่าย (LOA) ในประเทศไทย",                  spec:"LOA จากผู้ผลิตในไทย",      method:"ตรวจ LOA จริง" },
      { id:"13.6",  text:"แค็ตตาล็อก: เป็นแค็ตตาล็อกจากโรงงานผู้ผลิต",                     spec:"แค็ตตาล็อกโรงงาน",         method:"ตรวจแหล่งที่มาของแค็ตตาล็อก" },
      { id:"13.7",  text:"แค็ตตาล็อก: ใช้รูปจริงจากการใช้งาน (ไม่ใช่ Mockup)",               spec:"ภาพจากการใช้งานจริง",       method:"ตรวจสอบลักษณะภาพ" },
      { id:"13.8",  text:"แสดงผลข้อมูล Real-time จากเซ็นเซอร์/อุปกรณ์",                     spec:"Real-time Data Display",    method:"ทดสอบดู Live Data" },
      { id:"13.9",  text:"ควบคุมอุปกรณ์ผ่าน Dashboard ได้ (Remote Control)",                 spec:"Remote Device Control",     method:"ทดสอบสั่งงานจริง" },
      { id:"13.10", text:"มีระบบแจ้งเตือน Alert เมื่อค่าเกินกำหนด",                         spec:"Alert/Notification System", method:"ทดสอบ Set Threshold + ดู Alert" },
      { id:"13.11", text:"บันทึกข้อมูล (Data Logging) และดึงย้อนหลังได้",                    spec:"Historical Data",           method:"ทดสอบดูข้อมูลย้อนหลัง" },
      { id:"13.12", text:"สร้าง Report และ Graph ได้",                                       spec:"Report & Graph Generation", method:"ทดสอบสร้าง Report" },
      { id:"13.13", text:"จัดการ User / กำหนดสิทธิ์การเข้าถึง",                             spec:"Role-based Access",         method:"ทดสอบสร้าง User ต่างระดับ" },
      { id:"13.14", text:"รองรับ Modbus Protocol สื่อสารกับอุปกรณ์ได้",                      spec:"Modbus Protocol",           method:"ทดสอบเชื่อมต่อ Modbus" },
      { id:"13.15", text:"รองรับอุปกรณ์หลากหลายชนิด (Multi-device)",                        spec:"Multi-device Support",      method:"ทดสอบเชื่อมหลายอุปกรณ์" },
      { id:"13.16", text:"มีระบบ Dashboard แสดงสรุปภาพรวม",                                 spec:"Overview Dashboard",        method:"ดูหน้า Dashboard" },
      { id:"13.17", text:"ส่งออกข้อมูลได้ (Export Data)",                                    spec:"Data Export",               method:"ทดสอบ Export" },
      { id:"13.18", text:"โปรแกรมพัฒนา Node: ติดตั้งและใช้งานได้",                          spec:"Node Programming Tool",     method:"ทดสอบเปิดโปรแกรม" },
      { id:"13.19", text:"โปรแกรมพัฒนา Node: พัฒนา Flow ควบคุมอุปกรณ์ได้จริง",              spec:"Block+Code Programming",    method:"ทดสอบเขียน Flow จริง" },
      { id:"13.20", text:"โปรแกรมพัฒนา Node: เชื่อมต่อกับ Dashboard IoT ได้",               spec:"Integration with Dashboard", method:"ทดสอบเชื่อมต่อ" },
    ]
  },
  "16": {
    title: "รายการที่ 16 — ระบบเลี้ยงไก่ AI Agriculture Chicken Tracking (1 ชุด)",
    items: [
      { id:"16.1",  text:"โรงเรือน: ความกว้าง ≥6.0 เมตร",                                   spec:"≥6.0 ม.",                  method:"วัดตลับเมตร" },
      { id:"16.2",  text:"โรงเรือน: ความยาว ≥12.0 เมตร",                                    spec:"≥12.0 ม.",                 method:"วัดตลับเมตร" },
      { id:"16.3",  text:"โรงเรือน: ความสูง ≥4.0 เมตร",                                     spec:"≥4.0 ม.",                  method:"วัดตลับเมตร" },
      { id:"16.4",  text:"โรงเรือน: โครงสร้างเหล็กกล่อง เสา 4×4 นิ้ว หนา ≥2.3 มม.",        spec:"เหล็กกล่อง 4×4\" ≥2.3 มม.",method:"ตรวจสอบวัสดุ + วัดความหนา" },
      { id:"16.5",  text:"โรงเรือน: ผนังล่าง ≥0.60 ม.",                                     spec:"ผนังล่าง ≥0.60 ม.",        method:"วัด" },
      { id:"16.6",  text:"โรงเรือน: ผนังบน ≥1.90 ม.",                                       spec:"ผนังบน ≥1.90 ม.",          method:"วัด" },
      { id:"16.7",  text:"โรงเรือน: ความสูงใช้งาน ≥2.5 ม. (พื้นถึงคาน)",                    spec:"≥2.5 ม.",                  method:"วัด" },
      { id:"16.8",  text:"Buffer Room: ขนาด ≥2×6 เมตร ภายในโรงเรือน",                       spec:"≥2×6 ม.",                  method:"วัดตลับเมตร" },
      { id:"16.9",  text:"พื้นคอนกรีต: ขนาด ≥8.0×14.0 เมตร",                               spec:"≥8.0×14.0 ม.",             method:"วัด" },
      { id:"16.10", text:"พื้นคอนกรีต: ความหนา ≥0.08 เมตร (8 ซม.)",                        spec:"≥0.08 ม.",                  method:"เจาะวัดหรือดูแบบก่อสร้าง" },
      { id:"16.11", text:"ตู้ควบคุม: มี 4 โซน ครบถ้วน",                                     spec:"4 โซน",                    method:"ตรวจนับ" },
      { id:"16.12", text:"Gateway: ประมวลผล Dual Core",                                      spec:"Dual Core CPU",            method:"ดูแค็ตตาล็อก" },
      { id:"16.13", text:"Gateway: SRAM ≥512 KB",                                            spec:"≥512KB SRAM",              method:"ดูแค็ตตาล็อก" },
      { id:"16.14", text:"Gateway: ISO 9001:2015 ตรง Scope + Weblink",                       spec:"ISO 9001 + Weblink",       method:"ตรวจใบรับรอง + เข้า Weblink" },
      { id:"16.15", text:"เซ็นเซอร์อุณหภูมิและความชื้น: ทำงานและวัดค่าได้",                  spec:"Temp/Humidity Sensor",     method:"ทดสอบวัดค่าจริง" },
      { id:"16.16", text:"เซ็นเซอร์แอมโมเนีย: ทำงานและวัดค่าได้",                           spec:"Ammonia Sensor",           method:"ทดสอบวัดค่าจริง" },
      { id:"16.17", text:"เซ็นเซอร์ออกซิเจน (O2): ทำงานและวัดค่าได้",                       spec:"O2 Sensor",                method:"ทดสอบวัดค่าจริง" },
      { id:"16.18", text:"เซ็นเซอร์คาร์บอนไดออกไซด์ (CO2): ทำงานและวัดค่าได้",             spec:"CO2 Sensor",               method:"ทดสอบวัดค่าจริง" },
      { id:"16.19", text:"เซ็นเซอร์ความสว่าง (Lux): ทำงานและวัดค่าได้",                     spec:"Lux Sensor",               method:"ทดสอบวัดค่าจริง" },
      { id:"16.20", text:"เครื่องวัดแรงดันดิจิตอล: ทำงานและวัดค่าได้",                       spec:"Digital Meter",            method:"ทดสอบวัดค่าจริง" },
      { id:"16.21", text:"กล้อง AI: ติดตั้งและเปิดใช้งานได้",                               spec:"AI Camera ติดตั้งเสร็จ",   method:"ทดสอบเปิดกล้อง" },
      { id:"16.22", text:"กล้อง AI: ประมวลผลและวิเคราะห์ภาพไก่ได้จริง",                     spec:"AI Image Analysis",        method:"สาธิตวิเคราะห์ภาพ" },
      { id:"16.23", text:"กล้อง AI: แสดงผลบน Dashboard IoT",                                 spec:"AI Results on Dashboard",  method:"ดูผลบน Dashboard" },
      { id:"16.24", text:"ระบบน้ำพ่นหมอก: ทำงานได้",                                        spec:"Fog Spray System",         method:"ทดสอบเปิดระบบ" },
      { id:"16.25", text:"ชุดระบบท่อน้ำ: ครบถ้วนและไม่รั่วซึม",                             spec:"Water Pipe System",        method:"ตรวจสอบท่อและทดสอบน้ำ" },
      { id:"16.26", text:"ชุดให้อาหาร: มี 2 แถว ทำงานได้",                                  spec:"Feed System 2 แถว",        method:"ตรวจนับ + ทดสอบ" },
      { id:"16.27", text:"ชุดให้น้ำ: มี 2 แถว ทำงานได้",                                    spec:"Water System 2 แถว",       method:"ตรวจนับ + ทดสอบ" },
      { id:"16.28", text:"ตู้อนุบาลไก่: มี 2 ชุด ทำงานได้",                                 spec:"Chick Brooder 2 ชุด",     method:"ตรวจนับ + ทดสอบ" },
      { id:"16.29", text:"ตู้ฟักไข่: มี 1 ชุด ทำงานได้",                                    spec:"Incubator 1 ชุด",          method:"ตรวจนับ + ทดสอบ" },
      { id:"16.30", text:"พัดลมฟาร์ม 50 นิ้ว: ทำงานได้",                                    spec:"Farm Fan 50\"",             method:"ตรวจนับ + ทดสอบ" },
      { id:"16.31", text:"ระบบ CCTV: ติดตั้งและบันทึกภาพได้",                               spec:"CCTV System",              method:"ทดสอบดูภาพ" },
      { id:"16.32", text:"Dashboard IoT ≥27 Specs: ทำงานได้ (อ้างอิงรายการ 13)",             spec:"≥27 Specs ตามสัญญา",       method:"ใช้ Checklist รายการ 13" },
      { id:"16.33", text:"ISO 9001 ของ Dashboard IoT: ตรง Scope + Weblink",                  spec:"ISO 9001 + Weblink",       method:"ตรวจใบรับรอง + เข้า Weblink" },
      { id:"16.34", text:"E-Learning: ทำงานได้ (อ้างอิงรายการ 19)",                          spec:"E-Learning 1 ระบบ",        method:"ใช้ Checklist รายการ 19" },
    ]
  },
  "17": {
    title: "รายการที่ 17 — ระบบเลี้ยงสัตว์แบบแนวตั้งด้วยระบบน้ำหมุนวน RAS (1 ชุด)",
    items: [
      { id:"17.1",  text:"โรงเรือน RAS: ความกว้าง ≥4.0 เมตร",                               spec:"≥4.0 ม.",                  method:"วัดตลับเมตร" },
      { id:"17.2",  text:"โรงเรือน RAS: ความยาว ≥12.0 เมตร",                                spec:"≥12.0 ม.",                 method:"วัดตลับเมตร" },
      { id:"17.3",  text:"โรงเรือน RAS: ความสูง ≥4.0 เมตร",                                 spec:"≥4.0 ม.",                  method:"วัดตลับเมตร" },
      { id:"17.4",  text:"โรงเรือน RAS: โครงสร้างเหล็กกล่อง",                               spec:"เหล็กกล่อง",               method:"ตรวจสอบวัสดุ" },
      { id:"17.5",  text:"พื้นคอนกรีต RAS: ขนาด ≥6.0×14.0 เมตร",                           spec:"≥6.0×14.0 ม.",             method:"วัด" },
      { id:"17.6",  text:"พื้นคอนกรีต RAS: ความหนา ≥0.08 เมตร",                             spec:"≥0.08 ม.",                  method:"เจาะวัดหรือดูแบบ" },
      { id:"17.7",  text:"กล่องเพาะเลี้ยง: มี 4 ชุด",                                       spec:"4 ชุด",                    method:"ตรวจนับ" },
      { id:"17.8",  text:"กล่องเพาะเลี้ยง: แต่ละชุดมี 100 ใบ",                               spec:"100 ใบ/ชุด",               method:"ตรวจนับ" },
      { id:"17.9",  text:"วัสดุกรอง: ครบตามมาตรฐานที่กำหนด",                                spec:"วัสดุกรองมาตรฐาน",          method:"ตรวจสอบชนิดวัสดุ" },
      { id:"17.10", text:"ไฟ LED ส่องสว่าง: มี 12 ชุด และทำงานได้",                          spec:"LED 12 ชุด",               method:"ตรวจนับ + ทดสอบ" },
      { id:"17.11", text:"กรองทรายควอตซ์ (Trickle Filter): ติดตั้งและทำงานได้",              spec:"Trickle Filter",           method:"ทดสอบเดินระบบ" },
      { id:"17.12", text:"Protein Skimmer: ติดตั้งและทำงานได้",                              spec:"Protein Skimmer",          method:"ทดสอบเดินระบบ" },
      { id:"17.13", text:"ระบบโอโซน: ติดตั้งและทำงานได้",                                    spec:"Ozone System",             method:"ทดสอบเดินระบบ" },
      { id:"17.14", text:"ระบบ UV: ติดตั้งและทำงานได้",                                      spec:"UV System",                method:"ทดสอบเดินระบบ" },
      { id:"17.15", text:"Water Pump: ติดตั้งและทำงานสูบน้ำหมุนเวียนได้",                    spec:"Water Pump",               method:"ทดสอบสูบน้ำ" },
      { id:"17.16", text:"กล่องควบคุม RAS: ควบคุมระบบทั้งหมดได้",                            spec:"Control Box",              method:"ทดสอบสั่งงาน" },
      { id:"17.17", text:"ระบบน้ำหมุนเวียนวงปิด: ไม่รั่วซึม",                                spec:"Closed-loop Circulation",  method:"เดินระบบ + ตรวจรั่วซึม" },
      { id:"17.18", text:"เซ็นเซอร์ PH: วัดค่าได้และแสดงผลบน Dashboard",                     spec:"PH Sensor",                method:"ทดสอบวัดค่าในน้ำ" },
      { id:"17.19", text:"เซ็นเซอร์ EC: วัดค่าได้และแสดงผล",                                spec:"EC Sensor",                method:"ทดสอบวัดค่าในน้ำ" },
      { id:"17.20", text:"เซ็นเซอร์ DO (Dissolved Oxygen): วัดค่าได้",                       spec:"DO Sensor",                method:"ทดสอบวัดค่าในน้ำ" },
      { id:"17.21", text:"เซ็นเซอร์อุณหภูมิน้ำ: วัดค่าได้",                                  spec:"Water Temp Sensor",        method:"ทดสอบวัดค่าในน้ำ" },
      { id:"17.22", text:"Gateway: ISO 9001:2015 ตรง Scope + Weblink",                       spec:"ISO 9001 + Weblink",       method:"ตรวจใบรับรอง + เข้า Weblink" },
      { id:"17.23", text:"Dashboard IoT ≥27 Specs: ทำงานได้ (อ้างอิงรายการ 13)",             spec:"≥27 Specs",                method:"ใช้ Checklist รายการ 13" },
      { id:"17.24", text:"ISO 9001 ของ Dashboard IoT: ตรง Scope + Weblink",                  spec:"ISO 9001 + Weblink",       method:"ตรวจใบรับรอง" },
      { id:"17.25", text:"แคลมป์มิเตอร์ดิจิตอล: ทำงานและวัดกระแสได้",                       spec:"Digital Clamp Meter",      method:"ทดสอบวัดค่าจริง" },
      { id:"17.26", text:"E-Learning: ทำงานได้ (อ้างอิงรายการ 19)",                          spec:"E-Learning 1 ระบบ",        method:"ใช้ Checklist รายการ 19" },
    ]
  },
  "19": {
    title: "รายการที่ 19 — ระบบการเรียนรู้ผ่านสื่ออิเล็กทรอนิกส์ E-Learning (1 ระบบ)",
    items: [
      { id:"19.1",  text:"ISO 9001:2015: มีใบรับรองจากผู้ผลิตซอฟต์แวร์ E-Learning",          spec:"ISO 9001:2015",             method:"ตรวจใบรับรองจริง" },
      { id:"19.2",  text:"ISO 9001:2015: Scope ตรงตามที่ TOR กำหนด",                         spec:"Scope เฉพาะ",              method:"อ่าน Scope บนใบรับรอง" },
      { id:"19.3",  text:"ISO 9001:2015: ยังไม่หมดอายุ ณ วันที่ตรวจรับ",                     spec:"วันหมดอายุ > วันตรวจรับ",  method:"ตรวจวันหมดอายุ" },
      { id:"19.4",  text:"ISO 9001:2015: Weblink ใช้งานได้และข้อมูลตรงกับใบจริง",             spec:"Weblink ที่ใช้งานได้",      method:"เข้า Weblink จริง บันทึกหน้าจอ" },
      { id:"19.5",  text:"เครื่องหมายการค้าจดทะเบียน: ซอฟต์แวร์มีเครื่องหมายการค้า",          spec:"Registered Trademark",     method:"ตรวจใบจดทะเบียน" },
      { id:"19.6",  text:"หนังสือแต่งตั้งตัวแทนจำหน่าย (LOA) ในประเทศไทย",                   spec:"LOA จากผู้ผลิตในไทย",      method:"ตรวจ LOA จริง" },
      { id:"19.7",  text:"System Admin: จัดการระบบ LMS ได้",                                  spec:"System Admin Functions",    method:"ทดสอบ Login Admin" },
      { id:"19.8",  text:"Course Management: บริหารรายวิชาได้ (เพิ่ม/แก้ไข/ลบ)",              spec:"Course CRUD",              method:"ทดสอบสร้างรายวิชา" },
      { id:"19.9",  text:"Student Management: จัดการผู้เรียนได้",                              spec:"Student Management",        method:"ทดสอบเพิ่มผู้เรียน" },
      { id:"19.10", text:"ระบบประเมินผล: มี Pre-test และ Post-test",                           spec:"Pre/Post Test",            method:"ทดสอบสร้างแบบทดสอบ" },
      { id:"19.11", text:"ระบบประเมินผล: บันทึกและแสดงผลคะแนน",                               spec:"Score Recording",          method:"ทดสอบทำแบบทดสอบ + ดูคะแนน" },
      { id:"19.12", text:"Chat Room: ใช้งานได้จริง",                                           spec:"Chat Room",                method:"ทดสอบส่งข้อความ" },
      { id:"19.13", text:"Video Call: ใช้งานได้จริง",                                          spec:"Video Call",               method:"ทดสอบ Video Call" },
      { id:"19.14", text:"Responsive Theme: แสดงผลถูกต้องบน Computer",                        spec:"Responsive Computer",       method:"ทดสอบบน Computer" },
      { id:"19.15", text:"Responsive Theme: แสดงผลถูกต้องบน Smartphone",                      spec:"Responsive Mobile",         method:"ทดสอบบน Smartphone จริง" },
      { id:"19.16", text:"Responsive Theme: แสดงผลถูกต้องบน Tablet",                          spec:"Responsive Tablet",         method:"ทดสอบบน Tablet จริง" },
      { id:"19.17", text:"Web Browser: เข้าถึงผ่าน Web Browser ได้ (ไม่ต้องติดตั้ง App)",    spec:"Web-based Access",          method:"ทดสอบเปิด URL ใน Browser" },
      { id:"19.18", text:"เนื้อหา: มีสื่อประเภท Text",                                         spec:"Text Content",             method:"ตรวจสอบในระบบ" },
      { id:"19.19", text:"เนื้อหา: มีสื่อประเภท Graphic/ภาพ",                                 spec:"Graphic Content",          method:"ตรวจสอบในระบบ" },
      { id:"19.20", text:"เนื้อหา: มีสื่อประเภท Video",                                       spec:"Video Content",            method:"ทดสอบเล่น Video" },
      { id:"19.21", text:"เนื้อหา: มีสื่อประเภท 3D Animation",                                spec:"3D Animation",             method:"ทดสอบดู 3D" },
      { id:"19.22", text:"เนื้อหา: ครอบคลุมหัวข้อที่กำหนดในสัญญาครบถ้วน",                    spec:"Content Coverage ตามสัญญา",method:"ตรวจสอบรายการบทเรียน vs สัญญา" },
      { id:"19.23", text:"Backup System: สำรองข้อมูลได้",                                      spec:"Backup Function",          method:"ทดสอบ Backup" },
      { id:"19.24", text:"Backup System: กู้คืนข้อมูลได้ (Restore)",                           spec:"Restore Function",         method:"ทดสอบ Restore" },
    ]
  }
};

// ===== Utility Functions =====
function thaiDate(date) {
  const d = date instanceof Date ? date : new Date();
  const months = ['มกราคม','กุมภาพันธ์','มีนาคม','เมษายน','พฤษภาคม','มิถุนายน',
                  'กรกฎาคม','สิงหาคม','กันยายน','ตุลาคม','พฤศจิกายน','ธันวาคม'];
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear() + 543}`;
}

function serverTS() { return firebase.firestore.FieldValue.serverTimestamp(); }

function resultBadge(r) {
  if (r === 'ผ่าน' || r === 'สอดคล้อง') return 'badge-success';
  if (r === 'ไม่ผ่าน' || r === 'ไม่สอดคล้อง') return 'badge-danger';
  if (r === 'ไม่ได้ตรวจ' || r === 'ต้องตรวจสอบเพิ่มเติม') return 'badge-warning';
  return 'badge-secondary';
}
