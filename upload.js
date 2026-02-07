const input = document.getElementById("photoInput");
const selectPhotoBtn = document.getElementById("selectPhotoBtn");

const previewContainer = document.getElementById("previewContainer");
const previewImage = document.getElementById("photoPreview");

const changePhotoBtn = document.getElementById("changePhotoBtn");
const uploadBtn = document.getElementById("uploadBtn");

const status = document.getElementById("status");
const loader = document.getElementById("loader");

const CLOUD_NAME = "dlsmnitm2";
const UPLOAD_PRESET = "Boda-Sheila-Nacho";

/* =========================
   ABRIR SELECTOR
========================= */
selectPhotoBtn.addEventListener("click", () => {
  input.click();
});

/* =========================
   MOSTRAR PREVIEW
========================= */
input.addEventListener("change", () => {
  const file = input.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    previewImage.src = reader.result;

    previewContainer.classList.remove("hidden");
    selectPhotoBtn.classList.add("hidden");

    status.textContent = "";
  };
  reader.readAsDataURL(file);
});

/* =========================
   ELEGIR OTRA FOTO
========================= */
changePhotoBtn.addEventListener("click", () => {
  input.value = "";
  previewImage.src = "";

  previewContainer.classList.add("hidden");
  selectPhotoBtn.classList.remove("hidden");

  status.textContent = "";

  input.click();
});

/* =========================
   SUBIR FOTO
========================= */
uploadBtn.addEventListener("click", async () => {
  const file = input.files[0];
  if (!file) return;

  uploadBtn.disabled = true;
  loader.classList.remove("hidden");
  status.textContent = "Guardando este recuerdo… 💕";

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);

  try {
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData
      }
    );

    await res.json();

    // Reset visual
    previewImage.src = "";
    previewContainer.classList.add("hidden");
    selectPhotoBtn.classList.remove("hidden");

    status.textContent = "Gracias por ser parte de nuestro día 💕";

  } catch (err) {
    status.textContent = "Ups… algo salió mal 😕";
  } finally {
    loader.classList.add("hidden");
    uploadBtn.disabled = false;
    input.value = "";
  }
});
