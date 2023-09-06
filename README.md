# Ultimate Twitter Clone

The following project implements a full-stack Twitter clone with modern web development technologies:

- **Node.js** for runtime environment
- **TypeScript** for type safety
- **Next.js 13** as the React-based web framework
- **Tailwind CSS** for styling
- **Supabase** for authentication and data persistence in PostgreSQL
- **Node.js libraries:**
  - Form validation with `react-hook-form` and `zod`
  - Date utilities with `dayjs`

## TODO (ongoing):

- Authentication:
  - Style onboarding form and add avatar upload
  - Add option to authenticate with email and password
  - Improve authentication screen
- LeftSidebar functionalities (navigation links, tweet button, user button)
- Create other pages (and refactor sidebars into layout.tsx)
- TweetCard improvements (tooltips for buttons, TweetOptionsButton, show parent tweet inside tweet card if any)
- RightSidebar functionalities (search bar, trends for you, who to follow)
- Handle not-found, loading, and error states
- Consider using component libraries:
  - [Headless UI](https://headlessui.com/)
  - [shadcn/ui](https://ui.shadcn.com/)
- Tweet feed improvements (infinite scrolling, back to top button, load more tweets button)
- Consider using ORM instead of Supabase database API:
  - [Prisma](https://www.prisma.io/)
  - [Drizzle](https://orm.drizzle.team/)
