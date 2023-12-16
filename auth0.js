auth0
  .createAuth0Client({
    domain: "dev-1p7jaayquv14r2uy.us.auth0.com",
    clientId: "keL5OV95NbjsmWmnnr52pNtVl5QekMcq",
    authorizationParams: {
      redirect_uri: window.location.origin,
    },
  })
  .then(async (auth0Client) => {
    // Assumes a button with id "login" in the DOM
    // const loginButton = document.getElementById("login");
    const loginButton = document.querySelector(".login");
    console.log("hihosdvn");
    loginButton.addEventListener("click", (e) => {
      e.preventDefault();
      auth0Client.loginWithRedirect();
    });

    if (
      location.search.includes("state=") &&
      (location.search.includes("code=") || location.search.includes("error="))
    ) {
      await auth0Client.handleRedirectCallback();
      window.history.replaceState({}, document.title, "/");
    }

    // Assumes a button with id "logout" in the DOM
    const logoutButton = document.getElementById("logout");

    logoutButton.addEventListener("click", (e) => {
      e.preventDefault();
      auth0Client.logout();
    });

    const isAuthenticated = await auth0Client.isAuthenticated();
    const userProfile = await auth0Client.getUser();

    // Assumes an element with id "profile" in the DOM
    const profileElement = document.getElementById("profile");
    console.log(isAuthenticated);
    if (isAuthenticated) {
      profileElement.style.display = "block";
      profileElement.innerHTML = `
            <p>${userProfile.name}</p>
            <img src="${userProfile.picture}" />
          `;
    } else {
      profileElement.style.display = "none";
    }
  })
  .catch((error) => console.error(error))
  .finally(() => console.error("Hello1"));
