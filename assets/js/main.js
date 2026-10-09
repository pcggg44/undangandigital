/* =========================================================
   WEDDING INVITATION JAVASCRIPT
========================================================= */


document.addEventListener("DOMContentLoaded", () => {


    /* ================= PRELOADER ================= */

    const preloader =
        document.getElementById("preloader");

    window.addEventListener("load", () => {

        setTimeout(() => {

            preloader.classList.add("hide");

        }, 800);

    });


    /* ================= ELEMENTS ================= */

    const opening =
        document.getElementById("opening");

    const mainContent =
        document.getElementById("mainContent");

    const openButton =
        document.getElementById("openInvitation");

    const music =
        document.getElementById("weddingMusic");

    const musicButton =
        document.getElementById("musicButton");


    /* ================= ELEGANT SHOOTING STARS (FULL PAGE) ================= */

    const shootingStarsContainer =
        document.getElementById("shootingStarsContainer");


    function createShootingStar() {

        if (!shootingStarsContainer) return;

        const star = document.createElement("div");
        star.className = "shooting-star";

        const colors = ["gold", "gold", "gold", "white"];
        const color = colors[Math.floor(Math.random() * colors.length)];

        if (color === "gold") {
            star.classList.add("gold");
        } else {
            star.classList.add("white");
        }

        const startX = Math.random() * 100;
        const startY = Math.random() * 40;

        const angle = -30 - Math.random() * 25;

        const tailLength = 200 + Math.random() * 180;

        const travelX = 300 + Math.random() * 500;
        const travelY = 200 + Math.random() * 400;

        const duration = 2 + Math.random() * 2.5;

        const size = 3 + Math.random() * 3;

        star.style.left = `${startX}%`;
        star.style.top = `${startY}%`;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.setProperty('--angle', `${angle}deg`);
        star.style.setProperty('--tail-length', `${tailLength}px`);
        star.style.setProperty('--travel-x', `${travelX}px`);
        star.style.setProperty('--travel-y', `${travelY}px`);
        star.style.animationDuration = `${duration}s`;
        star.style.animationDelay = `${Math.random() * 0.4}s`;

        shootingStarsContainer.appendChild(star);

        setTimeout(() => {
            if (star.parentNode) {
                star.remove();
            }
        }, (duration + 0.6) * 1000);

    }


    function startShootingStarsLoop() {

        for (let i = 0; i < 6; i++) {
            setTimeout(() => createShootingStar(), i * 300);
        }

        function scheduleNext() {

            const delay = 900 + Math.random() * 2200;

            setTimeout(() => {

                const count = Math.random() < 0.4 ? 2 : 1;

                for (let i = 0; i < count; i++) {
                    setTimeout(() => createShootingStar(), i * 250);
                }

                scheduleNext();

            }, delay);

        }

        scheduleNext();

    }


    startShootingStarsLoop();


    /* ================= GUEST NAME ================= */

    const urlParams =
        new URLSearchParams(window.location.search);

    const guest =
        urlParams.get("to");

    const guestName =
        document.getElementById("guestName");

    if (guest) {

        guestName.textContent =
            decodeURIComponent(guest);

    }


    /* ================= OPEN INVITATION ================= */

    openButton.addEventListener("click", () => {

        opening.classList.add("closed");

        mainContent.classList.remove("hidden");

        document.body.classList.remove("locked");

        window.scrollTo({
            top: 0,
            behavior: "instant"
        });


        if (music && music.querySelector("source")) {

            music.play()
                .then(() => {

                    musicButton.classList.add("playing");

                    musicButton.innerHTML =
                        '<i class="fa-solid fa-volume-high"></i>';

                })
                .catch(() => {

                    console.log(
                        "Browser memblokir autoplay."
                    );

                });

        }

    });


    /* ================= MUSIC ================= */

    musicButton.addEventListener("click", () => {

        if (!music.querySelector("source")) {

            alert(
                "Tambahkan file musik terlebih dahulu pada index.html."
            );

            return;

        }


        if (music.paused) {

            music.play();

            musicButton.classList.add("playing");

            musicButton.innerHTML =
                '<i class="fa-solid fa-volume-high"></i>';

        } else {

            music.pause();

            musicButton.classList.remove("playing");

            musicButton.innerHTML =
                '<i class="fa-solid fa-volume-xmark"></i>';

        }

    });


    /* ================= COUNTDOWN ================= */

    const weddingDate =
        new Date("December 14, 2026 08:00:00").getTime();


    function updateCountdown() {

        const now =
            new Date().getTime();

        const distance =
            weddingDate - now;


        if (distance <= 0) {

            document.getElementById("days").textContent = "00";
            document.getElementById("hours").textContent = "00";
            document.getElementById("minutes").textContent = "00";
            document.getElementById("seconds").textContent = "00";

            return;

        }


        const days =
            Math.floor(
                distance /
                (1000 * 60 * 60 * 24)
            );


        const hours =
            Math.floor(
                (distance %
                    (1000 * 60 * 60 * 24)) /
                (1000 * 60 * 60)
            );


        const minutes =
            Math.floor(
                (distance %
                    (1000 * 60 * 60)) /
                (1000 * 60)
            );


        const seconds =
            Math.floor(
                (distance %
                    (1000 * 60)) /
                1000
            );


        document.getElementById("days").textContent =
            String(days).padStart(2, "0");

        document.getElementById("hours").textContent =
            String(hours).padStart(2, "0");

        document.getElementById("minutes").textContent =
            String(minutes).padStart(2, "0");

        document.getElementById("seconds").textContent =
            String(seconds).padStart(2, "0");

    }


    updateCountdown();

    setInterval(updateCountdown, 1000);


    /* ================= SCROLL REVEAL ================= */

    const revealElements =
        document.querySelectorAll(".reveal");


    const revealObserver =
        new IntersectionObserver(
            (entries) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("active");

                    }

                });

            },
            {
                threshold: 0.15
            }
        );


    revealElements.forEach(element => {

        revealObserver.observe(element);

    });


    /* ================= BACK TO TOP ================= */

    const toTop =
        document.getElementById("toTop");


    window.addEventListener("scroll", () => {

        if (window.scrollY > 600) {

            toTop.classList.add("show");

        } else {

            toTop.classList.remove("show");

        }

    });


    toTop.addEventListener("click", () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });


    /* ================= RSVP + API ================= */

    const API_URL = "api/";

    const rsvpForm = document.getElementById("rsvpForm");
    const wishesContainer = document.getElementById("wishesList");
    const wishesStats = document.getElementById("wishesStats");


    function escapeHtml(text) {
        const div = document.createElement("div");
        div.textContent = text;
        return div.innerHTML;
    }


    function formatDate(dateStr) {
        // Paksa treat string sebagai UTC (Railway pakai UTC)
        const date = new Date(dateStr.replace(" ", "T") + "Z");
        const now = new Date();
        const diff = Math.floor((now - date) / 1000);

        if (diff < 60) return "Baru saja";
        if (diff < 3600) return Math.floor(diff / 60) + " menit lalu";
        if (diff < 86400) return Math.floor(diff / 3600) + " jam lalu";
        if (diff < 604800) return Math.floor(diff / 86400) + " hari lalu";

        return date.toLocaleDateString("id-ID", {
            day: "numeric",
            month: "short",
            year: "numeric",
            timeZone: "Asia/Jakarta"
        });
    }


    /* ===== Kirim RSVP ===== */
    rsvpForm.addEventListener("submit", async (event) => {

        event.preventDefault();

        const name       = document.getElementById("name").value.trim();
        const attendance = document.getElementById("attendance").value;
        const message    = document.getElementById("message").value.trim();

        if (!name || !attendance) {
            alert("Mohon lengkapi nama dan konfirmasi kehadiran.");
            return;
        }

        const submitBtn = rsvpForm.querySelector("button[type='submit']");
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Mengirim...';
        submitBtn.disabled = true;

        try {
            const response = await fetch(API_URL + "save_rsvp.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, attendance, message })
            });

            const result = await response.json();

            if (result.status === "success") {
                alert(`Terima kasih, ${name}! 💐\nUcapanmu sudah tersimpan.`);
                rsvpForm.reset();
                loadWishes();
                loadStats();
            } else {
                alert("Gagal: " + result.message);
            }

        } catch (error) {
            console.error(error);
            alert("Gagal terhubung ke server. Cek XAMPP sudah running? 🙏");
        } finally {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }

    });


    /* ===== Load daftar ucapan ===== */
    async function loadWishes() {

        if (!wishesContainer) return;

        try {
            const response = await fetch(API_URL + "get_rsvp.php");
            const result = await response.json();

            if (result.status !== "success") {
                wishesContainer.innerHTML = '<p class="empty-wishes">Gagal memuat ucapan.</p>';
                return;
            }

            const wishes = result.data;

            if (wishes.length === 0) {
                wishesContainer.innerHTML =
                    '<p class="empty-wishes"><i class="fa-regular fa-envelope-open"></i><br>Ucapan dari tamu akan muncul di sini.</p>';
                return;
            }

            wishesContainer.innerHTML = wishes.map(w => {

                const initial = w.name.trim().charAt(0).toUpperCase();

                return `
                    <div class="wish-card">
                        <div class="wish-header">
                            <div class="wish-user">
                                <div class="wish-avatar">${escapeHtml(initial)}</div>
                                <div class="wish-user-info">
                                    <strong>${escapeHtml(w.name)}</strong>
                                    <span class="wish-time">${formatDate(w.created_at)}</span>
                                </div>
                            </div>
                            <span class="wish-badge ${w.attendance === 'hadir' ? 'hadir' : 'tidak'}">
                                ${w.attendance === 'hadir' ? '✓ Hadir' : '✗ Tidak Hadir'}
                            </span>
                        </div>
                        <p class="wish-message">${escapeHtml(w.message || 'Tanpa pesan')}</p>
                    </div>
                `;
            }).join("");

        } catch (error) {
            console.error("Gagal memuat ucapan:", error);
            wishesContainer.innerHTML = '<p class="empty-wishes">Gagal terhubung ke server.</p>';
        }

    }


    /* ===== Load statistik ===== */
    async function loadStats() {

        if (!wishesStats) return;

        try {
            const response = await fetch(API_URL + "get_stats.php");
            const result = await response.json();

            if (result.status !== "success") return;

            wishesStats.innerHTML = `
                <div class="stat-item">
                    <strong>${result.total}</strong>
                    <span>Total</span>
                </div>
                <div class="stat-item hadir">
                    <strong>${result.hadir}</strong>
                    <span>Hadir</span>
                </div>
                <div class="stat-item tidak">
                    <strong>${result.tidak}</strong>
                    <span>Tidak Hadir</span>
                </div>
            `;

        } catch (error) {
            console.error("Gagal memuat statistik:", error);
        }

    }


    loadWishes();
    loadStats();

    setInterval(() => {
        loadWishes();
        loadStats();
    }, 30000);


    /* ================= COPY TO CLIPBOARD (AMPLOP DIGITAL) ================= */

    let copyToast = document.querySelector(".copy-toast");

    if (!copyToast) {
        copyToast = document.createElement("div");
        copyToast.className = "copy-toast";
        copyToast.innerHTML = '<i class="fa-solid fa-circle-check"></i> Tersalin!';
        document.body.appendChild(copyToast);
    }

    let toastTimeout;

    function showCopyToast() {
        copyToast.classList.add("show");
        clearTimeout(toastTimeout);
        toastTimeout = setTimeout(() => {
            copyToast.classList.remove("show");
        }, 1800);
    }


    document.querySelectorAll("[data-copy]").forEach(el => {
        el.addEventListener("click", async (event) => {
            event.preventDefault();

            const text = el.getAttribute("data-copy");
            if (!text) return;

            try {
                if (navigator.clipboard && window.isSecureContext) {
                    await navigator.clipboard.writeText(text);
                } else {
                    const temp = document.createElement("textarea");
                    temp.value = text;
                    temp.style.position = "fixed";
                    temp.style.opacity = "0";
                    document.body.appendChild(temp);
                    temp.select();
                    document.execCommand("copy");
                    document.body.removeChild(temp);
                }

                showCopyToast();

                if (el.classList.contains("copy-btn")) {
                    const originalHTML = el.innerHTML;
                    el.classList.add("copied");
                    el.innerHTML = '<i class="fa-solid fa-check"></i>';

                    setTimeout(() => {
                        el.classList.remove("copied");
                        el.innerHTML = originalHTML;
                    }, 1800);
                }

            } catch (error) {
                console.error("Gagal copy:", error);
                alert("Gagal menyalin. Silakan salin manual: " + text);
            }
        });
    });


    /* ================= PARALLAX STARS ================= */

    window.addEventListener("mousemove", (event) => {

        const stars =
            document.querySelectorAll(
                ".stars, .hero-stars, .quote-stars"
            );


        const x =
            (event.clientX /
                window.innerWidth - .5) * 10;


        const y =
            (event.clientY /
                window.innerHeight - .5) * 10;


        stars.forEach(star => {

            star.style.transform =
                `translate(${x}px, ${y}px)`;

        });

    });

       /* ================= PHOTO BOOTH ================= */

    const cameraVideo = document.getElementById("cameraVideo");
    const photoCanvas = document.getElementById("photoCanvas");
    const frameOverlay = document.getElementById("frameOverlay");
    const placeholder  = document.getElementById("photoboothPlaceholder");
    const hintText     = document.getElementById("photoboothHint");

    const startCameraBtn   = document.getElementById("startCamera");
    const switchCameraBtn  = document.getElementById("switchCamera");
    const takePhotoBtn     = document.getElementById("takePhoto");
    const downloadPhotoBtn = document.getElementById("downloadPhoto");
    const retakePhotoBtn   = document.getElementById("retakePhoto");

    let cameraStream = null;
    let capturedDataURL = null;

   // ← baru: state kamera mana yang aktif
    let currentFacingMode = "user";   // "user" = depan, "environment" = belakang


    async function startCamera(facingMode = currentFacingMode) {

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        alert("Browser kamu tidak mendukung akses kamera. Coba pakai Chrome / Safari terbaru.");
        return;
    }

    if (cameraStream) {
        cameraStream.getTracks().forEach(track => track.stop());
        cameraStream = null;
    }

    try {
        cameraStream = await navigator.mediaDevices.getUserMedia({
            video: {
                facingMode: { ideal: facingMode },
                width:  { ideal: 1080 },
                height: { ideal: 1920 }
            },
            audio: false
        });

        currentFacingMode = facingMode;

        cameraVideo.srcObject = cameraStream;
        await cameraVideo.play();

        // ← INI YANG BARU: kasih class back-camera ke preview
        const previewEl = document.querySelector(".photobooth-preview");
        if (previewEl) {
            if (facingMode === "environment") {
                previewEl.classList.add("back-camera");
            } else {
                previewEl.classList.remove("back-camera");
            }
        }

        placeholder.classList.add("hidden");
        hintText.textContent = facingMode === "user"
            ? "Kamera depan aktif — arahkan wajahmu ke frame"
            : "Kamera belakang aktif — arahkan ke objek";

        startCameraBtn.classList.add("hidden");
        takePhotoBtn.classList.remove("hidden");
        switchCameraBtn.classList.remove("hidden");

        frameOverlay.classList.remove("active");

    } catch (error) {
        console.error("Gagal akses kamera:", error);
        alert("Tidak bisa mengakses kamera. Pastikan kamu mengizinkan akses kamera di browser.");
    }
}

    function takePhoto() {

    if (!cameraVideo.videoWidth) {
        alert("Kamera belum siap. Tunggu sebentar.");
        return;
    }

    // ===== Paksa canvas 3:4 (portrait) =====
    const targetRatio = 3 / 4;
    const targetW = 1080;
    const targetH = Math.round(targetW / targetRatio); // 1440

    photoCanvas.width  = targetW;
    photoCanvas.height = targetH;

    const ctx = photoCanvas.getContext("2d");

    const vw = cameraVideo.videoWidth;
    const vh = cameraVideo.videoHeight;

    // Crop tengah biar rasio 3:4
    let cropW = vw;
    let cropH = vw / targetRatio;

    if (cropH > vh) {
        cropH = vh;
        cropW = vh * targetRatio;
    }

    const cropX = (vw - cropW) / 2;
    const cropY = (vh - cropH) / 2;

    ctx.save();

    // Mirror HANYA kalau kamera depan
    if (currentFacingMode === "user") {
        ctx.translate(targetW, 0);
        ctx.scale(-1, 1);
    }

    ctx.drawImage(
        cameraVideo,
        cropX, cropY, cropW, cropH,
        0, 0, targetW, targetH
    );
    ctx.restore();

    capturedDataURL = photoCanvas.toDataURL("image/png");

    photoCanvas.style.display = "block";
    cameraVideo.style.display = "none";

    frameOverlay.classList.add("active");

    if (cameraStream) {
        cameraStream.getTracks().forEach(track => track.stop());
        cameraStream = null;
    }

    hintText.textContent = "Foto berhasil diambil — unduh atau ambil ulang";

    takePhotoBtn.classList.add("hidden");
    startCameraBtn.classList.add("hidden");
    downloadPhotoBtn.classList.remove("hidden");
    retakePhotoBtn.classList.remove("hidden");
}


    function downloadPhoto() {

        if (!capturedDataURL) {
            alert("Belum ada foto yang diambil.");
            return;
        }

        // Gabungkan foto + frame jadi satu gambar
        const finalCanvas = document.createElement("canvas");
        finalCanvas.width  = photoCanvas.width;
        finalCanvas.height = photoCanvas.height;

        const ctx = finalCanvas.getContext("2d");

        // Gambar foto
        const photoImg = new Image();
        photoImg.onload = () => {

            ctx.drawImage(photoImg, 0, 0, finalCanvas.width, finalCanvas.height);

            // Gambar frame di atasnya
            const frameImg = new Image();
            frameImg.crossOrigin = "anonymous";
            frameImg.onload = () => {

                ctx.drawImage(frameImg, 0, 0, finalCanvas.width, finalCanvas.height);

                // Trigger download
                const link = document.createElement("a");
                link.download = `wedding-photobooth-${Date.now()}.png`;
                link.href = finalCanvas.toDataURL("image/png");
                link.click();

                hintText.textContent = "Foto berhasil diunduh 💐";
            };

            frameImg.onerror = () => {
                // Kalau frame gagal load, download foto saja
                const link = document.createElement("a");
                link.download = `wedding-photobooth-${Date.now()}.png`;
                link.href = capturedDataURL;
                link.click();
                hintText.textContent = "Frame tidak ditemukan, foto diunduh tanpa frame.";
            };

            frameImg.src = "assets/img/frame.png";
        };

        photoImg.src = capturedDataURL;
    }


    async function retakePhoto() {

        // Reset tampilan
        photoCanvas.style.display = "none";
        cameraVideo.style.display = "block";
        frameOverlay.classList.remove("active");

        capturedDataURL = null;

        takePhotoBtn.classList.add("hidden");
        downloadPhotoBtn.classList.add("hidden");
        retakePhotoBtn.classList.add("hidden");

        // Nyalakan kamera lagi dengan mode yang sama (depan/belakang)
    await startCamera(currentFacingMode);
    }

   async function switchCamera() {

    // Ganti mode: user ↔ environment
    const newMode = currentFacingMode === "user" ? "environment" : "user";

    // Restart kamera dengan mode baru
    await startCamera(newMode);
}


    if (startCameraBtn) {

        startCameraBtn.addEventListener("click", startCamera);
        switchCameraBtn.addEventListener("click", switchCamera);
        takePhotoBtn.addEventListener("click", takePhoto);
        downloadPhotoBtn.addEventListener("click", downloadPhoto);
        retakePhotoBtn.addEventListener("click", retakePhoto);

    }

    /* ================= END PHOTO BOOTH ================= */


});
