const app = require("./app");

const PORT = process.env.PORT || 3000;
app.get("/", (req, res) => {
    res.redirect("/api-docs");
});


// app.listen() methdos starts the server, whcih listens for incomsing reuqest on teh specific port
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
