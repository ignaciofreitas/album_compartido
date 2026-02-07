const input = document.getElementById("photoInput");
const button = document.getElementById("uploadBtn");
const status = document.getElementById("status");

const CLOUD_NAME = "dlsmnitm2";
const UPLOAD_PRESET = "Boda-Sheila-Nacho";

button.addEventListener("click", async () => {
  const file = input.files[0];

  if (!file) {
    status.textContent = "Por favor seleccioná una foto 📷";
    return;
  }

  status.textContent = "Subiendo recuerdo… 💕";

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

    const data = await res.json();

    status.textContent = "¡Gracias por compartir este momento! ✨";
    input.value = "";

  } catch (err) {
    status.textContent = "Ups… algo salió mal 😕";
  }
});
