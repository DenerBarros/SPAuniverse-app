export class Router {
    routes = {};
  
    add(routeName, page, bgPath) {
      this.routes[routeName] = page;
      this.bg = bgPath;
    }
  
    route(event) {
      event = event || window.event;
      event.preventDefault();
  
      window.history.pushState({}, "", event.target.href);
  
      this.handle();
    }
  
    handle() {
      const { pathname } = window.location;
      const route = this.routes[pathname] || this.routes[404];
      this.changeBg();
  
      fetch(route)
        .then((data) => data.text())
        .then((html) => {
          document.querySelector("#app").innerHTML = html;
        });
  
      console.log(route);
    }
  
    changeBg() {
      const { pathname } = window.location;
  
      const { body } = document;
  
      switch (pathname) {
        case '/exploration':
          body.className = 'exploration';
          break;
  
        case '/universe':
          body.className = 'universe';
          break;
  
        case '/':
          body.className = 'home';
          break;
  
        default:
          body.className = '';
          break;
      }
    }
  }
  
  