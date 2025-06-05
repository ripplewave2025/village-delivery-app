const API_URL = 'http://localhost:3000/vendors';

async function loadVendors() {
    const res = await fetch(API_URL);
    const vendors = await res.json();
    const list = document.getElementById('vendorList');
    list.innerHTML = '';
    vendors.forEach(v => {
        const li = document.createElement('li');
        li.textContent = `${v.name} - ${v.location}`;
        list.appendChild(li);
    });
}

document.getElementById('vendorForm').addEventListener('submit', async e => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const location = document.getElementById('location').value.trim();
    if (!name || !location) return;

    await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, location })
    });

    document.getElementById('vendorForm').reset();
    loadVendors();
});

window.addEventListener('DOMContentLoaded', loadVendors);
