document.addEventListener('DOMContentLoaded', function () {
  const tabList = document.getElementById('tab-list');
  const searchInput = document.getElementById('search-input');
  let cachedTabs = [];

  function loadTabs() {
    chrome.tabs.query({}, function (tabs) {
      cachedTabs = tabs.map((tab) => ({
        id: tab.id,
        title: tab.title,
        url: tab.url,
        showTitle: truncateText(tab.title),
        showUrl: truncateText(tab.url),
      }));
      renderTabs(cachedTabs);
    });
  }

  function filterTabs(query) {
    const filteredTabs = cachedTabs.filter((tab) => tab.title.toLowerCase().includes(query.toLowerCase()) || tab.url.toLowerCase().includes(query.toLowerCase()));
    renderTabs(filteredTabs);
  }

  function renderTabs(tabs) {
    tabList.innerHTML = '';
    tabs.forEach(function (tab) {
      const li = document.createElement('li');
      li.className = 'tab-item';

      const title = document.createElement('div');
      title.className = 'tab-item-title';
      title.textContent = tab.showTitle;

      const url = document.createElement('div');
      url.className = 'tab-item-url';
      url.textContent = tab.showUrl;

      li.appendChild(title);
      li.appendChild(url);

      li.addEventListener('click', function () {
        chrome.tabs.update(tab.id, { active: true });
        window.close();
      });

      tabList.appendChild(li);
    });
  }

  function truncateText(text, maxLength = 66) {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + '...';
    }
    return text;
  }

  searchInput.addEventListener('input', function (event) {
    const query = event.target.value.trim();
    if (query) {
      filterTabs(query);
    } else {
      renderTabs(cachedTabs);
    }
  });

  // 初始加载所有标签页
  loadTabs();
});
