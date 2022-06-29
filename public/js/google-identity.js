function handleCredentialResponse(response) {
  // decodeJwtResponse() is a custom function defined by you
  // to decode the credential response.
  // console.log(response.credential);

  const body = { id_token: response.credential };

  fetch("http://localhost:8087/api/auth/google", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((resp) => resp.json())
    .then((resp) => {
      console.log(resp);
      localStorage.setItem("correoUsuario", resp.user.email);
    })
    .catch(console.warn());
}

const singOut = document.getElementById("sing-out");
singOut.onclick = () => {
  let correoGuardado = localStorage.getItem("correoUsuario");
  console.log(correoGuardado)
  if (correoGuardado) {
    google.accounts.id.disableAutoSelect();
    google.accounts.id.revoke(correoGuardado, (done) => {
    localStorage.removeItem("correoUsuario");

      location.reload();
    });
  }
};
