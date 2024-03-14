import express from "express";

const app = express();

// set static folder
app.use(express.static("public"));
// parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));
// parse JSON bodies (as sent by API clients)
app.use(express.json());

// Start server
app.listen(3000, () => {
    console.log("Server started on http://localhost:3000");
});

// Handle Get Request to fetch user 
app.get("/users", async (req, res) => {
    setTimeout(async () => {
        const limit = +req.query.limit || 10;

        const response = await fetch(`https://jsonplaceholder.typicode.com/users?_limit=${limit}`);
        const user = await response.json();

        res.send(`
        <h1 class="font-bold text-2xl">Users</h1>
        <hr>
        <ul>
            ${user.map(user => `<li>${user.name}</li>`).join('')}
        </ul>
    `)
    }, 2000);
});

// Handle Post Request to convert temperature from fahrenheit to celsius
app.post("/convert", (req, res) => {
    setTimeout(() => {
        const fahrenheit = parseFloat(req.body.fahrenheit);
        const celsius = (fahrenheit - 32) * 5 / 9;
        res.send(`
            <p>
                Temperature in Fahrenheit ${fahrenheit} </br> Temperature in Celsius ${celsius}
            </p>
        `);
    }, 2000);
});

// Handle GET Request for polling
let counter = 0;
app.get("/poll", (req, res) => {
    counter++;
    const data = { counter };
    res.json(data);
});
