document.addEventListener('DOMContentLoaded', function () {
  chrome.tabs.query({}, function (tabs) {
    const tabList = document.getElementById('tab-list');

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
});
