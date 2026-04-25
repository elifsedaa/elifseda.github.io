/* ===== HAFTA 7 - ETKİLEŞİMLİ ETKİNLİK KAYIT JS ===== */

// ── 1. TEMA DEĞİŞTİRME ──────────────────────────────────────────────────────
const temaBtn = document.getElementById('temaBtn');

temaBtn.addEventListener('click', function () {
  document.body.classList.toggle('dark-theme');

  if (document.body.classList.contains('dark-theme')) {
    temaBtn.textContent = '☀️ Açık Tema';
    temaBtn.classList.remove('btn-outline-light');
    temaBtn.classList.add('btn-warning');
  } else {
    temaBtn.textContent = '🌙 Koyu Tema';
    temaBtn.classList.remove('btn-warning');
    temaBtn.classList.add('btn-outline-light');
  }
});

// ── 2. FORM DOĞRULAMA VE BAŞVURU ÖZETİ ──────────────────────────────────────
const form = document.getElementById('basvuruForm');
const uyariDiv = document.getElementById('formUyari');
const ozetDiv = document.getElementById('basvuruOzet');

form.addEventListener('submit', function (e) {
  e.preventDefault(); // Sayfa yenilenmesini engelle

  // Tüm alanları al
  const adSoyad     = document.getElementById('adSoyad').value.trim();
  const eposta      = document.getElementById('eposta').value.trim();
  const telefon     = document.getElementById('telefon').value.trim();
  const etkinlik    = document.getElementById('etkinlik').value;
  const katilimTuru = document.getElementById('katilimTuru').value;
  const motivasyon  = document.getElementById('motivasyon').value.trim();
  const kvkk        = document.getElementById('kvkk').checked;

  // Eksik alan kontrolü
  if (!adSoyad || !eposta || !telefon || !etkinlik || !katilimTuru || !motivasyon || !kvkk) {
    uyariDiv.classList.remove('d-none');
    ozetDiv.innerHTML = '';
    uyariDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
    return;
  }

  // Başarılı → uyarıyı gizle
  uyariDiv.classList.add('d-none');

  // Başvuru özetini oluştur
  const etkinlikIsimleri = {
    'yapay-zeka': 'Yapay Zeka Atölyesi',
    'web-gelistirme': 'Web Geliştirme Semineri',
    'veri-bilimi': 'Veri Bilimi Mini Bootcamp'
  };

  const katilimIsimleri = {
    'yuz-yuze': 'Yüz Yüze',
    'online': 'Online (Canlı)',
    'hibrit': 'Hibrit'
  };

  const tarih = new Date().toLocaleDateString('tr-TR', {
    day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit'
  });

  const ozetSatirlar = [
    { label: 'Ad Soyad',      deger: adSoyad },
    { label: 'E-posta',       deger: eposta },
    { label: 'Telefon',       deger: telefon },
    { label: 'Etkinlik',      deger: etkinlikIsimleri[etkinlik] || etkinlik },
    { label: 'Katılım Türü',  deger: katilimIsimleri[katilimTuru] || katilimTuru },
    { label: 'Motivasyon',    deger: motivasyon },
    { label: 'Başvuru Tarihi',deger: tarih }
  ];

  const satirHTML = ozetSatirlar.map(s => `
    <div class="ozet-row">
      <span class="ozet-label">${s.label}</span>
      <span>${s.deger}</span>
    </div>
  `).join('');

  ozetDiv.innerHTML = `
    <div class="card shadow-sm p-4 mt-2">
      <div class="d-flex align-items-center mb-3">
        <span style="font-size:2rem; margin-right:12px;">🎉</span>
        <div>
          <h5 class="mb-0 fw-bold">Başvurunuz Alındı!</h5>
          <small class="text-muted">Tüm bilgileriniz başarıyla kaydedildi.</small>
        </div>
      </div>
      ${satirHTML}
    </div>
  `;

  ozetDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });

  // Formu sıfırla
  form.reset();
});
