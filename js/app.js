// Football Stats Hub - Main Application

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initStandings('premier');
    initPlayers('goals');
    initMatches('all');
    initNewsletterForm();
    animateNumbers();
});

// Navigation functionality
function initNavigation() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');

    mobileMenuBtn?.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileMenuBtn?.classList.remove('active');
            
            // Update active state
            navItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
        });
    });

    // Update active nav on scroll
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollPos >= top && scrollPos < top + height) {
                navItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('href') === `#${id}`) {
                        item.classList.add('active');
                    }
                });
            }
        });
    });
}

// Standings Table
function initStandings(league) {
    const leagueBtns = document.querySelectorAll('.league-btn');
    const standingsBody = document.getElementById('standingsBody');

    // Set up league button listeners
    leagueBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            leagueBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderStandings(btn.dataset.league);
        });
    });

    renderStandings(league);
}

function renderStandings(league) {
    const standingsBody = document.getElementById('standingsBody');
    const data = leagueData[league];
    
    if (!data) return;

    standingsBody.innerHTML = data.teams.map(team => {
        const posClass = getPositionClass(team.pos);
        const gd = team.gf - team.ga;
        const gdDisplay = gd > 0 ? `+${gd}` : gd;

        return `
            <tr>
                <td><span class="position ${posClass}">${team.pos}</span></td>
                <td>
                    <div class="team-cell">
                        <span class="team-logo">${team.logo}</span>
                        <span class="team-name">${team.name}</span>
                    </div>
                </td>
                <td>${team.p}</td>
                <td>${team.w}</td>
                <td>${team.d}</td>
                <td>${team.l}</td>
                <td>${team.gf}</td>
                <td>${team.ga}</td>
                <td>${gdDisplay}</td>
                <td class="points">${team.pts}</td>
                <td>
                    <div class="form-cell">
                        ${team.form.map(f => `<span class="form-result ${f}">${f}</span>`).join('')}
                    </div>
                </td>
            </tr>
        `;
    }).join('');
}

function getPositionClass(pos) {
    if (pos === 1) return 'champions';
    if (pos <= 4) return 'ucl';
    if (pos === 5) return 'uel';
    if (pos >= 18) return 'relegation';
    return '';
}

// Players Grid
function initPlayers(stat) {
    const filterBtns = document.querySelectorAll('.stat-filter .filter-btn');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderPlayers(btn.dataset.stat);
        });
    });

    renderPlayers(stat);
}

function renderPlayers(stat) {
    const playersGrid = document.getElementById('playersGrid');
    const players = playersData[stat];

    if (!players) return;

    playersGrid.innerHTML = players.map((player, index) => {
        const rankClass = index === 0 ? 'gold' : index === 1 ? 'silver' : index === 2 ? 'bronze' : '';
        
        return `
            <div class="player-card">
                <span class="player-rank ${rankClass}">${player.rank}</span>
                <div class="player-avatar">${player.avatar}</div>
                <div class="player-info">
                    <h3>${player.name}</h3>
                    <p class="player-team">${player.team}</p>
                </div>
                <div class="player-stats">
                    <div class="player-stat">
                        <span class="player-stat-value">${player.goals}</span>
                        <span class="player-stat-label">Goals</span>
                    </div>
                    <div class="player-stat">
                        <span class="player-stat-value">${player.assists}</span>
                        <span class="player-stat-label">Assists</span>
                    </div>
                    <div class="player-stat">
                        <span class="player-stat-value">${player.rating}</span>
                        <span class="player-stat-label">Rating</span>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// Matches List
function initMatches(filter) {
    const filterBtns = document.querySelectorAll('.match-filter .filter-btn');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderMatches(btn.dataset.filter);
        });
    });

    renderMatches(filter);
}

function renderMatches(filter) {
    const matchesList = document.getElementById('matchesList');
    let matches = matchesData;

    if (filter !== 'all') {
        matches = matchesData.filter(m => m.status === filter);
    }

    if (matches.length === 0) {
        matchesList.innerHTML = '<p style="text-align: center; color: var(--text-muted); padding: 40px;">No matches found for this filter.</p>';
        return;
    }

    matchesList.innerHTML = matches.map(match => {
        const homeScore = match.home.score !== null ? match.home.score : '-';
        const awayScore = match.away.score !== null ? match.away.score : '-';
        const statusClass = match.status;

        return `
            <div class="match-card ${statusClass}">
                <div class="match-team">
                    <span class="match-team-logo">${match.home.logo}</span>
                    <span class="match-team-name">${match.home.name}</span>
                </div>
                <div class="match-center">
                    <div class="match-score">
                        ${homeScore}<span>-</span>${awayScore}
                    </div>
                    <div class="match-status ${statusClass}">
                        ${match.status === 'live' ? match.time : match.status === 'finished' ? 'FT' : match.time}
                    </div>
                    <div class="match-time">${match.date}</div>
                </div>
                <div class="match-team away">
                    <span class="match-team-logo">${match.away.logo}</span>
                    <span class="match-team-name">${match.away.name}</span>
                </div>
            </div>
        `;
    }).join('');
}

// Newsletter Form
function initNewsletterForm() {
    const form = document.getElementById('newsletterForm');
    
    form?.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = form.querySelector('input[type="email"]').value;
        
        // Show success message
        const btn = form.querySelector('button');
        const originalText = btn.textContent;
        btn.textContent = 'Subscribed!';
        btn.style.background = 'var(--secondary)';
        
        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = '';
            form.reset();
        }, 2000);
    });
}

// Animate numbers on page load
function animateNumbers() {
    const numbers = document.querySelectorAll('.stat-number, .stat-box-number');
    
    numbers.forEach(num => {
        const target = num.textContent;
        const isDecimal = target.includes('.');
        const hasK = target.includes('K');
        const numericTarget = parseFloat(target.replace(/[^0-9.]/g, ''));
        
        if (isNaN(numericTarget)) return;
        
        let current = 0;
        const increment = numericTarget / 50;
        const duration = 1000;
        const stepTime = duration / 50;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= numericTarget) {
                current = numericTarget;
                clearInterval(timer);
            }
            
            let display = Math.floor(current);
            if (isDecimal) {
                display = current.toFixed(1);
            }
            if (hasK) {
                display = current.toFixed(1) + 'K';
            }
            if (target.includes(',')) {
                display = Math.floor(current).toLocaleString();
            }
            
            num.textContent = display;
        }, stepTime);
    });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add scroll effect to navbar
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(15, 20, 25, 0.98)';
    } else {
        navbar.style.background = 'rgba(15, 20, 25, 0.9)';
    }
});

// Initialize intersection observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Make first section visible immediately
document.querySelector('.section')?.setAttribute('style', 'opacity: 1; transform: translateY(0);');
