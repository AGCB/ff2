## ff2

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Dev FAQ

- Font usage
  - In your component/page...
    - import font from font folder
      - example > `import vt323 from "../fonts/Vt323";`
    - pass className as YOUR_FONT.className
      - example >
      ```
      className={`${vt323.className} w-full other-tailwind declarations`}`
      ```
- Routing
  - This app uses nextjs App router as opposed to the older style Page router
  - make a pagename folder in src/app (lower kebob case ex. some-foo-page/
  - inside the PageName folder make the following files..
    - page.tsx
    - helpers(.ts if not needed JSX, else .tsx)
    - styles.ts(for exporting defined tailwind strings)
  - to navigate to that page from anywhere...
    - import Link from "next/link";
      - <Link href="/some-foo-page">
          <span>click here to go to some-foo-page</span>
        </Link>
    - or you can use...
      - import { useRouter } from "next/navigation";
      - const router = useRouter(); // In your component
      - router.push('some-foo-page')
