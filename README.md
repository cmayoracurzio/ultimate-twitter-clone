# Ultimate Twitter Clone

The following project implements a full-stack Twitter clone with modern web development technologies:

- **Node.js** for runtime environment
- **TypeScript** for type safety
- **Next.js 13** as the React-based web framework
- **Tailwind CSS** for styling
- **Supabase** for authentication and data persistence in PostgreSQL
- **Node.js libraries:**
  - Forms with `react-hook-form` and `zod`
  - Date formatting with `dayjs`
  - Modals with `@headlessui/react`

## TODO (ongoing):

- Finish delete-account-form
- Authentication with email and password (and improve login page)
- Finish LeftSidebar buttons (tweet button, user button)
- Tweet page and tweet options (reply, edit, delete)
- Handle not-found, loading/streaming, and error states
- Add avatar to EditProfileForm
- Finish other pages (explore, notifications, messages)
- RightSidebar functionalities (corporate links, search bar, trends for you, who to follow)
- TweetFeed with state management and infinite scrolling using [React Query](https://tanstack.com/query/latest/)
- Consider using [shadcn/ui](https://ui.shadcn.com/) components
- Consider using ORM instead of Supabase database API:
  - [Prisma](https://www.prisma.io/)
  - [Drizzle](https://orm.drizzle.team/)
