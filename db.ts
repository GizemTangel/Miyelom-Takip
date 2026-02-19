import Database from 'better-sqlite3';
import path from 'path';

const db = new Database('miyelom.db');

// Initialize database schema
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT,
    name TEXT,
    specialty TEXT,
    bio TEXT,
    image TEXT,
    appearance_mode TEXT DEFAULT 'light'
  );

  CREATE TABLE IF NOT EXISTS appointments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    doctor_name TEXT,
    specialty TEXT,
    date TEXT,
    time TEXT,
    status TEXT,
    image TEXT,
    FOREIGN KEY(user_id) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS diary_entries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    date TEXT,
    time TEXT,
    pain_level INTEGER,
    note TEXT,
    tags TEXT,
    FOREIGN KEY(user_id) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS education_articles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    category TEXT,
    date TEXT,
    duration TEXT,
    content TEXT,
    completed INTEGER DEFAULT 0,
    is_new INTEGER DEFAULT 0,
    image TEXT
  );

  CREATE TABLE IF NOT EXISTS community_posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_name TEXT,
    role TEXT,
    time_ago TEXT,
    tag TEXT,
    content TEXT,
    likes INTEGER DEFAULT 0,
    comments INTEGER DEFAULT 0,
    image TEXT
  );
`);

// Seed initial data if empty
const userCount = db.prepare('SELECT count(*) as count FROM users').get() as { count: number };
if (userCount.count === 0) {
  const insertUser = db.prepare('INSERT INTO users (username, password, name, specialty, bio, image) VALUES (?, ?, ?, ?, ?, ?)');
  insertUser.run('selim', '1234', 'Selim Yılmaz', 'Hasta', 'Hekimlik tecrübelerinizden bahsedin...', 'https://lh3.googleusercontent.com/aida-public/AB6AXuAMOkO9040E6rt9ia6f04XIJGtu-Fh1CQ7OG6LrIU6L-aSEY983KW1bbTOavXaINfphF2YsZg-toKuLPFPvwtm_kKpdhN680ef-mgxJlJ1qQ87U9w_X8AX3AyLMYxLkDTU83bUNQJzF_1E-wCBdrFeMdhBW4rBzRNe4NMOboHqFIe6Ipx58pH6eEaASh5YNpEHzIBA2zRxd5o1fLJjZM6PSQfUpyQ8Yyl8j4YPnhgWnZVsy60qV8zHmZ-Wxy-7x3IDAMb6FK3UpR44r');

  const insertApt = db.prepare('INSERT INTO appointments (user_id, doctor_name, specialty, date, time, status, image) VALUES (?, ?, ?, ?, ?, ?, ?)');
  insertApt.run(1, 'Dr. Canan Yılmaz', 'Kardiyoloji Uzmanı', '24 Mayıs, 2024', '14:30', 'Onaylandı', 'https://lh3.googleusercontent.com/aida-public/AB6AXuBL-ZeUZpM3j0_byecPvel8tUmZiwbpV3-A-r1bqZ-CTdsQr8lm8fxwb7lVpUPbPwgIhUnVkXmsVDrWwesddhg_b_xYQI6EQVBFI3XueICm_MfuVRUb8nfVN4U_3qd4IN8aLsapfkkznj_tCkAjkOWlEAlNf5d4_f6UHgRbIKb0r1iAKJwa7jpJiC_MX3pmzNhAq2QRomB_oDlGBh92fTdMIYTT8XgrYBNj_hA--Vz_dGg9Cn-bZdBcFgk1VXIO18-wQvvi2lT8I43y');
  insertApt.run(1, 'Dr. Ahmet Demir', 'Dermatoloji Uzmanı', '02 Haziran, 2024', '10:15', 'Beklemede', 'https://lh3.googleusercontent.com/aida-public/AB6AXuAmX2wSR0NlV0ZwxQ0iwCbVoU73on-dU4JbK_RLqCr6biNiSBS7eG8pnxfYbRUQsjvpnAPpEjW5W8oMkS86KdQd2hjnr938iBeZEAhh-KmujuZgcPZVgBd0crJ2bPVsn23ATplFT1oOHuZcKDTX_DOMp4vfx1eGwCNN3QWpbaZbUZxncZQQf5GqDjqzvtn-15uW78mQjuYbjSrxBA8-EwGOCNX88mG7Rg5C1es4MDRP8b251zrTYCSFSufGPovxhFE8GABEXUVL06ab');

  const insertDiary = db.prepare('INSERT INTO diary_entries (user_id, date, time, pain_level, note, tags) VALUES (?, ?, ?, ?, ?, ?)');
  insertDiary.run(1, 'Bugün', '14:30', 7, 'Not: İlaç sonrası hafifleme oldu fakat mide bulantısı devam ediyor.', JSON.stringify(['Halsizlik', 'İştahsızlık']));
  insertDiary.run(1, 'Dün', '09:15', 4, 'Sabah uyandığımda kendimi daha dinç hissediyordum.', JSON.stringify(['Normal']));

  const insertArt = db.prepare('INSERT INTO education_articles (title, category, date, duration, content, completed, is_new, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?)');
  insertArt.run('Multipl Miyelom Nedir?', 'Hematoloji', '12 Ekim 2023', '5 dk', 'Multipl miyelom, kemik iliğindeki plazma hücrelerini etkileyen bir tür kan kanseridir...', 1, 0, 'https://lh3.googleusercontent.com/aida-public/AB6AXuCk6LtNFmXv9T9IHApE8qvayNvI3sNxRBKT_QhBHVTUvW2ENIXYXDsugq07MBNYvAQ09jAFo3xOFZO998UYFTtokmuaJXGShGRU6B-26byP7s3XLYfxGoOma2L2fLnHjwkdFYUEjPrQEtX8XtNP2L0p9X2Y-t3W-PL9aCnElNuJMXBGtDf7sOMUjU1yFiI258rJF-ekAjtN36NuIALjWxo-bOJkdgYtYw82zFf3WvQRhAhFckFORb5prw9JxU9FzVt-z3-cqH5DotkN');
  insertArt.run('Ağrı Yönetimi ve Destek', 'Rehabilitasyon', '10 Ekim 2023', '8 dk', 'Ağrı yönetimi hastalar için kritik bir süreçtir...', 0, 0, '');
  insertArt.run('Beslenme Rehberi', 'Beslenme', '08 Ekim 2023', '12 dk', 'Doğru beslenme tedavi sürecini destekler...', 0, 1, '');

  const insertPost = db.prepare('INSERT INTO community_posts (user_name, role, time_ago, tag, content, likes, comments, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?)');
  insertPost.run('Dr. Sarah Mitchell', 'Kardiyoloji Uzmanı', '2 saat önce', 'Sağlık İpucu', 'Birçok hastanın kronik ağrılar için özel olarak tasarlanmış rehberli farkındalık seanslarından fayda gördüğünü gözlemledim.', 124, 12, '');
  insertPost.run('Marcus Thompson', 'Topluluk Üyesi', '5 saat önce', 'Topluluk İsteği', 'Parkta haftalık düşük tempolu bir yürüyüş grubu organize edebilir miyiz?', 89, 24, 'https://lh3.googleusercontent.com/aida-public/AB6AXuAfd3ffk1sVXqm-pDAr_JgHXst_UhHmH-9QEe3rNJ6P_DeHD6-EJGBVTCR8aXyVyHo3cXj81p-DOpi9iHTlWlP8SQh347m1_DfIpWzG2PwI-nuWweQH9n0_Q4mZxFkUwi8cS1jwBWdi3exYFA2YNKWedoLC4Qw_Q2tXGiD8eHUfP35-v0EmveypAaD9HwHmhmvmHBMM207IZo1JmbeMuIywFpqmrUzklHxynjpyWOu64Ylqy7Nw0zduztWamN1FxKfqT6ioLzwryKgA');
}

export default db;
