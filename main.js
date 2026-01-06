import { createIcons, ShieldCheck, Menu, X, ArrowRight, Code2, Download, Mail, Phone, Share2, Github, Twitter, Linkedin, Lock, ShieldAlert, Trash2, Plus, Edit, LayoutGrid, Newspaper, DownloadCloud, LogOut } from 'lucide';

// INITIAL DATA (Fallback if localStorage is empty)
const DEFAULT_DATA = {
    projects: [
        { id: 1, title: 'CYBER-SEC ENGINE', desc: 'Enterprise-grade vulnerability scanner.', tech: 'Go, Rust', link: '#', image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800' },
        { id: 2, title: 'QUANTUM DASH',  desc: 'Real-time data visualization platform.', tech: 'React, Three.js', link: '#', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800' },
        { id: 3, title: 'VOID MESSENGER', desc: 'End-to-end encrypted chat protocol.', tech: 'Node.js, WebRTC', link: '#', image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800' }
    ],
    news: [
        { id: 1, title: 'The Rise of AI in Cybersecurity', date: '2024-05-20', content: 'AI is fundamentally changing how we approach threat detection...', author: 'RED SAMURAI' },
        { id: 2, title: 'Web3.0 and the Future of Web Dev', date: '2024-05-18', content: 'Decentralized technologies are no longer just a buzzword...', author: 'RED SAMURAI' }
    ],
    resources: [
        { id: 1, title: 'Cyber Samurai Boilerplate', type: 'GitHub', link: 'https://github.com' },
        { id: 2, title: 'Red Accent UI Kit', type: 'ZIP', link: '#' }
    ],
    downloads: [
        { id: 1, title: 'Samurai Mobile App v1.2', desc: 'Official portfolio companion.', type: 'APK', link: '#' },
        { id: 2, title: 'Desktop Dashboard', desc: 'System monitoring tool.', type: 'EXE', link: '#' }
    ]
};

// STATE MANAGEMENT
class Store {
    constructor() {
        this.data = JSON.parse(localStorage.getItem('red_samurai_data')) || DEFAULT_DATA;
    }

    save() {
        localStorage.setItem('red_samurai_data', JSON.stringify(this.data));
        renderAll();
    }

    addItem(collection, item) {
        item.id = Date.now();
        this.data[collection].unshift(item);
        this.save();
    }

    deleteItem(collection, id) {
        this.data[collection] = this.data[collection].filter(i => i.id !== id);
        this.save();
    }
}

const store = new Store();

// UI RENDERING
function renderAll() {
    renderProjects();
    renderNews();
    renderResources();
    renderDownloads();
    createIcons({
        icons: { ShieldCheck, Menu, X, ArrowRight, Code2, Download, Mail, Phone, Share2, Github, Twitter, Linkedin, Lock, ShieldAlert, Trash2, Plus, Edit, LayoutGrid, Newspaper, DownloadCloud, LogOut }
    });
}

function renderProjects() {
    const grid = document.getElementById('projects-grid');
    grid.innerHTML = store.data.projects.map(p => `
        <div class="group relative overflow-hidden glass-card rounded-lg transition-all hover:-translate-y-2">
            <div class="aspect-video overflow-hidden">
                <img src="${p.image}" alt="${p.title}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
            </div>
            <div class="p-6">
                <span class="text-xs font-bold text-red-500 uppercase tracking-widest">${p.tech}</span>
                <h3 class="text-2xl font-rajdhani font-bold my-2">${p.title}</h3>
                <p class="text-zinc-500 mb-6 line-clamp-2">${p.desc}</p>
                <a href="${p.link}" class="inline-flex items-center gap-2 text-white font-bold group-hover:text-red-500 transition-colors">
                    EXPLORE MISSION <i data-lucide="arrow-right" class="w-4 h-4"></i>
                </a>
            </div>
        </div>
    `).join('');
}

function renderNews() {
    const grid = document.getElementById('news-grid');
    grid.innerHTML = store.data.news.map(n => `
        <article class="p-8 bg-zinc-900/50 border border-zinc-800 rounded-lg hover:border-red-600/50 transition-colors group">
            <div class="flex items-center gap-4 text-xs font-bold text-zinc-500 mb-4">
                <span class="text-red-500">${n.date}</span>
                <span class="w-1 h-1 bg-zinc-800 rounded-full"></span>
                <span>${n.author}</span>
            </div>
            <h3 class="text-2xl font-rajdhani font-bold mb-4 group-hover:text-red-500 transition-colors">${n.title}</h3>
            <p class="text-zinc-400 mb-6 line-clamp-3 leading-relaxed">${n.content}</p>
            <button class="text-white font-bold tracking-widest text-sm flex items-center gap-2">READ FULL STORY <i data-lucide="arrow-right" class="w-4 h-4"></i></button>
        </article>
    `).join('');
}

function renderResources() {
    const list = document.getElementById('resources-list');
    list.innerHTML = store.data.resources.map(r => `
        <div class="p-4 bg-zinc-900 border border-zinc-800 rounded flex items-center justify-between group hover:border-zinc-600 transition-colors">
            <div class="flex items-center gap-4">
                <div class="p-2 bg-red-600/10 text-red-500 rounded">
                    <i data-lucide="code-2" class="w-5 h-5"></i>
                </div>
                <div>
                    <h5 class="font-bold text-white">${r.title}</h5>
                    <span class="text-xs text-zinc-500 font-bold">${r.type}</span>
                </div>
            </div>
            <a href="${r.link}" target="_blank" class="p-2 hover:bg-zinc-800 rounded text-zinc-400 hover:text-white transition-colors">
                <i data-lucide="github"></i>
            </a>
        </div>
    `).join('');
}

function renderDownloads() {
    const list = document.getElementById('downloads-list');
    list.innerHTML = store.data.downloads.map(d => `
        <div class="p-4 bg-zinc-900 border border-zinc-800 rounded flex items-center justify-between group hover:border-zinc-600 transition-colors">
            <div class="flex items-center gap-4">
                <div class="p-2 bg-red-600/10 text-red-500 rounded">
                    <i data-lucide="download" class="w-5 h-5"></i>
                </div>
                <div>
                    <h5 class="font-bold text-white">${d.title}</h5>
                    <p class="text-xs text-zinc-500">${d.desc}</p>
                </div>
            </div>
            <a href="${d.link}" class="px-4 py-2 bg-red-600/10 text-red-500 hover:bg-red-600 hover:text-white font-bold text-xs rounded transition-all">
                DOWNLOAD
            </a>
        </div>
    `).join('');
}

// ADMIN PANEL LOGIC
const adminTrigger = document.getElementById('admin-trigger');
const adminModal = document.getElementById('admin-modal');
const closeAdmin = document.getElementById('close-admin');
const adminAuth = document.getElementById('admin-auth');
const adminContent = document.getElementById('admin-content');
const verifyBtn = document.getElementById('verify-admin');
const adminPass = document.getElementById('admin-password');
const adminTabs = document.querySelectorAll('.admin-tab');
const adminTabContent = document.getElementById('admin-tab-content');
const adminLogoutBtn = document.getElementById('admin-logout');

let currentAdminTab = 'projects';
let isAuthenticated = sessionStorage.getItem('red_samurai_auth') === 'true';

adminTrigger.onclick = () => {
    adminModal.classList.remove('hidden');
    if (isAuthenticated) {
        showAdminContent();
    } else {
        showAdminLogin();
    }
};

closeAdmin.onclick = () => {
    adminModal.classList.add('hidden');
    adminPass.value = '';
};

adminLogoutBtn.onclick = () => {
    isAuthenticated = false;
    sessionStorage.removeItem('red_samurai_auth');
    showAdminLogin();
};

function showAdminLogin() {
    adminAuth.classList.remove('hidden');
    adminContent.classList.add('hidden');
}

function showAdminContent() {
    adminAuth.classList.add('hidden');
    adminContent.classList.remove('hidden');
    renderAdminTab();
}

verifyBtn.onclick = () => {
    if (adminPass.value === 'SAMURAI2024') {
        isAuthenticated = true;
        sessionStorage.setItem('red_samurai_auth', 'true');
        showAdminContent();
    } else {
        adminPass.classList.add('border-red-600', 'animate-shake');
        setTimeout(() => adminPass.classList.remove('border-red-600', 'animate-shake'), 500);
    }
};

adminTabs.forEach(tab => {
    tab.onclick = () => {
        adminTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        currentAdminTab = tab.dataset.tab;
        renderAdminTab();
    };
});

function renderAdminTab() {
    let html = '';
    const items = store.data[currentAdminTab];

    if (currentAdminTab === 'projects') {
        html = `
            <div class="mb-8 p-4 bg-zinc-950 border border-zinc-800 rounded-lg">
                <h4 class="font-bold mb-4">ADD NEW PROJECT</h4>
                <div class="grid grid-cols-2 gap-4">
                    <input id="p-title" type="text" placeholder="Title" class="bg-zinc-900 p-2 rounded">
                    <input id="p-tech" type="text" placeholder="Tech (e.g. React, Node)" class="bg-zinc-900 p-2 rounded">
                    <input id="p-img" type="text" placeholder="Image URL" class="bg-zinc-900 p-2 rounded">
                    <input id="p-link" type="text" placeholder="Demo Link" class="bg-zinc-900 p-2 rounded">
                    <textarea id="p-desc" placeholder="Description" class="bg-zinc-900 p-2 rounded col-span-2"></textarea>
                </div>
                <button onclick="window.addProject()" class="mt-4 bg-red-600 px-6 py-2 font-bold flex items-center gap-2"><i data-lucide="plus"></i> ADD PROJECT</button>
            </div>
            <div class="space-y-4">
                ${items.map(item => `
                    <div class="flex items-center justify-between p-4 bg-zinc-800/50 rounded">
                        <span>${item.title}</span>
                        <button onclick="window.deleteItem('projects', ${item.id})" class="text-red-500 hover:text-red-400"><i data-lucide="trash-2"></i></button>
                    </div>
                `).join('')}
            </div>
        `;
    } else if (currentAdminTab === 'news') {
        html = `
            <div class="mb-8 p-4 bg-zinc-950 border border-zinc-800 rounded-lg">
                <h4 class="font-bold mb-4">PUBLISH TECH NEWS</h4>
                <div class="space-y-4">
                    <input id="n-title" type="text" placeholder="Article Title" class="w-full bg-zinc-900 p-2 rounded">
                    <textarea id="n-content" placeholder="Content" rows="5" class="w-full bg-zinc-900 p-2 rounded"></textarea>
                </div>
                <button onclick="window.addNews()" class="mt-4 bg-red-600 px-6 py-2 font-bold flex items-center gap-2"><i data-lucide="plus"></i> PUBLISH</button>
            </div>
            <div class="space-y-4">
                ${items.map(item => `
                    <div class="flex items-center justify-between p-4 bg-zinc-800/50 rounded">
                        <span>${item.title}</span>
                        <button onclick="window.deleteItem('news', ${item.id})" class="text-red-500 hover:text-red-400"><i data-lucide="trash-2"></i></button>
                    </div>
                `).join('')}
            </div>
        `;
    } else if (currentAdminTab === 'downloads') {
        html = `
            <div class="mb-8 p-4 bg-zinc-950 border border-zinc-800 rounded-lg">
                <h4 class="font-bold mb-4">UPLOAD RESOURCE/APK</h4>
                <div class="grid grid-cols-2 gap-4">
                    <input id="d-title" type="text" placeholder="Title" class="bg-zinc-900 p-2 rounded">
                    <input id="d-type" type="text" placeholder="Type (APK, ZIP, etc.)" class="bg-zinc-900 p-2 rounded">
                    <input id="d-link" type="text" placeholder="Download Link" class="bg-zinc-900 p-2 rounded col-span-2">
                    <input id="d-desc" type="text" placeholder="Short Description" class="bg-zinc-900 p-2 rounded col-span-2">
                </div>
                <button onclick="window.addDownload()" class="mt-4 bg-red-600 px-6 py-2 font-bold flex items-center gap-2"><i data-lucide="plus"></i> UPLOAD</button>
            </div>
            <div class="space-y-4">
                ${items.map(item => `
                    <div class="flex items-center justify-between p-4 bg-zinc-800/50 rounded">
                        <span>${item.title}</span>
                        <button onclick="window.deleteItem('downloads', ${item.id})" class="text-red-500 hover:text-red-400"><i data-lucide="trash-2"></i></button>
                    </div>
                `).join('')}
            </div>
        `;
    }

    adminTabContent.innerHTML = html;
    createIcons({
        icons: { Plus, Trash2 }
    });
}

// Global Admin Helpers
window.addProject = () => {
    const title = document.getElementById('p-title').value;
    const tech = document.getElementById('p-tech').value;
    const img = document.getElementById('p-img').value;
    const link = document.getElementById('p-link').value;
    const desc = document.getElementById('p-desc').value;
    if (!title || !desc) return alert('Fill title and description');
    store.addItem('projects', { title, tech, image: img || 'https://via.placeholder.com/800x450', link, desc });
    renderAdminTab();
};

window.addNews = () => {
    const title = document.getElementById('n-title').value;
    const content = document.getElementById('n-content').value;
    if (!title || !content) return alert('Fill title and content');
    store.addItem('news', { title, content, date: new Date().toISOString().split('T')[0], author: 'RED SAMURAI' });
    renderAdminTab();
};

window.addDownload = () => {
    const title = document.getElementById('d-title').value;
    const type = document.getElementById('d-type').value;
    const link = document.getElementById('d-link').value;
    const desc = document.getElementById('d-desc').value;
    if (!title || !link) return alert('Fill title and link');
    store.addItem('downloads', { title, type, link, desc });
    renderAdminTab();
};

window.deleteItem = (col, id) => {
    if (confirm('Are you sure?')) {
        store.deleteItem(col, id);
        renderAdminTab();
    }
};

// UI INTERACTIVITY
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const closeMenuBtn = document.getElementById('close-menu');
const mobileMenu = document.getElementById('mobile-menu');
const navbar = document.getElementById('navbar');

mobileMenuBtn.onclick = () => mobileMenu.classList.remove('translate-x-full');
closeMenuBtn.onclick = () => mobileMenu.classList.add('translate-x-full');
mobileMenu.querySelectorAll('a').forEach(a => a.onclick = () => mobileMenu.classList.add('translate-x-full'));

window.onscroll = () => {
    if (window.scrollY > 50) {
        navbar.classList.add('bg-zinc-950/90', 'backdrop-blur-lg', 'border-zinc-800', 'h-16');
        navbar.querySelector('div').classList.replace('h-20', 'h-16');
    } else {
        navbar.classList.remove('bg-zinc-950/90', 'backdrop-blur-lg', 'border-zinc-800', 'h-16');
        navbar.querySelector('div').classList.replace('h-16', 'h-20');
    }
};

// LOADING SYSTEM
function initLoader() {
    const loader = document.getElementById('loading-screen');
    const bar = document.getElementById('loading-bar');
    const percent = document.getElementById('loading-percent');
    let progress = 0;

    const interval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            setTimeout(() => {
                loader.classList.add('opacity-0', 'pointer-events-none');
                setTimeout(() => loader.remove(), 500);
            }, 500);
        }
        bar.style.width = `${progress}%`;
        percent.textContent = `${Math.floor(progress)}%`;
    }, 150);
}

// INITIALIZE
document.addEventListener('DOMContentLoaded', () => {
    initLoader();
    renderAll();
    
    // Sound FX
    document.addEventListener('click', (e) => {
        const target = e.target.closest('a, button');
        if (target) {
            const audio = new Audio('click.mp3');
            audio.volume = 0.2;
            audio.play().catch(() => {});
        }
    });
});

// Form Submission Simulation
document.getElementById('contact-form').onsubmit = (e) => {
    e.preventDefault();
    alert('MISSION RECEIVED. We will contact you shortly.');
    e.target.reset();
};