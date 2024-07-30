document.getElementById('client-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const project = document.getElementById('project').value;
    const notes = document.getElementById('notes').value;

    const client = {
        id: Date.now(),
        name,
        email,
        project,
        notes
    };

    addClientToList(client);
    saveClient(client);
    this.reset();
});

function addClientToList(client) {
    const clientList = document.getElementById('clients');
    const li = document.createElement('li');

    li.innerHTML = `
        <strong>${client.name}</strong> (${client.email}) - ${client.project}
        <button onclick="removeClient(${client.id})">Delete</button>
    `;

    clientList.appendChild(li);
}

function saveClient(client) {
    let clients = JSON.parse(localStorage.getItem('clients')) || [];
    clients.push(client);
    localStorage.setItem('clients', JSON.stringify(clients));
}

function loadClients() {
    const clients = JSON.parse(localStorage.getItem('clients')) || [];
    clients.forEach(client => addClientToList(client));
}

function removeClient(id) {
    let clients = JSON.parse(localStorage.getItem('clients')) || [];
    clients = clients.filter(client => client.id !== id);
    localStorage.setItem('clients', JSON.stringify(clients));
    document.getElementById('clients').innerHTML = '';
    loadClients();
}

document.addEventListener('DOMContentLoaded', loadClients);

// Power BI Embed
const embedConfig = {
    type: 'report',   // Supported types: report, dashboard, tile, visual and qna
    id: 'your-report-id',
    embedUrl: 'your-embed-url',
    accessToken: 'your-access-token',
    tokenType: powerbi.models.TokenType.Aad,   // Power BI REST API tokens: Aad and Embed
    settings: {
        filterPaneEnabled: false,
        navContentPaneEnabled: false
    }
};

const embedContainer = document.getElementById('embedContainer');
const report = powerbi.embed(embedContainer, embedConfig);
