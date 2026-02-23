let currentView = 'all';

function refreshUI() {
    const cards = document.querySelectorAll('.job-card');
    const emptyMsg = document.getElementById('no-jobs-msg');
    
    let total = cards.length;
    let intCount = 0;
    let rejCount = 0;
    let tabVisible = 0;

    cards.forEach(card => {
        const status = card.getAttribute('data-status');
        const badge = card.querySelector('.status-badge');

        if (status === 'interview') {
            intCount++;
            badge.innerText = "Interviewing";
        } else if (status === 'rejected') {
            rejCount++;
            badge.innerText = "Rejected";
        } else {
            badge.innerText = "";
        }

        if (currentView === 'all' || status === currentView) {
            card.classList.remove('hidden');
            tabVisible++;
        } else {
            card.classList.add('hidden');
        }
    });

    document.getElementById('total-count').innerText = total;
    document.getElementById('interview-count').innerText = intCount;
    document.getElementById('rejected-count').innerText = rejCount;
    document.getElementById('tab-job-count').innerText = `${tabVisible} jobs`;

    if (tabVisible === 0) emptyMsg.classList.remove('hidden');
    else emptyMsg.classList.add('hidden');
}

function switchTab(tab) {
    currentView = tab;
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.toggle('active', btn.id === `tab-${tab}`);
    });
    refreshUI();
}

function changeStatus(element, status) {
    const card = element.closest('.job-card');
    card.setAttribute('data-status', status);
    refreshUI();
}

function removeCard(element) {
    const card = element.closest('.job-card');
    card.remove();
    refreshUI();
}

refreshUI();