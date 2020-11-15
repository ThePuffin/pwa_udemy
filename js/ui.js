document.addEventListener('DOMContentLoaded', function() {
  var fab = document.querySelectorAll('.fixed-action-btn');
    var sidenav = document.querySelectorAll('.sidenav');
        var modals = document.querySelectorAll('.modal');

     M.Sidenav.init(sidenav);
    M.Modal.init(modals)
   M.FloatingActionButton.init(fab);
  });

 
