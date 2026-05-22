# Stack
- Next.js
- React
- TypeScript
- TailwindCSS
- GSAP
- Node.js
- NestJS
- MongoDB
- PostgreSQL

# Rules
- Be concise
- No long explanations
- Return only necessary code
- Do not rewrite unchanged code
- Prefer diffs over full files
- Avoid comments unless requested
- Reuse existing patterns
- Keep responses under 200 lines
- Prefer server components
- Optimize for performance
- Minimize dependencies
- Mobile-first responsive code
- Use scalable architecture
- Use strict TypeScript

# Frontend
- Prefer reusable components
- Avoid unnecessary rerenders
- Optimize hydration
- Use semantic HTML
- Avoid client components unless necessary

# GSAP
- Use gsap.context()
- Cleanup animations properly
- Use transforms over layout properties
- Optimize ScrollTrigger performance
- Avoid animation jank on mobile

# Backend
- Use modular NestJS architecture
- Use DTO validation
- Use clean service/controller separation
- Use repository/service patterns
- Optimize DB queries
- Prefer lean MongoDB queries
- Avoid N+1 queries
- Use pagination where needed

# Database
- Optimize indexes
- Avoid unnecessary joins
- Prefer aggregation efficiency
- Use Prisma/TypeORM patterns if already present
- Keep schemas scalable

# When Editing
- Show only changed sections
- Preserve existing formatting/style
- Avoid unrelated refactors
- Avoid overengineering

# Default Output
- Short
- Production-ready
- No tutorial-style responses
- Prefer minimal patches

# If the request is small:
- do not scan the entire codebase
- inspect only relevant files
- avoid broad architectural analysis