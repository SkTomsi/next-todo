
# ImaginedHQ Interview Assignment - Frontend End Developer

  

This repo is my assignment submission for the role @ ImaginedHQ. I've developed a Todo App using NextJS 15, Zustand, TailwindCSS, Typescript. A fully functional Todo List application built with Next.js 15, Zustand for state management, and Tailwind CSS. The application allows users to manage daily tasks with features like adding, editing, deleting, and marking tasks as complete. You can start adding tasks without authentication.


[Deployed Link](https://next-todo-sktomsi.vercel.app/)


## Packages & Libraries Used

  

In this project, the following packages and libraries were used to streamline development and offer a robust solution:

  

-  `Next.js`: Utilized to deliver a seamless user experience.

-  `Zustand`: Utilized for global state management to handle the app's global state efficiently.

-  `React Hook Form`: Implemented to enhance the user experience by providing a simple and intuitive form handling mechanism.

-  `Shadcn UI`: Utilized for a modern and sleek UI components.

-  `DayJS`: Utilized to extend the exisiting JS DateTime for better flexibility when working with Dates.

-  `Zod`: Integrated for validations to ensure data integrity and correctness.

  

## Features

  

- Add new todo items

- View todos for the current day

- Edit existing todo items

- Delete todo items

- Toggle task completion status

- Local storage persistence

  

## Folder Structure

.
├── README.md
├── biome.jsonc
├── bun.lockb
├── components.json
├── next-env.d.ts
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── public
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
├── src
│   ├── app
│   │   ├── favicon.ico
│   │   ├── fonts
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components
│   │   ├── home
│   │   ├── submit-button.tsx
│   │   └── ui
│   ├── lib
│   │   ├── types.ts
│   │   ├── utils.ts
│   │   └── zod-schema.ts
│   └── store
│       ├── dateStore.ts
│       └── todo-store.ts
├── tailwind.config.ts
└── tsconfig.json

## Potential Improvements

  

- Robust State Management:
	- Considering the addition of the immer package to achieve O(1) time complexity through mutable state while updating and tackle deep nesting.

- Authentication:
	- Implementing a secure authentication system to ensure user data privacy and security.
	- Considering the addition of the next-auth package to manage user authentication and authorization.

  

- Backend Integration:
	- Integrating the backend API to persist the data in a DB so that the data can be made available anywhere and anytime.