let genreAktif = "Semua";
let jumlahKeranjang = 0;

// Render Buku
function renderBuku(data) {
  const container = document.getElementById("buku-container");

  container.innerHTML = "";

  if (data.length === 0) {
    container.innerHTML =
      `
      <h2 class="text-center text-gray-500 col-span-full">
        Buku tidak ditemukan
      </h2>
      `;
    return;
  }

  data.forEach((buku) => {
    container.innerHTML +=
      `
      <div class="bg-white rounded-xl shadow-lg p-4 hover:scale-105 transition">

        <!-- Sampul Buku -->
        <div class="bg-amber-200 h-56 rounded-lg flex items-center justify-center text-center font-bold text-xl mb-4">
          ${buku.judul_buku}
        </div>

        <h2 class="font-bold text-lg">
          ${buku.judul_buku}
        </h2>

        <p>✍️ ${buku.penulis}</p>
        <p>🏢 ${buku.penerbit}</p>
        <p>📚 ${buku.genre}</p>
        <p>💰 Rp ${buku.harga.toLocaleString()}</p>

        <p id="stok-${buku.id}">
          Stok: ${buku.stok_buku}
        </p>

        <button
          onclick="masukkanKeranjang(${buku.id})"
          class="bg-amber-800 text-white px-4 py-2 rounded mt-3 w-full hover:bg-amber-900"
        >
          Masukkan Keranjang
        </button>

      </div>
      `;
  });
}

// Filter Genre
document.querySelectorAll(".genre-btn").forEach((btn) => {
  btn.addEventListener("click", () => {

    genreAktif = btn.dataset.genre;

    filterBuku();
  });
});

// Search Multi Keyword
document.getElementById("search").addEventListener("keyup", filterBuku);

function filterBuku() {

  const keyword =
    document.getElementById("search")
    .value
    .toLowerCase();

  let hasil = bukuData.filter((buku) => {

    const cocokGenre =
      genreAktif === "Semua" ||
      buku.genre === genreAktif;

    const cocokSearch =
      buku.judul_buku.toLowerCase().includes(keyword) ||
      buku.penulis.toLowerCase().includes(keyword) ||
      buku.penerbit.toLowerCase().includes(keyword);

    return cocokGenre && cocokSearch;
  });

  renderBuku(hasil);
}

// Simulasi Keranjang
function masukkanKeranjang(id) {

  const buku = bukuData.find(
    (b) => b.id === id
  );

  if (buku.stok_buku <= 0) {
    alert("Stok buku habis!");
    return;
  }

  buku.stok_buku--;

  jumlahKeranjang++;

  document.getElementById("keranjang").innerText =
    jumlahKeranjang;

  filterBuku();
}

// Pertama kali tampil
renderBuku(bukuData);
document.querySelectorAll(".genre-btn").forEach((btn) => {
  btn.addEventListener("click", () => {

    genreAktif = btn.dataset.genre;

    // Hapus warna aktif dari semua tombol
    document.querySelectorAll(".genre-btn").forEach((b) => {
      b.classList.remove("bg-yellow-400", "text-black");
      b.classList.add("bg-amber-700", "text-white");
    });

    // Tambahkan warna ke tombol yang dipilih
    btn.classList.remove("bg-amber-700", "text-white");
    btn.classList.add("bg-yellow-400", "text-black");

    filterBuku();
  });
});