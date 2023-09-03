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

- LeftSidebar responsiveness
- Authentication:
  - Force unique usernames
  - Improve auth screen
  - Add email-password authentication
- TweetCard improvements:
  - "See more" if tweet is too long
  - Add ReplyButton functionality
  - TweetOptionsButton
  - Show parent tweet inside the tweet card if any
  - Tooltips for buttons
- LeftSidebar functionalities (navigation to other pages, tweet button, user button)
- RightSidebar functionalities (search bar, trends for you, who to follow)
- Handle not-found, loading, and error states
- Consider using component libraries:
  - [Headless UI](https://headlessui.com/)
  - [ui.shadcn.com](https://ui.shadcn.com/)
- Tweet feed improvements (infinite scrolling, back to top button, load more tweets button)
