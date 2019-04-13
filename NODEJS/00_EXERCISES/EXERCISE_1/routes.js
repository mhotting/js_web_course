// Will manage our request for the basic web app

const fs = require('fs');
const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;

    if (url === '/') {
        res.setHeader('Content-type', 'text/html');
        res.write(
            '<html><head><title>EXERCICE</title></head>' +
            '<body>' +
            '<h1>Welcome to the exercice page!</h1>' +
            '<p><a href="/users">Lien vers une liste d\'utilisateurs</a></p>' +
            '<p>Write a user here:</p>' +
            '<form action="/create-user" method="POST">' +
            '<input type="text" name=username>' +
            '<button type="submit">OK</button>' +
            '</form>' +
            '</body>'
        );
        return (res.end());
    }
    else if (url === '/users') {
        res.setHeader('Content-type', 'text/html');
        res.write(
            '<html><head><title>EXERCICE</title></head>' +
            '<body>' +
            '<h2>Liste des personnes de la maison:</h2>' +
            '<ul><li>Madi</li><li>Justi</li><li>Scapin</li><li>Captain</li></ul>' +
            '<p><a href="/">Retour vers l\'accueil</a></p>' +
            '</body>'
        );
        return (res.end());
    }
    else if (url === '/create-user' && method === 'POST') {
        const body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
        });
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const username = parsedBody.split('=')[1];
            console.log('Username: ' + username);
            fs.writeFile('user.txt', username, (err) => {
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return(res.end());
            });
        });
    }
    res.setHeader('Content-type', 'text/html');
    res.write(
        '<html><head><title>EXERCICE</title></head>' +
        '<body>' +
        '<p><a href="/">ERREUR: Retour vers l\'accueil</a></p>' +
        '</body>'
    );
    res.end();
};

module.exports = {
    handler: requestHandler
};