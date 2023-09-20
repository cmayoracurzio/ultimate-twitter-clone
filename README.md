# Ultimate Twitter Clone

The following project implements a full-stack Twitter clone with modern web development technologies:

- **Node.js** for runtime environment
- **TypeScript** for type safety
- **Next.js 13** as the React-based web framework
- **Tailwind CSS** for styling
- **Supabase** for authentication and data persistence in PostgreSQL
- **Utilities:**
  - Forms with `react-hook-form` and `zod`
  - Date formatting with `dayjs`
  - Modals with `@headlessui/react`
  - Tailwind CSS formatting with `prettier-plugin-tailwindcss`

## TODO (ongoing):

- Finish LeftSidebar buttons (tweet button, user button)
- Authentication with email and password (and improve login page)
- Handle not-found, loading/streaming, and error states
- Add avatar to edit-profile-form
- Tweet page and tweet options (reply, edit, delete)
- Finish other pages (explore, notifications, messages)
- RightSidebar functionalities (corporate links, search bar, trends/hashtags, who to follow)
- TweetFeed with state management and infinite scrolling using [React Query](https://tanstack.com/query/latest/)
- Consider using [shadcn/ui](https://ui.shadcn.com/) components
- Consider using ORM instead of Supabase database API:
  - [Prisma](https://www.prisma.io/)
  - [Drizzle](https://orm.drizzle.team/)
