*This is a CODE semester project within SPP : Solo-Project Project, developed for the CODE campus by Kinga Janossy. Ideas and design clues given by CODE team. A working in progress. Initially submitted for SE19 Web Technologies Basics module on 07.05.2020.*

### at a glance

+ real life project for the CODE community
+ JAM Stack
+ Google Calendar API
+ OAuth2
+ Vanilla JavaScript and Vanilla CSS
+ SVG elements and animation
+ VPS hosting
+ Nginx
+ Git Hooks
+ Let’s Encrypt

## The aim of the project

The name **CODE Compass** reflects the main purpose of the project: helping to navigate through time and space. The initial idea was to tackle the problem of finding our way around the building, which is, anyone new to the community or a guest on the 4th floor can tell: challenging.

This website is made to demonstrate and test functionalities for the Digital Board planned to be set up on the CODE campus at 2+ locations (eg. at the main elevator, in the kitchen). The live schedule, combined with the somewhat interactive floorplan of the campus will be displayed on two large screens. It also aims to provide the students and team alike with a simplified access to what is going on and where - over the internet.

## Functions and technology

### : Live schedule

The live shedule displays currently running and upcoming events, such as lectures (LUs), workshops, guilds, community events or any event that is open to the community. Currently the site works through the Google Calendar API. After authentication (OAuth2), the client is able to see any calendar that is set open to the CODE community. The site is currently displaying placeholder events, as the aim for the near future is to move away from the Google API and use the CODE Learning Platform API directly for more accurate and up-to-date information.

The JSON objects extracted, formatted and rendered to the frontend with JavaScript.

### : Interactive floorplan

The actual image of the floorplan is a group of SVG elements, drawn in a graphic software, optimised with SVGOMG ([SVGO's Missing GUI](https://jakearchibald.github.io/svgomg/)). The text elements within the SVG are displayed within the `<foreignObject>` tag, therefore staying scalable and styleable with css at the same time. Some additional JavaScript is being used to enrich the visual experience - and to practice such skills. Hover states for different rooms and areas currently under designing.

### : The website

The website loosely follows the typical JAM Stack pattern. The index page is styled with vanilla CSS and vanilla JavaScript, without preprocessors, frameworks or libraries (other than OAuth2 for login).

For the CODE logo, an SVG element has been animated with simple CSS keyframe transitions (more work on SVG animation is planned). To display the schedule (and the legend for the floorplan), CSS `grid-area` has been used and rudimentarily adjusted via media queries (more to come for the submission of the *ID19 - Responsive Design* module). For anchoring to each section of the site, the yet less supported CSS property, `scroll-behavior: smooth` is being used.

## Hosting and maintenance

The site is hosted on a VPS (via Hetzner, Ubuntu 18.04 distribution), on it’s own server block set up with the help of Nginx. The server’s firewall is configured via UFW and it is accessed as a superuser from the terminal with a SSH key from a local machine. Updates,  commits of the projects are pushed from a local machine with the help of a post-receive git hook. The domain tremual.de is registered with the domain name registrar namecheap.com and the subdomain compass.tremula.de is set up as an ‘A Record’. The site has acquired a free SSL certificate using Let's Encrypt - which is renewed with crontab.  


The site is accessible [here](https://compass.tremula.de/).
*The complete content of the site can be accessed after logging in with a code.berlin email account.*
