# Ultimate Twitter Clone

The following project implements a full-stack Twitter clone with modern web development technologies:

- **Node.js** for runtime environment
- **TypeScript** for type safety
- **Next.js 13** as the React-based web framework
- **Tailwind CSS** for styling
- **Supabase** for authentication and data persistence in PostgreSQL
- **Node.js libraries:**
  - Forms with `react-hook-form` and `zod`
  - Date utilities with `dayjs`

## TODO (ongoing):

- Account options (edit profile incl. avatar, sign out, delete account)
- Authentication with email and password
- Tweet options (edit, delete)
- Handle not-found, loading, and error states
- Finish LeftSidebar buttons (tweet button, user button)
- Finish other pages (tweet, explore, notifications, messages)
- RightSidebar functionalities (search bar, trends for you, who to follow)
- TweetFeed with state management and infinite scrolling using [React Query](https://tanstack.com/query/latest/)
- Consider using component libraries:
  - [Headless UI](https://headlessui.com/)
  - [shadcn/ui](https://ui.shadcn.com/)
  - [NextUI](https://nextui.org/)
- Consider using ORM instead of Supabase database API:
  - [Prisma](https://www.prisma.io/)
  - [Drizzle](https://orm.drizzle.team/)
