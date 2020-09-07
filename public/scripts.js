window.addEventListener('load', start);

function start() {
  $(document).ready(function () {
    $('ul.tabs').tabs({
      swipeable: true,
      responsiveThreshold: 1920,
    });
  });
}
