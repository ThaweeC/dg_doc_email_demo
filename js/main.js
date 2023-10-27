const contentIframe = document.querySelector('#content-iframe');

function calContentHeight() {
    var menu =document.querySelector('#index-container');

    // Reset all DOM height to 0
    contentIframe.style.height = '0px';
    menu.style.height = '0px';

    // Set DOM height
    var navBar = document.querySelector('#navbar');
    var mainContentHeight = (document.body.clientHeight - navBar.clientHeight - 10);
    contentIframe.style.height = mainContentHeight + 'px';
    menu.style.height = mainContentHeight + 'px';
}

function handleIframeLoaded() {
    if ((new URL(window.location)).origin.substr(0,4) === 'http') { // Check page loaded from Http Server or not
        const iFrameDocument = contentIframe.contentWindow.document;

        // Remove all Table of Content links (ToC)
        iFrameDocument.querySelectorAll('p').forEach((d) => {
            if (d.classList.contains('MsoToc1')) {
                d.remove();
            } else if (d.classList.contains('MsoToc2')) {
                d.remove();
            } else if (d.classList.contains('MsoToc3')) {
                d.remove();
            } else if (d.classList.contains('MsoToc4')) {
                d.remove();
            }
        });

        // Make all external links to new window
        const hostOriginUrl = (new URL(window.location)).origin;
        iFrameDocument.querySelectorAll('a').forEach((d) => {
            if (d.href) {
                if ((new URL(d.href)).origin != hostOriginUrl) {
                    d.target = "_blank";
                }
            }
        });
    }

    // Calculate container hight
    calContentHeight();
    window.addEventListener('resize', calContentHeight);
}

window.addEventListener('DOMContentLoaded', event => {

    // Toggle the side navigation
    const sidebarToggle = document.body.querySelector('#sidebarToggle');
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', event => {
            event.preventDefault();
            document.body.classList.toggle('sb-sidenav-toggled');
            localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
        });
    }

    // Add menu link onclick handler
    const menuLinks = document.querySelectorAll('a.item1,a.item2,a.item3');
    menuLinks.forEach((link) => {
        link.onclick = function() {
            // Auto hide menu on small screen
            if (document.body.clientWidth <= 768) {
                document.body.classList.toggle('sb-sidenav-toggled');
                localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
            }

            // Force to stay on top
            document.body.scrollTop = 0; // For Safari
            document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
        }
    });

    contentIframe.addEventListener('load', handleIframeLoaded, true);
});

