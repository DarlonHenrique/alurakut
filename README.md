# Alurakut - a modern version of orkut

![Alurakut Home](https://imgur.com/4mkBvTY.png)

# Techs

- <a href="#react">React</a>
- <a href="#next">Next</a>
- <a href="#styled-components">Styled Components</a>
- <a href="#node">Node</a>
- <a href="#dato-cms">DatoCMS</a>
<br>

<h1 id="react"> React <h1>
  
  React is a declarative, efficient, and flexible JavaScript library for building user interfaces. It lets you compose complex UIs from small and isolated pieces of code called “components”, the react library was used to build the entire Alurakut interface. <br> <br>
 Hooks were used to create the logic to add communities and update the interface only when a new community is added and without reloading the page! <br> <br>
  
<h1 id="next"> Next <h1>
  Next.js is an open source React front-end development web framework created by Vercel that enables functionality such as server-side rendering and static site generation for React-based web applications.<br>  <br>
  
  I used next to create A backend to frontend architecture (BFF) to create customer-facing backends for alurakut. BFFs can help support an application with multiple clients while at the same time moving the system into a less coupled state than a monolithic system.<br> <br>
  
<h1 id="styled-components"> Styled Components <h1>
  styled-components uses tagged template literals to style their reaction component. It removes mapping between components and styles. This means that when you define your styles, you are actually creating a normal React component, which has its styles attached to it.
  
  <br>
  <br>
  
<h1 id="node"> Node <h1>
  
  Node.js is open-source, cross-platform software based on Google's V8 interpreter that allows the execution of JavaScript code for a web browser. <br> <br>
  in this project I use node to run my backend to frontend (BFF) to consume the DatoCMS library and send Requests using GraphQL. <br> <br>
<h1 id="dato-cms"> DatoCMS <h1>  
  DatoCMS is a friendly, secure and powerful platform that enables marketer, editorial or developer team to build complex backend in minutes and to bring any kind   of content everywhere. <br> <br> 
  inside alurakut I used DatoCMS' GraphQL resources to get the data from a new community and send it to the DatoCMS API using the backend to frontend architecture that nextjs and node allow us to use, then getting the data from this new community through a request in the DatoCMS API and rendering the new community on screen using reacft, without the need to reload the page
