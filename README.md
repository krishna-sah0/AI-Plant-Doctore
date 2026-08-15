# How to run this project :

- First create a google studio (studio.google.com) API Key then paste in .env file like this : GEMINI_API_KEY=AIzaSyDzpbXoHkeTpPy2Wvi5GyUmC1pIE0Dsc68 .
- Then run this command in terminal Bash : npm install
- After that run this command : npm run dev

# The Urban Oasis - A Multifunctional Café Website

This project is a modern, responsive single-page application (SPA) for "The Urban Oasis," a conceptual multifunctional café. The website is designed to showcase the café's offerings, which include a food and beverage menu, an amusement zone, wellness services, and event hosting.

## Features

- **Dynamic Section Navigation**: A smooth, single-page experience where users can navigate between different sections without page reloads.
- **Responsive Design**: A mobile-first approach ensures a seamless experience across all devices, from phones to desktops.
- **Component-Based Architecture**: Built with React, the UI is organized into reusable and maintainable components.
- **Comprehensive Sections**:
  - **Home**: An engaging landing page with a hero section and featured highlights.
  - **About Us**: The story of the café and its team members.
  - **Menu**: An interactive menu with hover-to-view image functionality.
  - **Amusement & Wellness**: Detailed sections for the café's unique services.
  - **Events & Gallery**: Information on upcoming events and a filterable image gallery.
  - **Booking & Contact**: Integrated forms for reservations and inquiries.

## Tech Stack

- **Core Framework**: [React 19](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) (via CDN)
- **Fonts**: [Google Fonts](https://fonts.google.com/) (Poppins and Lora)
- **Module System**: Native ES Modules with [Import Maps](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script/type/importmap) for browser-native dependency management.
- **Development Environment**: The application is configured to run directly in the browser without a build step, using CDN-hosted dependencies.

## Project Structure

```
.
├── components/
│   ├── sections/       # Components for each main page section (Home, About, etc.)
│   ├── ui/             # Reusable UI elements (Card, SectionWrapper)
│   ├── Footer.tsx
│   └── Header.tsx
├── App.tsx             # Root component, handles section routing
├── constants.tsx       # Hardcoded data (menu items, team members, etc.)
├── index.html          # Main HTML entry point
├── index.tsx           # React root renderer
├── metadata.json       # Application metadata
├── README.md           # This file
└── types.ts            # TypeScript type definitions
```

## Getting Started

This project is set up to be run without a complex build process. All you need is a local web server.

### Prerequisites

- A modern web browser (e.g., Chrome, Firefox, Edge).
- A local web server. A popular choice is the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension for Visual Studio Code.

### Installation & Running

1. **Clone the repository or download the files.**
2. **Open the project folder in your code editor (e.g., VS Code).**
3. **If you have the Live Server extension, right-click on `index.html` and select "Open with Live Server".**
4. Your browser will open with the application running. Any changes you save to the files will trigger an automatic reload.

## Technical Interview Q&A

This section contains potential interview questions related to the architecture and technologies used in this project.

---

#### **Q1: The current application manages the active section state in the root `App` component and passes it down via props. Discuss the pros and cons of this approach. When would you consider introducing a more robust state management library like Redux or Zustand?**

**Answer:**

The current approach, known as "prop drilling," is simple and effective for this application's scale.

* **Pros**:

  * **Simplicity**: It's easy to understand and implement without adding external dependencies. The data flow is unidirectional and explicit.
  * **Low Overhead**: No extra libraries mean a smaller bundle size and less boilerplate code.
  * **Good for Small/Medium Apps**: It works perfectly for apps where state is primarily shared between a parent and its direct or nearby children.
* **Cons**:

  * **Prop Drilling**: State and state-setting functions (`activeSection`, `setActiveSection`) have to be passed down through multiple component layers, even if intermediate components don't use them. This can become cumbersome.
  * **Scalability Issues**: In a larger application with deeply nested components or more complex global state (e.g., user authentication, theme), this pattern becomes difficult to maintain.
  * **Re-renders**: Passing props can sometimes lead to unnecessary re-renders of child components if not managed carefully with `React.memo`.

**When to use a state management library:**

I would consider a library like **Zustand** or **Redux** when:

1. **Global State is Needed**: State needs to be accessed by many components at different levels of the component tree (e.g., user auth status, shopping cart data, theme preference).
2. **State Logic Becomes Complex**: The logic for updating the state is intricate and involves multiple actions. Redux's reducers or Zustand's actions can help organize this logic.
3. **Avoiding Prop Drilling**: When prop drilling becomes excessive (passing props through 3+ levels is a good indicator), a centralized store simplifies component logic significantly. **Zustand** is a great lightweight option for this, while **Redux** is more suited for very large-scale applications with complex state interactions and a need for robust developer tools.

---

#### **Q2: This project uses Tailwind CSS via a CDN. What are the advantages and disadvantages of this method compared to setting it up as part of a build process with PostCSS?**

**Answer:**

Using Tailwind via a CDN is a quick way to get started, but it has significant trade-offs compared to a build-step integration.

* **CDN Approach**:

  * **Advantages**:
    * **Simple Setup**: No build configuration is needed. Just add a `<script>` tag to the HTML.
    * **Good for Prototyping**: Excellent for quickly mocking up UIs or for use in online playgrounds.
  * **Disadvantages**:
    * **No Customization**: You cannot customize the `tailwind.config.js` file to add custom colors, fonts, or plugins. The limited inline configuration is not a full replacement.
    * **No `@apply` or Plugins**: You lose access to powerful features like using `@apply` in CSS files or integrating official and third-party plugins.
    * **No Purging**: The entire Tailwind CSS library is loaded, resulting in a large CSS file. A build process with PurgeCSS (or JIT compiler) would remove all unused utility classes, dramatically reducing the final file size for production.
    * **Performance**: Relies on a network request to an external server, which can be a point of failure and may be slower than serving a self-hosted, optimized file.
* **Build Process Approach (with PostCSS)**:

  * **Advantages**:
    * **Full Customization**: Complete control over the `tailwind.config.js` file.
    * **Optimized for Production**: Unused styles are purged, leading to a minimal CSS file.
    * **Extensibility**: Allows the use of directives like `@apply` and the full ecosystem of PostCSS and Tailwind plugins.
    * **Improved Developer Experience**: The JIT (Just-In-Time) compiler provides instant builds and allows for arbitrary value usage (e.g., `top-[13px]`).

For any serious production application, the **build process approach is superior** due to its performance benefits and customization capabilities.

---

#### **Q3: The application is a Single-Page Application (SPA) where sections are conditionally rendered. Compare this to using a routing library like React Router. What are the trade-offs?**

**Answer:**

The current conditional rendering approach is a basic form of routing suitable for this project's needs.

* **Current Approach (Conditional Rendering)**:

  * **Pros**: Lightweight and simple for a single-page layout where all content can be considered part of one "page".
  * **Cons**:
    * **No Browser History**: The browser's back/forward buttons do not work as expected because the URL does not change.
    * **No Deep Linking**: You cannot share a link to a specific section (e.g., `/menu`). All users land on the home view.
    * **SEO Challenges**: Search engine crawlers see only one page, which can be detrimental to SEO for content-heavy sites.
* **React Router Approach**:

  * **Pros**:
    * **Declarative Routing**: Provides a standard, declarative way to manage routes (e.g., `<Route path="/about" element={<AboutUs />} />`).
    * **Browser History Integration**: Correctly manages browser history, so back/forward buttons work.
    * **Deep Linking**: Each section can have its own URL (`/about`, `/menu`), which is shareable and bookmarkable.
    * **Improved SEO**: Each route is a distinct entry point for search engine crawlers.
    * **Code Splitting**: It facilitates lazy loading of components on a per-route basis, improving initial load performance.

**Conclusion**: While the current approach is fine for a simple portfolio-style site, **React Router is the industry standard for any SPA with distinct views or sections.** It provides a much better user experience, improves SEO, and is more scalable. I would recommend refactoring to use React Router if the application were to grow.
