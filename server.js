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

// Handle GET request for polling
let counter = 0;
app.get("/poll", (req, res) => {
    counter++;
    const data = { counter };
    res.json(data);
});


// Handle POST request for seearching contact
const contacts = [
    { id: 1, name: "John Doe", email: "j.doe@yes.com" },
    { id: 2, name: "Jane Doe", email: "janedoe@maybe.com" },
    { id: 3, name: "Jim Doe", email: "badluck-help@gmail.com" },
    { id: 4, name: "Bob Offshtatter", email: "bob-the-real@yahoo.net" },
    { id: 5, name: "Eminem", email: "em1nem@fck.you" },
    { id: 6, name: "Batman", email: "girly-braces@pinkyalfred.batcave" }
];
app.post("/search", (req, res) => {
    const searchTerm = req.body.search.toLowerCase();
    if (!searchTerm) {
        res.send("<tr class=\" my-2 py-2 text-center\"><td class=\"text-red-700\">Empty search terms!</td></tr>");
        return;
    }
    const searchResult = contacts.filter(contact => {
        const name = contact.name.toLowerCase();
        const email = contact.email.toLowerCase();

        return name.includes(searchTerm) || email.includes(searchTerm);
    })
    setTimeout(() => {
        const searchResultHTML = searchResult.map(contact => `
            <tr>
                <td class=\"text-blue-700 my-2 py-2 text-center\">${contact.name}</td>
                <td class=\"my-2 py-2\">${contact.email}</td>
            </tr>
        `).join('');
        if (!searchResultHTML) {
            res.send("<tr class=\"my-2 py-2 text-center\"><td class=\"text-red-700\">No result found!</td></tr>");
            return;
        }
        res.send(searchResultHTML);
    }, 1000);
});

// Handle POST request for adding contact from jsonPlaceholder

// Handle POST request for seearching contact
app.post("/search/api", async (req, res) => {
    const searchTerm = req.body.search.toLowerCase();
    if (!searchTerm) {
        res.send("<tr class=\" my-2 py-2 text-center\"><td class=\"text-red-700\">Empty search terms!</td></tr>");
        return;
    }

    const response = await fetch(`https://jsonplaceholder.typicode.com/users`);
    const contacts = await response.json();

    const searchResult = contacts.filter(contact => {
        const name = contact.name.toLowerCase();
        const email = contact.email.toLowerCase();

        return name.includes(searchTerm) || email.includes(searchTerm);
    })
    setTimeout(() => {
        const searchResultHTML = searchResult.map(contact => `
            <tr>
                <td class=\"text-blue-700 my-2 py-2 text-center\">${contact.name}</td>
                <td class=\"my-2 py-2\">${contact.email}</td>
            </tr>
        `).join('');
        if (!searchResultHTML) {
            res.send("<tr class=\"my-2 py-2 text-center\"><td class=\"text-red-700\">No result found!</td></tr>");
            return;
        }
        res.send(searchResultHTML);
    }, 1000);
});