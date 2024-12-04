document.addEventListener('DOMContentLoaded', function () {
  const tabList = document.getElementById('tab-list');
  const searchInput = document.getElementById('search-input');

  function loadTabs() {
    chrome.tabs.query({}, function (tabs) {
      tabList.innerHTML = '';

      tabs.forEach(function (tab) {
        const li = document.createElement('li');
        li.className = 'tab-item';
        li.textContent = `${tab.title} - ${tab.url}`;
        li.addEventListener('click', function () {
          chrome.tabs.update(tab.id, { active: true });
          window.close();
        });

        tabList.appendChild(li);
      });
    });
  }

  function filterTabs(query) {
    chrome.tabs.query({}, function (tabs) {
      tabList.innerHTML = '';

      tabs.forEach(function (tab) {
        if (tab.title.toLowerCase().includes(query.toLowerCase()) || tab.url.toLowerCase().includes(query.toLowerCase())) {
          const li = document.createElement('li');
          li.className = 'tab-item';
          li.textContent = `${tab.title} - ${tab.url}`;
          li.addEventListener('click', function () {
            chrome.tabs.update(tab.id, { active: true });
            window.close();
          });

          tabList.appendChild(li);
        }
      });
    });
  }

  searchInput.addEventListener('input', function (event) {
    const query = event.target.value.trim();
    if (query) {
      filterTabs(query);
    } else {
      loadTabs();
    }
  });

  // 初始加载所有标签页
  loadTabs();
});
