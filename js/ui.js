  document.addEventListener('DOMContentLoaded', function() {
    var sidenav = document.querySelectorAll('.sidenav');
        var modals = document.querySelectorAll('.modal');

    var instances = M.Sidenav.init(sidenav);
    M.Modal.init(modals)
  });

 