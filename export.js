// =====================================================
//  export.js — Export กระดาษทำการเป็นไฟล์ Word (.doc) และ Excel (.xlsx)
//  ใช้ร่วมกันทุกหน้า: audit.html, checklist.html, observe.html, report.html
//  ต้องโหลด SheetJS (xlsx.full.min.js) ก่อนไฟล์นี้สำหรับฟังก์ชัน Excel
// =====================================================

/**
 * ส่งออกเนื้อหาใน container เป็นไฟล์ Word (.doc)
 * ใช้เทคนิค HTML-in-.doc ซึ่ง Microsoft Word เปิดได้โดยตรง คงตาราง/สไตล์พื้นฐานไว้
 * @param {string} containerId - id ของ element ที่จะ export (เช่น 'mainContent')
 * @param {string} filename    - ชื่อไฟล์ (ไม่ต้องใส่นามสกุล)
 * @param {string} docTitle    - ชื่อเรื่องเอกสาร
 * @param {function} [beforeClone] - callback เรียกก่อน clone (เช่น บังคับแสดงทุกแท็บ) ต้อง return ฟังก์ชัน cleanup (หรือ undefined)
 */
function exportWord(containerId, filename, docTitle, beforeClone) {
  const container = document.getElementById(containerId);
  if (!container) { alert('ไม่พบเนื้อหาที่จะส่งออก'); return; }

  let cleanup = null;
  if (typeof beforeClone === 'function') cleanup = beforeClone();

  const clone = container.cloneNode(true);
  if (cleanup) cleanup();

  // ลบส่วนที่ไม่ควรอยู่ในเอกสาร (ปุ่ม, navbar, ช่องอัปโหลดไฟล์)
  clone.querySelectorAll('.no-print, button, .navbar, .upload-btn-wrap, .photo-grid, script').forEach(el => el.remove());

  // แปลง input/textarea เป็นข้อความล้วน (คงค่าปัจจุบันที่ผู้ใช้กรอกไว้)
  // หมายเหตุ: อ่านค่าจาก element ต้นฉบับ (ผ่าน id) แทนที่จะอ่านจาก clone โดยตรง
  // เพราะ cloneNode(true) ไม่รับประกันว่าจะคัดลอกค่า/สถานะที่ถูกตั้งผ่าน JavaScript
  // (เช่น .value ที่ตั้งตอนโหลดข้อมูลจาก Firestore) ได้ครบถ้วนเสมอไปในทุกกรณี
  clone.querySelectorAll('input[id], textarea[id]').forEach(el => {
    const orig = document.getElementById(el.id);
    const val = orig ? orig.value : el.value;
    const span = document.createElement('span');
    span.textContent = val || '';
    span.style.cssText = 'display:inline-block;border-bottom:1px solid #999;min-width:50px;padding:1px 4px;';
    el.replaceWith(span);
  });
  clone.querySelectorAll('input:not([id]), textarea:not([id])').forEach(el => {
    const span = document.createElement('span');
    span.textContent = el.value || '';
    span.style.cssText = 'display:inline-block;border-bottom:1px solid #999;min-width:50px;padding:1px 4px;';
    el.replaceWith(span);
  });
  // แปลง select เป็นข้อความของตัวเลือกที่ถูกเลือก (อ่านจาก element ต้นฉบับเช่นกัน)
  clone.querySelectorAll('select[id]').forEach(el => {
    const orig = document.getElementById(el.id);
    const src = orig || el;
    const opt = src.options[src.selectedIndex];
    const span = document.createElement('span');
    span.textContent = opt ? opt.text : '';
    span.style.cssText = 'font-weight:bold;';
    el.replaceWith(span);
  });
  clone.querySelectorAll('select:not([id])').forEach(el => {
    const span = document.createElement('span');
    const opt = el.options[el.selectedIndex];
    span.textContent = opt ? opt.text : '';
    span.style.cssText = 'font-weight:bold;';
    el.replaceWith(span);
  });
  // ลบ div ที่ใช้สำหรับโหมดพิมพ์เท่านั้น (ซ้ำกับค่าที่แปลงไปแล้ว)
  clone.querySelectorAll('.textarea-print, .note-print, .print-badge').forEach(el => el.remove());

  const html = `<!DOCTYPE html>
<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40">
<head><meta charset="utf-8"><title>${docTitle}</title>
<style>
  @page { size: A4; margin: 2cm; }
  body { font-family:'TH SarabunPSK','Sarabun',sans-serif; font-size:14pt; color:#000; }
  table { border-collapse: collapse; width:100%; margin-bottom:10px; }
  td, th { border:1px solid #999; padding:4px 8px; font-size:11pt; vertical-align:top; }
  th { background:#e8f5e9; font-weight:bold; }
  h4, h5, h6 { color:#1b5e20; }
  .card { margin-bottom:16px; }
  .card-header-kat, .card-header { background:#2e7d32 !important; color:#fff; padding:6px 10px; font-weight:bold; }
  .badge { border:1px solid #999; padding:1px 6px; border-radius:8px; font-size:9pt; }
  .obs-row { border:1px solid #ccc; padding:8px; margin-bottom:8px; }
  .criterion-box { background:#f1f8e9; padding:6px 8px; margin-bottom:6px; }
  .sig-block { border:1px solid #999; padding:8px; margin-bottom:8px; }
</style>
</head>
<body>${clone.innerHTML}</body>
</html>`;

  const blob = new Blob(['﻿', html], { type: 'application/msword' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename + '.doc';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(link.href);
}

/**
 * ส่งออกตารางทั้งหมดใน container เป็นไฟล์ Excel (.xlsx) — 1 sheet ต่อ 1 ตาราง
 * และเพิ่ม sheet "ข้อมูลทั่วไป" รวบรวมค่าจาก input/textarea ที่อยู่นอกตาราง
 * @param {string} containerId
 * @param {string} filename
 */
function exportExcelTables(containerId, filename) {
  if (typeof XLSX === 'undefined') { alert('ไม่พบไลบรารี XLSX'); return; }
  const container = document.getElementById(containerId);
  if (!container) { alert('ไม่พบเนื้อหาที่จะส่งออก'); return; }

  const wb = XLSX.utils.book_new();
  const tables = container.querySelectorAll('table');
  const usedNames = new Set();
  let idx = 0;

  tables.forEach(tbl => {
    idx++;
    let name = 'ตาราง' + idx;
    const card = tbl.closest('.card');
    if (card) {
      const header = card.querySelector('.card-header-kat, .card-header');
      if (header) name = header.textContent.trim().replace(/^[^ก-๙A-Za-z0-9]*/, '').replace(/[\\/?*[\]:]/g, '').substring(0, 28);
    }
    let uniqueName = name || ('ตาราง' + idx);
    let n = 1;
    while (usedNames.has(uniqueName)) { uniqueName = name.substring(0, 25) + '_' + (++n); }
    usedNames.add(uniqueName);

    const ws = XLSX.utils.table_to_sheet(tbl);
    XLSX.utils.book_append_sheet(wb, ws, uniqueName);
  });

  // เก็บ input/textarea ที่ "ไม่ได้" อยู่ในตาราง เป็น sheet เพิ่มเติม
  const looseFields = [];
  container.querySelectorAll('input, textarea, select').forEach(el => {
    if (el.closest('table')) return; // อยู่ในตารางแล้ว ข้าม
    if (el.closest('.no-print') && el.tagName !== 'TEXTAREA' && el.tagName !== 'INPUT' && el.tagName !== 'SELECT') return;
    let label = '';
    const lbl = el.closest('.form-group')?.querySelector('label') || document.querySelector(`label[for="${el.id}"]`);
    if (lbl) label = lbl.textContent.trim();
    else if (el.placeholder) label = el.placeholder;
    else label = el.id || '';
    let value = '';
    if (el.tagName === 'SELECT') value = el.options[el.selectedIndex] ? el.options[el.selectedIndex].text : '';
    else value = el.value || '';
    looseFields.push([label, value]);
  });
  if (looseFields.length > 0) {
    const ws2 = XLSX.utils.aoa_to_sheet([['หัวข้อ', 'ค่า'], ...looseFields]);
    ws2['!cols'] = [{ wch: 40 }, { wch: 60 }];
    XLSX.utils.book_append_sheet(wb, ws2, 'ข้อมูลทั่วไป');
  }

  if (idx === 0 && looseFields.length === 0) { alert('ไม่พบข้อมูลที่จะส่งออก'); return; }
  XLSX.writeFile(wb, filename + '.xlsx');
}
